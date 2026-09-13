import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as } from "./helpers.mjs";

/* A21: every published statistic agrees with its source, on every page that
   shows it (CNT-09, CNT-10 as amended by CR-010).

   The typed-in figures are each stored once. Setting each to a unique value
   and finding that value on every page that shows the figure proves no page
   holds its own copy. The one figure the system counts — photographs per
   gallery area — is compared against a count of the published photographs. */

const page = async (path) => (await fetch(`${BASE}${path}`, { cache: "no-store" })).text();

// Where each figure appears, per CR-010.
const SHOWN_ON = {
  childrenReached: ["/", "/impact-stories"],
  widowsSupported: ["/", "/impact-stories", "/partnerships"],
  educationalBeneficiaries: ["/"],
  communitiesReached: ["/"],
  livesReached: ["/programs", "/about", "/impact-stories"],
  outreachEvents: ["/programs", "/about", "/impact-stories"],
  yearsOfService: ["/programs", "/about"],
  countriesRepresented: ["/programs", "/about"],
  familiesReached: ["/partnerships"],
  studentsSponsored: ["/partnerships"],
};

test("A21: each figure is stored once and every page that shows it agrees", async (t) => {
  const original = (await as("content", "/api/globals/statistics-manual?depth=0")).body;
  const stamp = Date.now();

  for (const name of Object.keys(SHOWN_ON)) {
    assert.ok(original[name]?.value, `${name} has no value — run the content migration first`);
  }

  t.after(async () => {
    await as("content", "/api/globals/statistics-manual", {
      method: "POST",
      body: JSON.stringify(Object.fromEntries(Object.keys(SHOWN_ON).map((n) => [n, original[n]]))),
    });
  });

  const marked = Object.fromEntries(
    Object.keys(SHOWN_ON).map((name) => [name, { ...original[name], value: `${name}-${stamp}` }]),
  );

  const saved = await as("content", "/api/globals/statistics-manual", {
    method: "POST",
    body: JSON.stringify(marked),
  });

  assert.equal(saved.status, 200, "could not update the statistics");

  const pages = Object.fromEntries(
    await Promise.all(
      [...new Set(Object.values(SHOWN_ON).flat())].map(async (path) => [path, await page(path)]),
    ),
  );

  for (const [name, paths] of Object.entries(SHOWN_ON)) {
    for (const path of paths) {
      assert.ok(pages[path].includes(`${name}-${stamp}`), `${path} does not show the stored ${name}`);
    }
  }

  // No page still displays one of the original figures once all of them are
  // replaced: a figure typed into a page's code would stay behind. Checked
  // on every public page, not only those listed above.
  const everyPage = ["/", "/about", "/programs", "/impact-stories", "/gallery", "/team",
    "/volunteer", "/partnerships", "/donate", "/apply-for-support", "/contact"];
  const figures = [...new Set(Object.keys(SHOWN_ON).map((n) => original[n].value))].filter((v) =>
    /\d+\+/.test(v),
  );

  for (const path of everyPage) {
    const html = pages[path] ?? (await page(path));
    // A story's own beneficiary count ("15+ reached") is part of that story,
    // not a site-wide figure (CR-010), so those are set aside.
    const main = html
      .slice(html.indexOf("<main"), html.indexOf("</main>"))
      .replace(/>[^<>]*(?:<!-- -->\s*reached|<span[^>]*>\s*reached)/g, ">");
    const left = figures.filter((value) => main.includes(`>${value}<`));

    assert.deepEqual(left, [], `${path} still displays ${left.join(", ")} typed into the page`);
  }

  // And no page shows a figure CR-010 does not list for it.
  for (const [path, html] of Object.entries(pages)) {
    const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));

    for (const name of Object.keys(SHOWN_ON)) {
      if (SHOWN_ON[name].includes(path)) continue;
      assert.ok(!main.includes(`${name}-${stamp}`), `${path} shows ${name}, which CR-010 does not list for it`);
    }
  }
});

test("A21: photographs per gallery area match the published photographs", async () => {
  const photos = (await as("content", "/api/gallery-photos?limit=1000&depth=0&where[_status][equals]=published")).body.docs;
  const counts = {};

  for (const photo of photos) counts[photo.category] = (counts[photo.category] ?? 0) + 1;

  assert.ok(Object.keys(counts).length, "no published photographs — run the content migration first");

  const home = await page("/");

  for (const [category, count] of Object.entries(counts)) {
    const label = `${count} ${count === 1 ? "photograph" : "photographs"}`;

    assert.ok(home.includes(label), `the homepage does not show "${label}" for ${category}`);
  }
});
