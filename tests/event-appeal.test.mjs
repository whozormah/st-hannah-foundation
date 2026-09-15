import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "fs";

import { BASE, as, login } from "./helpers.mjs";

/* CR-013: the homepage's event appeal. Uses its own test event and puts the
   homepage back afterwards. Needs the content migration first. */

const LOOP = readFileSync(new URL("./fixtures/event-loop.mp4", import.meta.url));

// Dates are counted in Lagos, as the section counts them.
const lagosDay = (offsetDays = 0) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: "Africa/Lagos" }).format(new Date(Date.now() + offsetDays * 86_400_000));
const noonUTC = (day) => `${day}T12:00:00.000Z`;

const home = async () => (await fetch(`${BASE}/`, { cache: "no-store" })).text();

/* Just this test's event section: the homepage may show other appeals too,
   and their countdowns must not pass or fail these checks. */
function sectionOf(html, title) {
  const at = html.indexOf(title);

  if (at < 0) return "";

  const start = html.lastIndexOf("<section", at);
  const end = html.indexOf("</section>", at);

  return html.slice(start, end);
}
const settle = () => new Promise((resolve) => setTimeout(resolve, 2000));

async function upload(file, name, type, alt) {
  const form = new FormData();

  form.append("file", new Blob([file], { type }), name);
  form.append("_payload", JSON.stringify({ alt }));

  const response = await fetch(`${BASE}/api/media`, {
    method: "POST",
    headers: { Authorization: `JWT ${await login("owner")}` },
    body: form,
  });

  return { status: response.status, body: await response.json() };
}

async function withEvent(t, fields) {
  const page = (await as("owner", "/api/pages?where[slug][equals]=home&limit=1&depth=0")).body.docs[0];
  const poster = (await as("owner", "/api/media?limit=1&depth=0&where[mimeType][contains]=image")).body.docs[0];

  assert.ok(page && poster, "run the content migration first");

  const stamp = Date.now();
  const created = await as("content", "/api/events", {
    method: "POST",
    body: JSON.stringify({
      title: `Test Appeal ${stamp}`,
      date: noonUTC(lagosDay(10)),
      venue: "25 Ilaje Road, Bariga, Lagos",
      summary: `Why it matters ${stamp}.`,
      poster: poster.id,
      mediaCaption: "Widows Program 2025",
      _status: "published",
      ...fields,
    }),
  });

  assert.equal(created.status, 201, `could not create the event: ${JSON.stringify(created.body).slice(0, 200)}`);

  const event = created.body.doc;

  t.after(async () => {
    await as("owner", `/api/pages/${page.id}`, {
      method: "PATCH",
      body: JSON.stringify({ blocks: page.blocks, _status: "published" }),
    });
    await as("owner", `/api/events/${event.id}`, { method: "DELETE" });
  });

  const shown = await as("content", `/api/pages/${page.id}`, {
    method: "PATCH",
    body: JSON.stringify({ blocks: [{ blockType: "eventAppeal", event: event.id }, ...page.blocks], _status: "published" }),
  });

  assert.equal(shown.status, 200, `could not add the section: ${JSON.stringify(shown.body).slice(0, 200)}`);

  return { event, stamp };
}

const setDate = (id, day, extra = {}) =>
  as("content", `/api/events/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ date: noonUTC(day), _status: "published", ...extra }),
  });

test("event appeal: before the day it counts down and asks for gifts", async (t) => {
  const { event, stamp } = await withEvent(t);

  await settle();
  const page = sectionOf(await home(), event.title);

  assert.ok(page, "the event is not on the homepage");
  assert.ok(page.includes("10 days to go"), "no countdown");
  assert.ok(
    page.includes(`data-countdown-to="${lagosDay(10)}T00:00:00+01:00"`),
    "the countdown does not count to the start of the day in Lagos",
  );
  assert.ok(page.includes(`Why it matters ${stamp}.`), "the summary is missing");
  assert.ok(page.includes("Widows Program 2025"), "the picture caption is missing");
  assert.ok(page.includes("Give now"), "no give button");
  assert.ok(
    page.includes("https://www.google.com/maps/search/?api=1&amp;query=25%20Ilaje%20Road%2C%20Bariga%2C%20Lagos"),
    "the venue does not link to a map",
  );
  assert.ok(page.includes("https://wa.me/?text="), "no WhatsApp share link");
  assert.ok(!page.includes("Download flyer"), "a flyer link shows without a flyer");
});

test("event appeal: says so on the day, and thanks people afterwards", async (t) => {
  const { event } = await withEvent(t);

  assert.equal((await setDate(event.id, lagosDay(0))).status, 200);
  await settle();
  assert.ok(sectionOf(await home(), event.title).includes("Happening today"), "the day itself is not announced");

  const thanks = `Thank you for ${Date.now()}`;

  assert.equal((await setDate(event.id, lagosDay(-3), { recap: { thankYou: thanks } })).status, 200);
  await settle();

  const after = sectionOf(await home(), event.title);

  assert.ok(after.includes(thanks), "no thank-you after the event");
  assert.ok(after.includes("Support the next programme"), "the appeal did not change after the event");
  assert.ok(!after.includes("days to go"), "still counting down after the event");
});

test("event appeal: an unpublished event is not shown", async (t) => {
  const { event } = await withEvent(t);

  const unpublished = await as("content", `/api/events/${event.id}`, {
    method: "PATCH",
    body: JSON.stringify({ _status: "draft" }),
  });

  assert.equal(unpublished.status, 200);
  await settle();
  assert.ok(!(await home()).includes(event.title), "an unpublished event reached the homepage");
});

test("event appeal: its video plays on phones, which ask for part of the file", async (t) => {
  const video = await upload(LOOP, `event-loop-${Date.now()}.mp4`, "video/mp4", "A brown test clip");

  assert.equal(video.status, 201, `could not upload the video: ${JSON.stringify(video.body).slice(0, 200)}`);

  await withEvent(t, { loop: video.body.doc.id, film: video.body.doc.id });

  // Registered after the event's own clean-up, so it runs after the event is
  // gone: content still in use cannot be deleted (CNT-08).
  t.after(async () => {
    const deleted = await as("owner", `/api/media/${video.body.doc.id}`, { method: "DELETE" });

    assert.equal(deleted.status, 200, "the test video was left in the library");
  });
  await settle();

  const page = await home();
  const path = new URL(video.body.doc.url, BASE).pathname;

  assert.ok(page.includes(`src="${path}"`), "the video is not in the section");

  const part = await fetch(`${BASE}${path}`, { headers: { Range: "bytes=0-99" } });

  assert.equal(part.status, 206, "the video cannot be streamed in parts (phones will not play it)");
  assert.match(part.headers.get("content-range") ?? "", /^bytes 0-99\//);
  assert.equal((await part.arrayBuffer()).byteLength, 100);
});

test("media: an image over 10 MB is refused (MED-03)", async () => {
  const png = Buffer.from(
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
    "base64",
  );
  const big = Buffer.concat([png, Buffer.alloc(11 * 1024 * 1024)]);
  const refused = await upload(big, `too-big-${Date.now()}.png`, "image/png", "Too big");

  assert.equal(refused.status, 400, `an 11 MB image was accepted (${refused.status})`);
  assert.match(JSON.stringify(refused.body), /limit is 10 MB/);
});
