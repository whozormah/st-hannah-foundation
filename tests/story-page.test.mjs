import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "fs";

import { BASE, as, login, readRefused } from "./helpers.mjs";

/* CR-021: a full transformation story. Each test makes its own story with
   synthetic content and removes it afterwards. */

const CLIP = readFileSync(new URL("./fixtures/event-loop.mp4", import.meta.url));

const pageOf = async (slug) => (await fetch(`${BASE}/impact-stories/${slug}`, { cache: "no-store" })).text();

async function uploadClip(stamp) {
  const form = new FormData();

  form.append("file", new Blob([CLIP], { type: "video/mp4" }), `story-test-${stamp}.mp4`);
  form.append("_payload", JSON.stringify({ alt: `Test clip ${stamp}` }));

  const response = await fetch(`${BASE}/api/media`, {
    method: "POST",
    headers: { Authorization: `JWT ${await login("owner")}` },
    body: form,
  });
  const body = await response.json();

  assert.equal(response.status, 201, `could not upload the clip: ${JSON.stringify(body).slice(0, 200)}`);

  return body.doc;
}

async function withStory(t, fields = {}, clip = null) {
  const stamp = `${Date.now()}${Math.floor(Math.random() * 1000)}`;
  const created = await as("content", "/api/impact-stories", {
    method: "POST",
    body: JSON.stringify({ title: `Test Story ${stamp}`, excerpt: `Synthetic story ${stamp}.`, _status: "published", ...fields }),
  });

  assert.equal(created.status, 201, `could not create the story: ${JSON.stringify(created.body).slice(0, 300)}`);

  const story = created.body.doc;

  t.after(async () => {
    await as("owner", `/api/impact-stories/${story.id}`, { method: "DELETE" });
    if (clip) await as("owner", `/api/media/${clip.id}`, { method: "DELETE" });
  });

  return { story, html: await pageOf(story.slug) };
}

test("story page: a testimony shows only once consent is confirmed, named or anonymous as chosen", async (t) => {
  const stamp = Date.now();
  const { html } = await withStory(t, {
    testimonies: [
      { quote: `Consented and named ${stamp}`, attribution: "named", name: `Named Person ${stamp}`, about: `Widow ${stamp}`, consentConfirmed: true },
      { quote: `Consented and anonymous ${stamp}`, attribution: "anonymous", name: `Withheld Name ${stamp}`, consentConfirmed: true },
      { quote: `Not yet consented ${stamp}`, attribution: "named", name: `Unconsented Person ${stamp}`, consentConfirmed: false },
    ],
  });

  assert.ok(html.includes("Voices of Transformation"), "the testimonies section is missing");
  assert.ok(html.includes(`Consented and named ${stamp}`) && html.includes(`Named Person ${stamp}`), "the named testimony is missing");
  assert.ok(html.includes(`Consented and anonymous ${stamp}`) && html.includes("Shared anonymously"), "the anonymous testimony is missing");
  assert.ok(!html.includes(`Withheld Name ${stamp}`), "an anonymous testimony's name reached the page");
  assert.ok(!html.includes(`Not yet consented ${stamp}`), "a testimony without consent reached the page");
  assert.ok(!html.includes(`Unconsented Person ${stamp}`), "the name of a person without consent reached the page");
});

test("story page: figures, event videos and video testimonies appear when added", async (t) => {
  const clip = await uploadClip(Date.now());
  const stamp = Date.now();
  const { html } = await withStory(
    t,
    {
      stats: [{ value: "123+", label: `Test figure ${stamp}` }],
      videos: [{ video: clip.id, title: `Test film ${stamp}` }],
      testimonies: [{ video: clip.id, attribution: "anonymous", consentConfirmed: true }],
    },
    clip,
  );

  assert.ok(html.includes(`Test figure ${stamp}`) && html.includes("123+"), "the figure is missing");
  assert.ok(html.includes("Watch The Story") && html.includes(`Test film ${stamp}`), "the event video is missing");
  assert.ok(html.includes("Voices of Transformation"), "the video testimony is missing");
  assert.ok(html.split(clip.filename).length - 1 >= 2, "the video file is not on the page for both uses");
});

test("story page: sections without content stay hidden, and the story can be shared", async (t) => {
  const { html } = await withStory(t, { story: [{ text: "A single synthetic paragraph." }] });

  for (const heading of ["Voices of Transformation", "Watch The Story", "Impact figures", "Moments From The Programme", "The Challenge"]) {
    assert.ok(!html.includes(heading), `"${heading}" shows with nothing in it`);
  }

  assert.ok(html.includes("Share This Story") && html.includes("wa.me"), "sharing is missing");
});

test("testimonies: a named one needs a name, and each needs words or a video", async () => {
  const stamp = Date.now();
  const unnamed = await as("content", "/api/impact-stories", {
    method: "POST",
    body: JSON.stringify({
      title: `Refused Story ${stamp}`,
      testimonies: [{ quote: "Words.", attribution: "named", consentConfirmed: true }],
    }),
  });
  const empty = await as("content", "/api/impact-stories", {
    method: "POST",
    body: JSON.stringify({
      title: `Refused Story Two ${stamp}`,
      testimonies: [{ attribution: "anonymous", consentConfirmed: true }],
    }),
  });

  for (const [what, result] of [["a named testimony without a name", unnamed], ["a testimony without words or video", empty]]) {
    if (result.status === 201) await as("owner", `/api/impact-stories/${result.body.doc.id}`, { method: "DELETE" });
    assert.equal(result.status, 400, `${what} was saved`);
  }
});

test("testimonies: visitors cannot read stories, and so their testimonies, through the API", async (t) => {
  const stamp = Date.now();
  const { story } = await withStory(t, {
    testimonies: [{ quote: `Private until consent ${stamp}`, attribution: "named", name: `API Person ${stamp}` }],
  });

  const direct = await as(null, `/api/impact-stories/${story.id}`);
  const list = await as(null, `/api/impact-stories?limit=100`);

  assert.ok(readRefused(direct), "a visitor read the story through the API");
  assert.ok(!JSON.stringify(list.body ?? {}).includes(`API Person ${stamp}`), "a visitor listed the testimony through the API");
});
