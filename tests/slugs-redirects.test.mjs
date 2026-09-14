import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as } from "./helpers.mjs";

/* CNT-07 and PUB-01: slugs come from titles, stay editable, and an address
   that changes after publishing keeps working. Uses its own test programme,
   removed afterwards. */

const page = (path) => fetch(`${BASE}${path}`, { redirect: "manual" });

async function removeProgramme(id) {
  await as("owner", `/api/programmes/${id}`, { method: "DELETE" });
}

async function removeRedirects(stamp) {
  const found = await as("owner", `/api/redirects?limit=100&depth=0&where[from][contains]=${stamp}`);

  for (const doc of found.body?.docs ?? []) {
    await as("owner", `/api/redirects/${doc.id}`, { method: "DELETE" });
  }
}

test("slugs: filled in from the title, and what an editor types is tidied", async (t) => {
  const stamp = Date.now();
  const created = await as("content", "/api/programmes?draft=true", {
    method: "POST",
    body: JSON.stringify({ title: `Widows' Support & Care ${stamp}` }),
  });

  assert.equal(created.status, 201, `could not create: ${JSON.stringify(created.body).slice(0, 200)}`);
  t.after(() => removeProgramme(created.body.doc.id));

  assert.equal(created.body.doc.slug, `widows-support-and-care-${stamp}`);

  const typed = await as("content", `/api/programmes/${created.body.doc.id}?draft=true`, {
    method: "PATCH",
    body: JSON.stringify({ slug: `  Medical Aid ${stamp} ` }),
  });

  assert.equal(typed.status, 200);
  assert.equal(typed.body.doc.slug, `medical-aid-${stamp}`);
});

test("slugs: changing a published address keeps the old one working, with no chains", async (t) => {
  const stamp = Date.now();
  const [a, b, c] = ["first", "second", "third"].map((word) => `test-${word}-${stamp}`);
  const created = await as("content", "/api/programmes", {
    method: "POST",
    body: JSON.stringify({ title: `Redirect test ${stamp}`, slug: a, _status: "published" }),
  });

  assert.equal(created.status, 201, `could not create: ${JSON.stringify(created.body).slice(0, 200)}`);

  const id = created.body.doc.id;

  t.after(async () => {
    await removeProgramme(id);
    await removeRedirects(stamp);
  });

  const publish = (slug) =>
    as("content", `/api/programmes/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ slug, _status: "published" }),
    });
  const expectRedirect = async (from, to) => {
    const response = await page(from);

    assert.equal(response.status, 308, `${from} does not redirect (${response.status})`);
    assert.equal(response.headers.get("location"), to, `${from} redirects to the wrong place`);
  };
  const expectLive = async (path) => {
    assert.equal((await page(path)).status, 200, `${path} is not live`);
  };

  // A draft changes no address.
  await as("content", `/api/programmes/${id}?draft=true`, {
    method: "PATCH",
    body: JSON.stringify({ slug: `test-draft-${stamp}` }),
  });
  await expectLive(`/programs/${a}`);
  assert.equal(
    (await as("owner", `/api/redirects?depth=0&where[from][equals]=/programs/${a}`)).body.totalDocs,
    0,
    "saving a draft created a redirect",
  );

  assert.equal((await publish(b)).status, 200);
  await expectLive(`/programs/${b}`);
  await expectRedirect(`/programs/${a}`, `/programs/${b}`);

  // A second change: both old addresses go straight to the newest.
  assert.equal((await publish(c)).status, 200);
  await expectRedirect(`/programs/${a}`, `/programs/${c}`);
  await expectRedirect(`/programs/${b}`, `/programs/${c}`);

  // Back to the first: it is live again, not redirected in a loop.
  assert.equal((await publish(a)).status, 200);
  await expectLive(`/programs/${a}`);
  await expectRedirect(`/programs/${c}`, `/programs/${a}`);
});

test("redirects: an Administrator's redirect works; an unsafe one cannot be saved", async (t) => {
  const stamp = Date.now();
  const from = `/old-page-${stamp}`;
  const saved = await as("administrator", "/api/redirects", {
    method: "POST",
    body: JSON.stringify({ from, to: "/about" }),
  });

  assert.equal(saved.status, 201, `could not save: ${JSON.stringify(saved.body).slice(0, 200)}`);
  t.after(() => removeRedirects(stamp));

  const response = await page(from);

  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "/about");

  for (const [bad, to] of [
    [`//evil.example/${stamp}`, "/about"],
    [`/unsafe-${stamp}`, "javascript:alert(1)"],
    [`/insecure-${stamp}`, "http://example.com"],
  ]) {
    const refused = await as("administrator", "/api/redirects", {
      method: "POST",
      body: JSON.stringify({ from: bad, to }),
    });

    assert.equal(refused.status, 400, `a redirect from ${bad} to ${to} was accepted`);
  }

  assert.equal((await page(`/no-such-page-${stamp}`)).status, 404, "an unknown address no longer 404s");
});
