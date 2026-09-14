/* Moves the website's content from public/data into the CMS, one collection
   at a time (MIG-01).

   Usage:  ALLOW_MIGRATE=1 npx tsx scripts/migrate-content.ts <name> [<name> …]
           ALLOW_MIGRATE=1 npx tsx scripts/migrate-content.ts all

   - MIG-02: after each collection, the number of published records must equal
     the number in the source file, or the script fails loudly. Page sections
     (globals) are read back and compared field by field.
   - MIG-05: re-runnable. Records are matched on a natural key and updated,
     never duplicated.
   - MIG-07: nothing is invented. Values are copied as written; a source
     contradiction is reported, not silently resolved.

   Re-running overwrites a record with the file's version, so once editors
   have started working in the CMS the files are retired (MIG-06) and this is
   not run again. ALLOW_MIGRATE guards against running it by accident. */
import { createHash } from "crypto";
import { copyFileSync, mkdtempSync, readdirSync, readFileSync, statSync } from "fs";
import os from "os";
import path from "path";

import { getPayload, type CollectionSlug, type GlobalSlug, type Payload } from "payload";

import config from "../payload.config";
import { HOMEPAGE_ORDER, SECTION_COPY } from "../lib/section-copy";

const DATA = path.join(process.cwd(), "public", "data");
const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(path.join(DATA, file), "utf8")) as T;

/* This runs outside the website, so it cannot refresh the website's cache:
   a running site keeps showing what it cached before, for up to an hour
   (lib/cms.ts). The script says so when it finishes. Asking the hooks not to
   try saves each write a failing attempt.

   A fresh object for every write, never one shared: Payload's storage plugin
   keeps each upload's file on the write's context the first time it sees
   one, and never clears it. With one shared object, every image after the
   first reached the database but was never uploaded to R2 — silently. */
const context = () => ({ skipRevalidate: true });

type Result = { source: number; published: number; notes?: string[] };
type Migrator = (payload: Payload) => Promise<Result>;

/* ── Images (MIG-08, CR-011) ────────────────────────────────────────────── */

/** Every image path the content files use (the legal documents have none). */
function imagePathsInContent(): string[] {
  const found = new Set<string>();
  const walk = (value: unknown) => {
    if (typeof value === "string") {
      if (/^\/.+\.(jpe?g|png|webp)$/i.test(value)) found.add(value);
    } else if (Array.isArray(value)) {
      value.forEach(walk);
    } else if (value && typeof value === "object") {
      Object.values(value).forEach(walk);
    }
  };
  const read = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const full = path.join(dir, name);

      if (statSync(full).isDirectory()) read(full);
      else if (name.endsWith(".json") && name !== "legal.json") {
        walk(JSON.parse(readFileSync(full, "utf8")));
      }
    }
  };

  read(DATA);

  return [...found].sort();
}

/* Old image path → its media library record. Built on first use, after the
   media step has run. */
let mediaByPath: Map<string, number> | null = null;

async function mediaId(payload: Payload, value: unknown): Promise<number | null> {
  if (typeof value !== "string" || !value) return null;

  if (!mediaByPath) {
    const { docs } = await payload.find({
      collection: "media",
      limit: 1000,
      depth: 0,
      overrideAccess: true,
    });

    mediaByPath = new Map(
      (docs as unknown as { id: number; sourcePaths?: string[] }[]).flatMap((doc) =>
        (doc.sourcePaths ?? []).map((source) => [source, doc.id] as const),
      ),
    );
  }

  const id = mediaByPath.get(value);

  if (id === undefined) {
    throw new Error(`No media library image for ${value}: run the "media" step first.`);
  }

  return id;
}

const mediaIds = async (payload: Payload, values: unknown) =>
  Array.isArray(values) ? Promise.all(values.map((value) => mediaId(payload, value))) : [];

/** Paragraph arrays are stored as [{ text }] rows. */
const toParagraphs = (items: string[] = []) => items.map((text) => ({ text }));

/* Writes each item, matched on `key`, then counts the published records. */
async function upsertAll(
  payload: Payload,
  collection: CollectionSlug,
  key: string,
  items: Record<string, unknown>[],
): Promise<Result> {
  for (const [index, item] of items.entries()) {
    const data = { order: index + 1, ...item, _status: "published" };

    const existing = await payload.find({
      collection,
      where: { [key]: { equals: item[key] } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection,
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: context(),
      });
    } else {
      await payload.create({
        collection,
        data: data as never,
        overrideAccess: true,
        context: context(),
      });
    }
  }

  const { totalDocs } = await payload.count({
    collection,
    where: { _status: { equals: "published" } },
    overrideAccess: true,
  });

  return { source: items.length, published: totalDocs };
}

