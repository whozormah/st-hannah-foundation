import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as, login } from "./helpers.mjs";

/* CNT-08: content still in use cannot be deleted, and the refusal says where
   it is used. Needs the content migration first. */

// A 1×1 PNG.
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
  "base64",
);

async function upload(alt) {
  const form = new FormData();

  form.append("file", new Blob([PNG], { type: "image/png" }), `reference-test-${Date.now()}.png`);
  form.append("_payload", JSON.stringify({ alt }));

  const response = await fetch(`${BASE}/api/media`, {
    method: "POST",
    headers: { Authorization: `JWT ${await login("owner")}` },
    body: form,
  });
  const body = await response.json();

  assert.equal(response.status, 201, `could not upload: ${JSON.stringify(body).slice(0, 200)}`);

  return body.doc;
}

test("references: an image the homepage uses cannot be deleted, and the refusal names the page", async () => {
  const home = (await as("owner", "/api/pages?where[slug][equals]=home&limit=1&depth=0")).body.docs[0];
  const image = home?.blocks?.find((block) => block.blockType === "hero")?.slides?.[0]?.image;

  assert.ok(image, "the homepage hero has no image — run the content migration first");

  const refused = await as("owner", `/api/media/${image}`, { method: "DELETE" });
  const message = JSON.stringify(refused.body);

  assert.equal(refused.status, 409, `an image in use was deleted (${refused.status})`);
  assert.match(message, /Page \\"Homepage\\"/, "the refusal does not name the homepage");
  assert.equal((await as("owner", `/api/media/${image}?depth=0`)).status, 200, "the image is gone");
});

test("references: an image used only in a draft is protected too; once unused it can go", async (t) => {
  const home = (await as("owner", "/api/pages?where[slug][equals]=home&limit=1&depth=0")).body.docs[0];
  const photo = await upload(`A test image ${Date.now()}`);

  t.after(async () => {
    await as("owner", `/api/pages/${home.id}`, {
      method: "PATCH",
      body: JSON.stringify({ blocks: home.blocks, _status: "published" }),
    });
    await as("owner", `/api/media/${photo.id}`, { method: "DELETE" });
  });

  const draft = await as("content", `/api/pages/${home.id}?draft=true`, {
    method: "PATCH",
    body: JSON.stringify({
      blocks: [...home.blocks, { blockType: "imageText", title: "Draft", text: "Draft.", image: photo.id }],
    }),
  });

  assert.equal(draft.status, 200);

  const refused = await as("owner", `/api/media/${photo.id}`, { method: "DELETE" });

  assert.equal(refused.status, 409, "an image used in a draft was deleted");

  // Put the published homepage back as the latest version: nothing uses it now.
  const restored = await as("owner", `/api/pages/${home.id}`, {
    method: "PATCH",
    body: JSON.stringify({ blocks: home.blocks, _status: "published" }),
  });

  assert.equal(restored.status, 200);

  const deleted = await as("owner", `/api/media/${photo.id}`, { method: "DELETE" });

  assert.equal(deleted.status, 200, `an unused image could not be deleted: ${JSON.stringify(deleted.body).slice(0, 200)}`);
});
