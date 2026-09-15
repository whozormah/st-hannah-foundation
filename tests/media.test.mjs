import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "fs";

import { BASE, as, login } from "./helpers.mjs";

/* The media library: MIG-08, CNT-06, MED-01 and CR-011. Needs the content
   migration to have run first (CI does this). */

const drafts = JSON.parse(
  readFileSync(new URL("../scripts/data/alt-text-drafts.json", import.meta.url), "utf8"),
).images;

const library = async () => (await as("content", "/api/media?limit=1000&depth=0")).body.docs;
const settle = () => new Promise((resolve) => setTimeout(resolve, 2000));

// A 1×1 PNG, for uploads that must be refused before they are stored.
const PNG = Buffer.from(
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAMAASsJTYQAAAAASUVORK5CYII=",
  "base64",
);

test("media: every image the old website used is in the library, once, described (MIG-08, CNT-06)", async () => {
  const docs = await library();

  assert.ok(docs.length, "the media library is empty — run the content migration first");

  const holders = new Map();

  for (const doc of docs) {
    assert.ok(doc.alt?.trim(), `image ${doc.id} has no description`);

    for (const source of doc.sourcePaths ?? []) {
      assert.ok(!holders.has(source), `${source} was uploaded twice`);
      holders.set(source, doc.id);
    }
  }

  for (const source of Object.keys(drafts)) {
    assert.ok(holders.has(source), `${source} is not in the media library`);
  }

  // Checked among the images the migration brought in; staff uploads have
  // no migration record.
  const migrated = docs.filter((doc) => doc.sourceHash);

  assert.equal(
    new Set(migrated.map((doc) => doc.sourceHash)).size,
    migrated.length,
    "the same photograph is in the library twice",
  );
});

test("media: visitors can load every image and video, and nothing else (MED-01)", async () => {
  const response = await fetch(`${BASE}/api/media?limit=1000&depth=0`);

  assert.equal(response.status, 200, "a visitor cannot see the images the website shows");

  const { docs } = await response.json();

  for (const doc of docs) {
    for (const field of ["altApproved", "sourcePaths", "sourceHash", "uploadedBy", "tags"]) {
      assert.ok(!(field in doc), `a visitor can read "${field}"`);
    }

    const file = await fetch(new URL(new URL(doc.url, BASE).pathname, BASE));

    assert.equal(file.status, 200, `a visitor cannot load ${doc.filename}`);
    // Images, and since CR-013 event videos.
    assert.match(file.headers.get("content-type") ?? "", /^(image|video)\//, `${doc.filename} is not served as an image or video`);
    await file.arrayBuffer();
  }

  const id = docs[0].id;

  for (const [method, path, body] of [
    ["POST", "/api/media", { alt: "x" }],
    ["PATCH", `/api/media/${id}`, { alt: "changed by a visitor" }],
    ["DELETE", `/api/media/${id}`, undefined],
  ]) {
    const attempt = await fetch(`${BASE}${path}`, {
      method,
      headers: { "content-type": "application/json" },
      body: body && JSON.stringify(body),
    });

    assert.ok([401, 403].includes(attempt.status), `a visitor's ${method} was not refused (${attempt.status})`);
  }
});

test("media: an image without a description cannot be saved (CNT-06)", async () => {
  const before = (await library()).length;
  const form = new FormData();

  form.append("file", new Blob([PNG], { type: "image/png" }), "no-description.png");
  form.append("_payload", JSON.stringify({ alt: "" }));

  const response = await fetch(`${BASE}/api/media`, {
    method: "POST",
    headers: { Authorization: `JWT ${await login("content")}` },
    body: form,
  });

  assert.equal(response.status, 400, "an image without a description was accepted");
  assert.equal((await library()).length, before, "the refused image was stored anyway");
});

test("media: changing a description changes it on the page at once (PUB-04)", async (t) => {
  const home = (await as("content", "/api/pages?where[slug][equals]=home&limit=1&depth=0")).body.docs[0];
  const photo = (await library()).find((doc) => /^[\w ,.()-]+$/.test(doc.alt));

  assert.ok(home && photo, "run the content migration first");

  t.after(async () => {
    await as("content", `/api/media/${photo.id}`, {
      method: "PATCH",
      body: JSON.stringify({ alt: photo.alt }),
    });
    await as("content", `/api/pages/${home.id}`, {
      method: "PATCH",
      body: JSON.stringify({ blocks: home.blocks, _status: "published" }),
    });
  });

  const shown = await as("content", `/api/pages/${home.id}`, {
    method: "PATCH",
    body: JSON.stringify({
      blocks: [{ blockType: "imageText", title: "Described", text: "Some text.", image: photo.id }],
      _status: "published",
    }),
  });

  assert.equal(shown.status, 200);
  await settle();
  assert.ok((await (await fetch(`${BASE}/`)).text()).includes(`alt="${photo.alt}"`));

  const stamp = `A described photograph ${Date.now()}`;
  const changed = await as("content", `/api/media/${photo.id}`, {
    method: "PATCH",
    body: JSON.stringify({ alt: stamp }),
  });

  assert.equal(changed.status, 200, "the Content Manager could not change the description");
  await settle();
  assert.ok(
    (await (await fetch(`${BASE}/`)).text()).includes(`alt="${stamp}"`),
    "the first visit after the change showed the old description",
  );
});
