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
import { readFileSync } from "fs";
import path from "path";

import { getPayload, type CollectionSlug, type GlobalSlug, type Payload } from "payload";

import config from "../payload.config";

const DATA = path.join(process.cwd(), "public", "data");
const readJson = <T>(file: string): T =>
  JSON.parse(readFileSync(path.join(DATA, file), "utf8")) as T;

// Writes made here are not website visits; there is no cache to refresh.
const context = { skipRevalidate: true };

type Result = { source: number; published: number; notes?: string[] };
type Migrator = (payload: Payload) => Promise<Result>;

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
        context,
      });
    } else {
      await payload.create({
        collection,
        data: data as never,
        overrideAccess: true,
        context,
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
  await payload.updateGlobal({ slug, data: data as never, overrideAccess: true, context });

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

    return upsertAll(payload, "programmes", "slug", source);
  },

  async stories(payload) {
    // The list gives order, the short summary and the featured flag the site
    // actually uses; each story's own file gives the rest.
    const list = readJson<Record<string, unknown>[]>("impact-stories/stories.json");
    const notes: string[] = [];

    const items = list.map((entry) => {
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
        image: entry.image,
        donationProgram: detail.donationProgram,
        location: detail.location,
        images: detail.images,
        challenge: detail.challenge,
        response: detail.response,
        impact: detail.impact,
        story: toParagraphs(detail.story as string[]),
        quote: { text: quote?.text ?? "", author: quote?.author ?? "" },
      };
    });

    const result = await upsertAll(payload, "impact-stories", "slug", items);

    return { ...result, notes };
  },

  async leadership(payload) {
    const source = readJson<{ name: string; role: string; image: string }[]>("governance.json");

    return upsertAll(
      payload,
      "leadership",
      "name",
      source.map((l) => ({ name: l.name, position: l.role, image: l.image })),
    );
  },

  async volunteers(payload) {
    const source = readJson<Record<string, unknown>[]>("volunteers.json");

    return upsertAll(payload, "volunteer-profiles", "name", source);
  },

  async gallery(payload) {
    const source = readJson<Record<string, unknown>[]>("gallery.json");

    // A photograph's path is its identity; titles can repeat.
    return upsertAll(payload, "gallery-photos", "image", source);
  },

  async events(payload) {
    return upsertAll(payload, "featured-events", "title", readJson("featured-events.json"));
  },

  async videos(payload) {
    return upsertAll(payload, "video-highlights", "title", readJson("video-highlights.json"));
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
      source.map((campaign) => ({
        ...Object.fromEntries(Object.entries(campaign).filter(([key]) => key !== "id")),
        description: toParagraphs(campaign.description as string[]),
      })),
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
      founder: { ...founder, message: toParagraphs(founder.message as string[]) },
    });
  },

  async homepage(payload) {
    return writeGlobal(payload, "homepage", { heroSlides: readJson("homepage/hero.json") });
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

  process.exit(failed ? 1 : 0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
