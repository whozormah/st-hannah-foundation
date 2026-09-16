import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "fs";

import { BASE, as, login } from "./helpers.mjs";

/* CR-023: the gallery's video highlights play the Foundation's own video files.
   Makes its own highlights and clip, and removes them afterwards. */

const CLIP = readFileSync(new URL("./fixtures/event-loop.mp4", import.meta.url));

test("gallery: a highlight with an uploaded video plays on the page; a placeholder link shows nothing", async (t) => {
  const stamp = Date.now();
  const form = new FormData();

  form.append("file", new Blob([CLIP], { type: "video/mp4" }), `gallery-test-${stamp}.mp4`);
  form.append("_payload", JSON.stringify({ alt: `Gallery test clip ${stamp}` }));

  const uploaded = await fetch(`${BASE}/api/media`, {
    method: "POST",
    headers: { Authorization: `JWT ${await login("owner")}` },
    body: form,
  });
  const clip = (await uploaded.json()).doc;

  assert.equal(uploaded.status, 201, "could not upload the clip");

  const withFile = await as("content", "/api/video-highlights", {
    method: "POST",
    body: JSON.stringify({ title: `Uploaded Highlight ${stamp}`, video: clip.id, order: -1000, _status: "published" }),
  });
  const placeholder = await as("content", "/api/video-highlights", {
    method: "POST",
    body: JSON.stringify({ title: `Placeholder Highlight ${stamp}`, link: "https://youtube.com", order: -999, _status: "published" }),
  });

  t.after(async () => {
    for (const result of [withFile, placeholder]) {
      if (result.body?.doc?.id) await as("owner", `/api/video-highlights/${result.body.doc.id}`, { method: "DELETE" });
    }
    await as("owner", `/api/media/${clip.id}`, { method: "DELETE" });
  });

  assert.equal(withFile.status, 201, `could not create the highlight: ${JSON.stringify(withFile.body).slice(0, 200)}`);
  assert.equal(placeholder.status, 201, "could not create the placeholder");

  const html = await (await fetch(`${BASE}/gallery`, { cache: "no-store" })).text();

  assert.ok(html.includes(`Uploaded Highlight ${stamp}`) && html.includes(clip.filename), "the uploaded video is not on the gallery page");
  assert.ok(!html.includes(`Placeholder Highlight ${stamp}`), "a placeholder link was shown");
});

test("homepage: Stories in Motion plays an uploaded video highlight and links to all the videos", async (t) => {
  const stamp = Date.now();
  const form = new FormData();

  form.append("file", new Blob([CLIP], { type: "video/mp4" }), `motion-test-${stamp}.mp4`);
  form.append("_payload", JSON.stringify({ alt: `Motion test clip ${stamp}` }));

  const uploaded = await fetch(`${BASE}/api/media`, {
    method: "POST",
    headers: { Authorization: `JWT ${await login("owner")}` },
    body: form,
  });
  const clip = (await uploaded.json()).doc;

  assert.equal(uploaded.status, 201, "could not upload the clip");

  const highlight = await as("content", "/api/video-highlights", {
    method: "POST",
    body: JSON.stringify({ title: `Motion Highlight ${stamp}`, video: clip.id, order: -2000, _status: "published" }),
  });
  const page = (await as("owner", "/api/pages?where[slug][equals]=home&limit=1&depth=0")).body.docs[0];

  t.after(async () => {
    await as("owner", `/api/pages/${page.id}`, { method: "PATCH", body: JSON.stringify({ blocks: page.blocks, _status: "published" }) });
    if (highlight.body?.doc?.id) await as("owner", `/api/video-highlights/${highlight.body.doc.id}`, { method: "DELETE" });
    await as("owner", `/api/media/${clip.id}`, { method: "DELETE" });
  });

  assert.equal(highlight.status, 201, "could not create the highlight");

  const blocks = [
    ...page.blocks.filter((block) => block.blockType !== "storiesInMotion"),
    { blockType: "storiesInMotion", title: `Stories In Motion ${stamp}` },
  ];
  const saved = await as("owner", `/api/pages/${page.id}`, { method: "PATCH", body: JSON.stringify({ blocks, _status: "published" }) });

  assert.equal(saved.status, 200, `could not add the section: ${JSON.stringify(saved.body).slice(0, 200)}`);

  const html = await (await fetch(`${BASE}/`, { cache: "no-store" })).text();

  assert.ok(html.includes(`Stories In Motion ${stamp}`), "the section is not on the homepage");
  assert.ok(html.includes(`Motion Highlight ${stamp}`) && html.includes(clip.filename), "the uploaded video is not in the section");
  assert.ok(html.includes('href="/gallery#videos"'), "the section does not link to all the videos");
});