/* Writes a page section, then reads it back and compares every field, so a
   value the schema silently dropped is caught (MIG-02 for globals). */
async function writeGlobal(
  payload: Payload,
  slug: GlobalSlug,
  data: Record<string, unknown>,
): Promise<Result> {
  await payload.updateGlobal({ slug, data: data as never, overrideAccess: true, context: context() });

  const saved = (await payload.findGlobal({
    slug,
    overrideAccess: true,
    depth: 0,
  })) as unknown as Record<string, unknown>;

  // Compared by content, not by key order: the database returns fields in
  // the schema's order, which need not match the source file's.
  const strip = (value: unknown): unknown =>
    Array.isArray(value)
      ? value.map(strip)
      : value && typeof value === "object"
        ? Object.fromEntries(
            Object.entries(value as Record<string, unknown>)
              .filter(([k]) => k !== "id")
              .sort(([a], [b]) => a.localeCompare(b))
              .map(([k, v]) => [k, strip(v)]),
          )
        : value;

  const mismatched = Object.keys(data).filter(
    (k) => JSON.stringify(strip(saved[k])) !== JSON.stringify(strip(data[k])),
  );

  return {
    source: Object.keys(data).length,
    published: Object.keys(data).length - mismatched.length,
    notes: mismatched.length ? [`not saved as written: ${mismatched.join(", ")}`] : undefined,
  };
}

