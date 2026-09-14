import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as } from "./helpers.mjs";

/* Phase 6: every kind of content the website shows comes from the CMS.

   cms-publish.test.mjs proves the publish pipeline in depth on one
   collection. This proves its breadth: for each content type, the first
   visit after a publish shows the edit on the page that shows it (PUB-04). A
   section still reading its old file, or a cache refreshed under the wrong
   tag, fails here — the file's text would stay on the page.

   Each case puts the original back afterwards, even when it fails. Needs
   the content migration to have run first (CI does this). */

const page = async (path) => (await fetch(`${BASE}${path}`, { cache: "no-store" })).text();

/* One visit, a moment after the publish, with none in between. Retrying
   would hide a stale-while-revalidate cache, which serves the first visitor
   the old version and only then refreshes. */
async function firstVisitShows(path, text) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (await page(path)).includes(text);
}

/* A collection: edit the entry the page shows — the one with this slug, or
   else the first, as the site orders them. */
const entry = (collection, page, field, extra = () => ({})) => ({
  label: collection,
  role: "content",
  page,
  method: "PATCH",
  async load() {
    const slug = page.match(/^\/(?:programs|impact-stories)\/(.+)$/)?.[1];
    const where = slug ? `&where[slug][equals]=${slug}` : "";
    const found = await as("content", `/api/${collection}?limit=1&sort=order&depth=0${where}`);
    const doc = found.body?.docs?.[0];

    assert.ok(doc, `no published ${collection} — run the content migration first`);

    return doc;
  },
  url: (doc) => `/api/${collection}/${doc.id}`,
  edit: (doc, stamp) => ({ [field]: stamp, ...extra(stamp), _status: "published" }),
  restore: (doc) => ({
    [field]: doc[field] ?? null,
    ...Object.fromEntries(Object.keys(extra("")).map((key) => [key, doc[key] ?? null])),
    _status: "published",
  }),
});

/* A page section (global): no drafts, so an update is live at once. Payload
   updates a global with POST. */
const section = (slug, role, page, edit, restore) => ({
  label: slug,
  role,
  page,
  method: "POST",
  async load() {
    const found = await as(role, `/api/globals/${slug}?depth=0`);

    assert.equal(found.status, 200, `could not read ${slug}`);

    return found.body;
  },
  url: () => `/api/globals/${slug}`,
  edit,
  restore,
});

const cases = [
  entry("programmes", "/programs/education-support", "why"),
  entry("impact-stories", "/impact-stories/utme-sponsorship-initiative", "challenge"),
  // Bios were never shown because none existed; this also proves one appears.
  entry("leadership", "/team", "bio"),
  entry("volunteer-profiles", "/team", "role"),
  entry("gallery-photos", "/gallery", "title"),
  entry("featured-events", "/gallery", "title"),
  // Only videos with a real address are shown, so the edit supplies one.
  entry("video-highlights", "/gallery", "title", (stamp) => ({
    link: stamp && `https://www.youtube.com/watch?v=${stamp}`,
  })),
  entry("volunteer-opportunities", "/volunteer", "title"),
  entry("volunteer-benefits", "/volunteer", "title"),
  entry("campaign-stories", "/", "headline"),
  section(
    "site-settings",
    "administrator",
    "/contact",
    (doc, stamp) => ({ usaAddress: stamp }),
    (doc) => ({ usaAddress: doc.usaAddress }),
  ),
  section(
    "foundation",
    "content",
    "/",
    (doc, stamp) => ({ vision: stamp }),
    (doc) => ({ vision: doc.vision }),
  ),
  // The homepage is a page built from blocks (CR-009): its hero's first slide.
  {
    label: "pages",
    role: "content",
    page: "/",
    method: "PATCH",
    async load() {
      const found = await as("content", "/api/pages?where[slug][equals]=home&limit=1&depth=0");
      const doc = found.body?.docs?.[0];

      assert.ok(doc, "no homepage — run the content migration first");

      return doc;
    },
    url: (doc) => `/api/pages/${doc.id}`,
    edit: (doc, stamp) => ({
      blocks: doc.blocks.map((block) =>
        block.blockType === "hero"
          ? { ...block, slides: block.slides.map((slide, i) => (i ? slide : { ...slide, title: stamp })) }
          : block,
      ),
      _status: "published",
    }),
    restore: (doc) => ({ blocks: doc.blocks, _status: "published" }),
  },
  section(
    "apply-page",
    "content",
    "/apply-for-support",
    (doc, stamp) => ({ intro: stamp }),
    (doc) => ({ intro: doc.intro }),
  ),
  section(
    "statistics-manual",
    "content",
    "/impact-stories",
    (doc, stamp) => ({ livesReached: { ...doc.livesReached, value: stamp } }),
    (doc) => ({ livesReached: doc.livesReached }),
  ),
];

for (const c of cases) {
  test(`CMS: ${c.label} — a published edit appears on ${c.page}`, async (t) => {
    const doc = await c.load();
    const stamp = `CMS-${c.label}-${Date.now()}`;

    t.after(async () => {
      await as(c.role, c.url(doc), { method: c.method, body: JSON.stringify(c.restore(doc)) });
    });

    const saved = await as(c.role, c.url(doc), {
      method: c.method,
      body: JSON.stringify(c.edit(doc, stamp)),
    });

    assert.equal(saved.status, 200, `could not publish: ${JSON.stringify(saved.body).slice(0, 200)}`);
    assert.ok(
      await firstVisitShows(c.page, stamp),
      `the first visit to ${c.page} after publishing showed the old version`,
    );
  });
}
