import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as } from "./helpers.mjs";

/* Phase 6: the CMS drives the website.

   PUB-04 / A10 — a published edit reaches the page within 60 seconds, with no
   deployment. CNT-05 — a draft never does. Uses the migrated testimonials, so
   the content migration must have run first (CI does this). */

const home = async () => (await fetch(`${BASE}/`, { cache: "no-store" })).text();

async function waitFor(predicate, seconds) {
  const deadline = Date.now() + seconds * 1000;

  while (Date.now() < deadline) {
    if (await predicate()) return true;
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return false;
}

test("CMS: a draft stays off the website; publishing puts it live within 60 seconds", async (t) => {
  const found = await as(
    "content",
    "/api/testimonials?where[name][equals]=Mitchelle&limit=1",
  );
  const doc = found.body?.docs?.[0];

  assert.ok(doc, "the migrated testimonial is missing — run the content migration first");

  const original = doc.quote;
  const stamp = Date.now();

  // Always put the original back, even if an assertion fails.
  t.after(async () => {
    await as("content", `/api/testimonials/${doc.id}`, {
      method: "PATCH",
      body: JSON.stringify({ quote: original, _status: "published" }),
    });
  });

  const draftText = `DRAFT-ONLY-${stamp}`;
  const draft = await as("content", `/api/testimonials/${doc.id}?draft=true`, {
    method: "PATCH",
    body: JSON.stringify({ quote: draftText }),
  });

  assert.equal(draft.status, 200, "the Content Manager could not save a draft");

  await home();
  const afterDraft = await home();

  assert.ok(!afterDraft.includes(draftText), "a draft appeared on the website");
  assert.ok(
    afterDraft.includes(original.slice(0, 40)),
    "saving a draft removed the published quote from the website",
  );

  const publishedText = `PUBLISHED-EDIT-${stamp}`;
  const published = await as("content", `/api/testimonials/${doc.id}`, {
    method: "PATCH",
    body: JSON.stringify({ quote: publishedText, _status: "published" }),
  });

  assert.equal(published.status, 200, "the Content Manager could not publish");

  const live = await waitFor(async () => (await home()).includes(publishedText), 60);

  assert.ok(live, "the published edit did not reach the homepage within 60 seconds");
});