const migrators: Record<string, Migrator> = {
  // First, so every later step can point at the images.
  async media(payload) {
    // Every image the content uses, uploaded once however many paths held
    // it, with the description drafted for the Foundation to approve.
    const drafts = (
      JSON.parse(
        readFileSync(path.join(process.cwd(), "scripts", "data", "alt-text-drafts.json"), "utf8"),
      ) as { images: Record<string, string> }
    ).images;
    const notes: string[] = [];
    const groups = new Map<string, string[]>();

    for (const source of imagePathsInContent()) {
      const hash = createHash("sha256")
        .update(readFileSync(path.join(process.cwd(), "public", source)))
        .digest("hex");

      groups.set(hash, [...(groups.get(hash) ?? []), source]);
    }

    const tmp = mkdtempSync(path.join(os.tmpdir(), "shf-media-"));

    for (const [hash, sources] of groups) {
      const [first] = sources;
      const alt = drafts[first];

      if (!alt) {
        notes.push(`not saved as written: no drafted description for ${first}`);
        continue;
      }

      if (sources.some((source) => drafts[source] !== alt)) {
        notes.push(`not saved as written: one photograph described differently at ${sources.join(", ")}`);
      }

      const existing = await payload.find({
        collection: "media",
        where: { sourceHash: { equals: hash } },
        limit: 1,
        overrideAccess: true,
      });
      const doc = existing.docs[0] as unknown as { id: number; altApproved?: boolean } | undefined;

      if (doc) {
        // A description the Foundation has approved is never overwritten.
        await payload.update({
          collection: "media",
          id: doc.id,
          data: { sourcePaths: sources, ...(doc.altApproved ? {} : { alt }) } as never,
          overrideAccess: true,
          context: context(),
        });
      } else {
        // Named after the first path it was at: readable, and unique.
        const file = path.join(tmp, first.replace(/^\//, "").replace(/\//g, "-"));

        copyFileSync(path.join(process.cwd(), "public", first), file);
        await payload.create({
          collection: "media",
          data: { alt, sourceHash: hash, sourcePaths: sources, altApproved: false } as never,
          filePath: file,
          overrideAccess: true,
          context: context(),
        });
      }
    }

    mediaByPath = null;

    const { totalDocs } = await payload.count({ collection: "media", overrideAccess: true });

    return { source: groups.size, published: totalDocs, notes };
  },

  async testimonials(payload) {
    const source = readJson<{ name: string; role: string; text: string }[]>("testimonials.json");

    return upsertAll(
      payload,
      "testimonials",
      "name",
      source.map((t) => ({ name: t.name, role: t.role, quote: t.text })),
    );
  },

  async programmes(payload) {
    const source = readJson<Record<string, unknown>[]>("programs.json");
    const items = await Promise.all(
      source.map(async (programme) => ({
        ...programme,
        heroImage: await mediaId(payload, programme.heroImage),
      })),
    );

    return upsertAll(payload, "programmes", "slug", items);
  },

  async stories(payload) {
    // The list gives order, the short summary and the featured flag the site
    // actually uses; each story's own file gives the rest.
    const list = readJson<Record<string, unknown>[]>("impact-stories/stories.json");
    const notes: string[] = [];

    const items = await Promise.all(list.map(async (entry) => {
      const detail = readJson<Record<string, unknown>>(`impact-stories/${entry.slug}.json`);

      for (const key of Object.keys(entry)) {
        if (key in detail && JSON.stringify(entry[key]) !== JSON.stringify(detail[key])) {
          notes.push(
            `${entry.slug}: "${key}" is ${JSON.stringify(entry[key])} in the list but ${JSON.stringify(detail[key])} on its page — kept the list's value, which is what the site shows`,
          );
        }
      }

      const quote = detail.quote as { text?: string; author?: string } | undefined;

      return {
        slug: entry.slug,
        title: entry.title,
        category: entry.category,
        excerpt: entry.excerpt,
        beneficiaries: entry.beneficiaries,
        featured: entry.featured,
        date: entry.date,
        image: await mediaId(payload, entry.image),
        donationProgram: detail.donationProgram,
        location: detail.location,
        images: await mediaIds(payload, detail.images),
        challenge: detail.challenge,
        response: detail.response,
        impact: detail.impact,
        story: toParagraphs(detail.story as string[]),
        quote: { text: quote?.text ?? "", author: quote?.author ?? "" },
      };
    }));

    const result = await upsertAll(payload, "impact-stories", "slug", items);

    return { ...result, notes };
  },

  async leadership(payload) {
    const source = readJson<{ name: string; role: string; image: string }[]>("governance.json");
    const items = await Promise.all(
      source.map(async (l) => ({
        name: l.name,
        position: l.role,
        image: await mediaId(payload, l.image),
      })),
    );

    return upsertAll(payload, "leadership", "name", items);
  },

  async volunteers(payload) {
    const source = readJson<Record<string, unknown>[]>("volunteers.json");
    const items = await Promise.all(
      source.map(async (v) => ({ ...v, image: await mediaId(payload, v.image) })),
    );

    return upsertAll(payload, "volunteer-profiles", "name", items);
  },

  async gallery(payload) {
    const source = readJson<Record<string, unknown>[]>("gallery.json");
    const items = await Promise.all(
      source.map(async (photo, index) => ({
        ...photo,
        order: index + 1,
        image: await mediaId(payload, photo.image),
      })),
    );

    // MIG-07: some gallery entries are the same photograph filed under two
    // programme areas. Reported, not resolved. Because of them neither the
    // image nor the title identifies an entry; its place in the gallery does.
    const byImage = new Map<unknown, string[]>();

    for (const item of items) {
      byImage.set(item.image, [
        ...(byImage.get(item.image) ?? []),
        `#${item.order} ${String((item as Record<string, unknown>).category)}`,
      ]);
    }

    const notes = [...byImage.values()]
      .filter((entries) => entries.length > 1)
      .map((entries) => `the same photograph is in the gallery more than once: ${entries.join(" and ")}`);

    return { ...(await upsertAll(payload, "gallery-photos", "order", items)), notes };
  },

  async events(payload) {
    const source = readJson<Record<string, unknown>[]>("featured-events.json");
    const items = await Promise.all(
      source.map(async (event) => ({ ...event, image: await mediaId(payload, event.image) })),
    );

    return upsertAll(payload, "featured-events", "title", items);
  },

  async videos(payload) {
    const source = readJson<Record<string, unknown>[]>("video-highlights.json");
    const items = await Promise.all(
      source.map(async (video) => ({ ...video, thumbnail: await mediaId(payload, video.thumbnail) })),
    );

    return upsertAll(payload, "video-highlights", "title", items);
  },

  async volunteerOpportunities(payload) {
    return upsertAll(
      payload,
      "volunteer-opportunities",
      "title",
      readJson("volunteer-opportunities.json"),
    );
  },

  async volunteerBenefits(payload) {
    return upsertAll(payload, "volunteer-benefits", "title", readJson("volunteer-benefits.json"));
  },

  async inKindCategories(payload) {
    return upsertAll(payload, "in-kind-categories", "title", readJson("in-kind-donations.json"));
  },

  async campaigns(payload) {
    const source = readJson<Record<string, unknown>[]>("campaigns.json");

    return upsertAll(
      payload,
      "campaign-stories",
      "name",
      // The file's numeric id is not content; the CMS gives each its own.
      await Promise.all(
        source.map(async (campaign) => ({
          ...Object.fromEntries(Object.entries(campaign).filter(([key]) => key !== "id")),
          heroImage: await mediaId(payload, campaign.heroImage),
          gallery: await mediaIds(payload, campaign.gallery),
          description: toParagraphs(campaign.description as string[]),
        })),
      ),
    );
  },

  async siteSettings(payload) {
    const s = readJson<{
      foundationName: string;
      email: string;
      phone: string;
      nigeriaOffice: { address: string };
      usaOffice: { address: string };
      bank: Record<string, string>;
      socials: Record<string, string>;
    }>("site-settings.json");

    return writeGlobal(payload, "site-settings", {
      foundationName: s.foundationName,
      email: s.email,
      phone: s.phone,
      nigeriaAddress: s.nigeriaOffice.address,
      usaAddress: s.usaOffice.address,
      bank: s.bank,
      socials: s.socials,
    });
  },

  async foundation(payload) {
    const intro = readJson<Record<string, string>>("homepage/foundation.json");
    const founder = readJson<Record<string, unknown>>("homepage/founder.json");

    return writeGlobal(payload, "foundation", {
      ...intro,
      founder: {
        ...founder,
        image: await mediaId(payload, founder.image),
        message: toParagraphs(founder.message as string[]),
      },
    });
  },

  async homepage(payload) {
    // CR-009: the homepage becomes a page built from blocks — its ten
    // sections in the order the site has shown them, each with the wording it
    // had. The hero's slides come from hero.json; the rest have no file of
    // their own, so their wording is the one in lib/section-copy.ts.
    const slides = await Promise.all(
      readJson<Record<string, string>[]>("homepage/hero.json").map(async (slide) => ({
        ...slide,
        image: await mediaId(payload, slide.image),
      })),
    );
    const blocks = HOMEPAGE_ORDER.map((type) =>
      type === "hero"
        ? { blockType: type, slides }
        : type === "visionMission"
          ? { blockType: type }
          : { blockType: type, ...SECTION_COPY[type] },
    );
    const data = { title: "Homepage", slug: "home", blocks, _status: "published" as const };

    const existing = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" } },
      limit: 1,
      overrideAccess: true,
    });

    if (existing.docs[0]) {
      await payload.update({
        collection: "pages",
        id: existing.docs[0].id,
        data: data as never,
        overrideAccess: true,
        context: context(),
      });
    } else {
      await payload.create({ collection: "pages", data: data as never, overrideAccess: true, context: context() });
    }

    // Read back: every block, in order, with every field as written.
    const saved = await payload.find({
      collection: "pages",
      where: { slug: { equals: "home" }, _status: { equals: "published" } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    });
    const strip = (value: unknown): unknown =>
      Array.isArray(value)
        ? value.map(strip)
        : value && typeof value === "object"
          ? Object.fromEntries(
              Object.entries(value as Record<string, unknown>)
                .filter(([key, v]) => key !== "id" && key !== "blockName" && v !== null)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([key, v]) => [key, strip(v)]),
            )
          : value;
    const stored = ((saved.docs[0]?.blocks ?? []) as unknown[]).map(strip);
    const wrong = blocks.filter(
      (block, index) => JSON.stringify(stored[index]) !== JSON.stringify(strip(block)),
    );

    return {
      source: blocks.length,
      published: blocks.length - wrong.length,
      notes: wrong.length
        ? [`not saved as written: ${wrong.map((block) => block.blockType).join(", ")}`]
        : undefined,
    };
  },

  async applyPage(payload) {
    return writeGlobal(payload, "apply-page", readJson("apply-info.json"));
  },

  async donatePage(payload) {
    return writeGlobal(payload, "donate-page", readJson("donation-impact.json"));
  },

  async statistics(payload) {
    const stats = readJson<Record<string, Record<string, string>>>("stats.json");
    const donate = readJson<{ stats: { number: string; label: string }[] }>(
      "donation-impact.json",
    ).stats;

    // Every place a figure was held before the CMS: stats.json, per page,
    // and the retired donate-page figures (CR-008), by their label there.
    const at = (place: string) => {
      const [file, key] = place.split(":");

      if (file === "donate") return donate.find((item) => item.label === key)?.number;

      const [group, name] = key.split(".");
      return stats[group]?.[name];
    };

    // CR-010: each figure is stored once. Every place it was held must agree,
    // or the migration stops (MIG-07) rather than pick one. Families reached
    // and students sponsored were also typed into the Partnerships page's
    // code; A18 checks that page still renders the same figures.
    const figures: Record<string, string[]> = {
      childrenReached: ["stats:homepage.childrenReached", "stats:impact.childrenReached"],
      widowsSupported: [
        "stats:homepage.widowsSupported",
        "stats:impact.widowsSupported",
        "donate:Widows Reached Through Empowerment Programmes",
      ],
      educationalBeneficiaries: ["stats:homepage.educationalBeneficiaries"],
      communitiesReached: [
        "stats:homepage.communitiesImpacted",
        "stats:gallery.communitiesReached",
        "donate:Communities Impacted Across Various Programmes",
      ],
      livesReached: [
        "stats:programs.livesReached",
        "stats:impact.livesImpacted",
        "stats:gallery.livesImpacted",
      ],
      outreachEvents: [
        "stats:programs.outreachActivities",
        "stats:impact.communityOutreachEvents",
        "stats:gallery.outreachEvents",
      ],
      yearsOfService: ["stats:programs.yearsOfCompassion", "stats:gallery.yearsOfService"],
      countriesRepresented: ["stats:programs.countriesRepresented"],
      familiesReached: ["donate:Families Supported Through Welfare Initiatives"],
      studentsSponsored: ["donate:UTME Candidates Sponsored"],
    };

    const held =
      Object.values(stats).reduce((n, group) => n + Object.keys(group).length, 0) + donate.length;
    const mapped = Object.values(figures).flat();
    const notes: string[] = [];

    if (new Set(mapped).size !== held) {
      notes.push(`not saved as written: the files hold ${held} figures, ${mapped.length} are mapped`);
    }

    const data: Record<string, unknown> = {};

    for (const [name, places] of Object.entries(figures)) {
      const values = places.map(at);

      if (values.some((value) => value === undefined) || new Set(values).size !== 1) {
        notes.push(
          `not saved as written: ${name} disagrees across pages — ${places.map((place, i) => `${place}=${values[i]}`).join(", ")}`,
        );
        continue;
      }

      data[name] = {
        value: values[0],
        // Known source, no verification: MIG-07 forbids claiming a check
        // that never happened, so "verified on" is left empty.
        source: `Carried over from the website before the CMS (${places.join("; ")}). Not yet verified by the Foundation.`,
        verifiedAt: null,
      };
    }

    const result = await writeGlobal(payload, "statistics-manual", data);

    return { ...result, notes: [...notes, ...(result.notes ?? [])] };
  },
};

