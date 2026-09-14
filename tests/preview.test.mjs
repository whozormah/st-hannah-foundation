import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as, login } from "./helpers.mjs";

/* Previewing unpublished changes: CNT-05, section 9.2. Only content editors
   can turn preview on; only they see drafts, and a copied draft-mode cookie
   shows nobody else anything. Needs the content migration first. */

const get = (path, headers = {}) => fetch(`${BASE}${path}`, { headers, redirect: "manual" });
const jwt = async (role) => ({ Authorization: `JWT ${await login(role)}` });
const bypassCookie = (response) =>
  response.headers
    .getSetCookie()
    .find((cookie) => cookie.startsWith("__prerender_bypass="))
    ?.split(";")[0];

test("preview: visitors and staff who do not edit content cannot turn it on", async () => {
  const visitor = await get("/api/draft-preview?path=/");

  assert.equal(visitor.status, 401, "a visitor was not refused");
  assert.equal(bypassCookie(visitor), undefined, "a visitor was given the draft-mode cookie");

  for (const role of ["case", "finance"]) {
    const staff = await get("/api/draft-preview?path=/", await jwt(role));

    assert.equal(staff.status, 403, `${role} was not refused`);
    assert.equal(bypassCookie(staff), undefined, `${role} was given the draft-mode cookie`);
  }
});

test("preview: it only ever opens a page on this website", async () => {
  for (const path of ["//evil.example", "https://evil.example", "/\\evil.example", "", "donate"]) {
    const response = await get(`/api/draft-preview?path=${encodeURIComponent(path)}`, await jwt("content"));

    assert.equal(response.status, 400, `"${path}" was accepted`);
    assert.equal(bypassCookie(response), undefined);
  }
});

test("preview: a Content Manager sees a draft; nobody else does, even with the cookie", async (t) => {
  const found = await as("content", "/api/testimonials?where[name][equals]=Mitchelle&limit=1");
  const doc = found.body?.docs?.[0];

  assert.ok(doc, "the migrated testimonial is missing — run the content migration first");

  t.after(async () => {
    await as("content", `/api/testimonials/${doc.id}`, {
      method: "PATCH",
      body: JSON.stringify({ quote: doc.quote, _status: "published" }),
    });
  });

  const stamp = `PREVIEW-DRAFT-${Date.now()}`;
  const draft = await as("content", `/api/testimonials/${doc.id}?draft=true`, {
    method: "PATCH",
    body: JSON.stringify({ quote: stamp }),
  });

  assert.equal(draft.status, 200, "could not save a draft");

  const staff = await jwt("content");
  const opened = await get("/api/draft-preview?path=/", staff);
  const cookie = bypassCookie(opened);

  assert.ok([307, 308].includes(opened.status), `preview did not redirect (${opened.status})`);
  assert.equal(opened.headers.get("location"), "/", "preview did not open the page asked for");
  assert.ok(cookie, "preview did not turn on draft mode");

  const asEditor = await (await get("/", { ...staff, Cookie: cookie })).text();

  assert.ok(asEditor.includes(stamp), "the editor's preview does not show the draft");
  assert.ok(asEditor.includes("you are seeing unpublished changes"), "the preview banner is missing");

  const cookieOnly = await (await get("/", { Cookie: cookie })).text();

  assert.ok(!cookieOnly.includes(stamp), "the draft showed to someone holding only the cookie");
  assert.ok(!cookieOnly.includes("unpublished changes"), "the banner showed without a staff session");

  const visitor = await (await get("/")).text();

  assert.ok(!visitor.includes(stamp), "the draft reached a visitor");
  assert.ok(visitor.includes(doc.quote.slice(0, 40)), "the visitor no longer sees the published quote");
});

test("preview: Exit preview turns draft mode off", async () => {
  const opened = await get("/api/draft-preview?path=/team", await jwt("content"));
  const cookie = bypassCookie(opened);

  assert.ok(cookie);

  const exited = await get("/api/draft-preview/exit", { Cookie: cookie, Referer: `${BASE}/team` });
  const cleared = exited.headers
    .getSetCookie()
    .find((value) => value.startsWith("__prerender_bypass="));

  assert.ok([307, 308].includes(exited.status));
  assert.equal(exited.headers.get("location"), "/team", "exit did not return to the same page");
  assert.ok(cleared && /expires=Thu, 01 Jan 1970|max-age=0/i.test(cleared), "exit did not clear the cookie");
});