async function main() {
  if (!process.env.ALLOW_MIGRATE) {
    throw new Error(
      "Refusing to run: set ALLOW_MIGRATE=1. Re-running overwrites CMS edits with the files' content.",
    );
  }

  const args = process.argv.slice(2);
  const requested = args.includes("all") ? Object.keys(migrators) : args;
  const unknown = requested.filter((name) => !(name in migrators));

  if (!requested.length || unknown.length) {
    throw new Error(
      `Name the collections to migrate, or "all". Available: ${Object.keys(migrators).join(", ")}` +
        (unknown.length ? `. Unknown: ${unknown.join(", ")}` : ""),
    );
  }

  const payload = await getPayload({ config });
  let failed = false;

  for (const name of requested) {
    const { source, published, notes } = await migrators[name](payload);
    const ok = source === published && !notes?.some((n) => n.startsWith("not saved"));

    if (!ok) failed = true;

    console.log(
      `${ok ? "PASS" : "FAIL"}  ${name.padEnd(24)} ${published} of ${source} ${source === published ? "" : "— MISMATCH"}`,
    );

    for (const note of notes ?? []) console.log(`        note: ${note}`);
  }

  if (!failed) {
    console.log(
      "\nRestart the website so it shows this content at once. It cannot see these writes in\n" +
        "its cache; otherwise they appear within the hour. In production, recreate the app\n" +
        "container (docker compose up -d --force-recreate app): a plain restart keeps the cache.",
    );
  }

  process.exit(failed ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
