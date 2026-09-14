import test from "node:test";
import assert from "node:assert/strict";

import { BASE, as } from "./helpers.mjs";

/* The homepage block canvas: CNT-01, CNT-03 (with CR-009's two additions),
   CNT-04 and PUB-07. Every test puts the homepage back as it was. Needs the
   content migration to have run first (CI does this). */

const home = async () => (await fetch(`${BASE}/`, { cache: "no-store" })).text();
const settle = () => new Promise((resolve) => setTimeout(resolve, 2000));

async function homepage() {
  const found = await as("content", "/api/pages?where[slug][equals]=home&limit=1&depth=0");
  const doc = found.body?.docs?.[0];

  assert.ok(doc, "no homepage — run the content migration first");

  return doc;
}

const publish = (id, blocks) =>
  as("content", `/api/pages/${id}`, {
    method: "PATCH",
    body: JSON.stringify({ blocks, _status: "published" }),
  });

const restoreAfter = (t, doc) =>
  t.after(async () => {
    await publish(doc.id, doc.blocks);
  });

/** A rich-text value holding one paragraph, optionally one link. */
const paragraph = (text, url) => ({
  root: {
    type: "root",
    format: "",
    indent: 0,
    version: 1,
    direction: "ltr",
    children: [
      {
        type: "paragraph",
        format: "",
        indent: 0,
        version: 1,
        direction: "ltr",
        textFormat: 0,
        children: [
          { type: "text", text, format: 0, detail: 0, mode: "normal", style: "", version: 1 },
          ...(url
            ? [
                {
                  type: "link",
                  version: 3,
                  format: "",
                  indent: 0,
                  direction: "ltr",
                  fields: { linkType: "custom", url, newTab: false },
                  children: [
                    { type: "text", text: "a link", format: 0, detail: 0, mode: "normal", style: "", version: 1 },
                  ],
                },
              ]
            : []),
        ],
      },
    ],
  },
});

test("blocks: all fourteen block types render, in the order the editor sets", async (t) => {
  const doc = await homepage();
  restoreAfter(t, doc);

  const stamp = Date.now();
  const m = (name) => `${name}-${stamp}`;

  // Deliberately not the standard order, so the order is proven to follow
  // the editor's rather than the code's.
  const blocks = [
    { blockType: "quote", text: m("quote"), author: "A. Person" },
    {
      blockType: "hero",
      slides: [{ title: m("hero"), image: "/hero/hero-1.jpg", buttonText: "Donate", buttonLink: "/donate" }],
    },
    { blockType: "callToAction", title: m("callToAction") },
    { blockType: "richText", content: paragraph(m("richText"), "/donate") },
    { blockType: "statistics", title: m("statistics") },
    {
      blockType: "imageText",
      title: m("imageText"),
      text: "Some text.",
      image: "/about/story.jpg",
      imageAlt: m("imageAlt"),
    },
    { blockType: "programmeCards", title: m("programmeCards") },
    { blockType: "galleryStrip", title: m("galleryStrip") },
    { blockType: "donationCallToAction", description: m("donationCallToAction") },
    { blockType: "storyCards", title: m("storyCards") },
    { blockType: "testimonials", title: m("testimonials") },
    { blockType: "leadershipPreview", title: m("leadershipPreview") },
    {
      blockType: "video",
      title: m("video"),
      thumbnail: "/hero/hero-2.jpg",
      thumbnailAlt: "A video still",
      link: "https://www.youtube.com/watch?v=test",
    },
    { blockType: "visionMission" },
  ];

  const saved = await publish(doc.id, blocks);

  assert.equal(saved.status, 200, `could not publish: ${JSON.stringify(saved.body).slice(0, 300)}`);

  await settle();
  const page = await home();
  const main = page.slice(page.indexOf("<main"), page.indexOf("</main>"));

  // Vision and mission carries no wording of its own: it shows the
  // Foundation's, so that is what is looked for.
  const foundation = (await as("content", "/api/globals/foundation?depth=0")).body;
  const markers = blocks.map((block) =>
    block.blockType === "visionMission" ? foundation.vision : m(block.blockType),
  );

  let last = -1;

  for (const [index, marker] of markers.entries()) {
    const at = main.indexOf(marker);

    assert.ok(at > -1, `${blocks[index].blockType} is not on the homepage`);
    assert.ok(at > last, `${blocks[index].blockType} is out of order`);
    last = at;
  }

  assert.ok(main.includes(`alt="${m("imageAlt")}"`), "the image's description is not its alt text");
  assert.equal((page.match(/<h1[\s>]/g) ?? []).length, 1, "the homepage must have exactly one h1");
});

test("blocks: a removed section leaves the page, and one h1 remains", async (t) => {
  const doc = await homepage();
  restoreAfter(t, doc);

  const stamp = `only-${Date.now()}`;
  const saved = await publish(doc.id, [{ blockType: "quote", text: stamp }]);

  assert.equal(saved.status, 200);
  await settle();

  const page = await home();

  assert.ok(page.includes(stamp), "the one remaining section is missing");
  assert.ok(!page.includes("Meet the leaders behind the mission"), "a removed section still shows");
  assert.ok(!page.includes("swiper"), "the removed hero still shows");
  assert.equal((page.match(/<h1[\s>]/g) ?? []).length, 1, "without the hero there must still be one h1");
});

test("blocks: a draft of the homepage stays off the website (CNT-05)", async (t) => {
  const doc = await homepage();
  restoreAfter(t, doc);

  const stamp = `draft-${Date.now()}`;
  const saved = await as("content", `/api/pages/${doc.id}?draft=true`, {
    method: "PATCH",
    body: JSON.stringify({ blocks: [{ blockType: "quote", text: stamp }, ...doc.blocks] }),
  });

  assert.equal(saved.status, 200);
  await settle();
  assert.ok(!(await home()).includes(stamp), "a draft reached the homepage");
});

test("blocks: only the homepage is built from blocks (CNT-01, CNT-02)", async () => {
  const response = await as("content", "/api/pages", {
    method: "POST",
    body: JSON.stringify({ title: "About", slug: "about", blocks: [] }),
  });

  assert.equal(response.status, 400, "a page other than the homepage was created");
});

test("blocks: unsafe links are refused (CNT-04)", async (t) => {
  const doc = await homepage();
  restoreAfter(t, doc);

  const attempts = {
    "a javascript: button link": {
      blockType: "imageText",
      title: "x",
      text: "x",
      image: "/about/story.jpg",
      imageAlt: "x",
      buttonLabel: "Go",
      buttonLink: "javascript:alert(1)",
    },
    "a hero button to an insecure address": {
      blockType: "hero",
      slides: [{ title: "x", buttonText: "Go", buttonLink: "http://example.com" }],
    },
    "a video link that is not a video": {
      blockType: "video",
      title: "x",
      thumbnail: "/hero/hero-2.jpg",
      thumbnailAlt: "x",
      link: "https://youtube.com",
    },
    "a javascript: link in rich text": {
      blockType: "richText",
      content: paragraph("x", "javascript:alert(1)"),
    },
  };

  // Checked on publishing, which is what puts content on the site. Payload
  // does not validate a draft, so an unfinished one can be saved; the
  // sections also refuse to render an unsafe link either way.
  for (const [what, block] of Object.entries(attempts)) {
    const response = await publish(doc.id, [block]);

    assert.equal(response.status, 400, `${what} was accepted`);
  }
});

test("blocks: HTML, styles and classes are never stored (CNT-04)", async (t) => {
  const doc = await homepage();
  restoreAfter(t, doc);

  const saved = await as("content", `/api/pages/${doc.id}?draft=true`, {
    method: "PATCH",
    body: JSON.stringify({
      blocks: [
        {
          blockType: "quote",
          text: "Plain words.",
          html: "<script>alert(1)</script>",
          style: "color: red",
          className: "anything",
        },
      ],
    }),
  });

  assert.equal(saved.status, 200);

  const draft = (await as("content", `/api/pages/${doc.id}?draft=true&depth=0`)).body;
  const quote = draft.blocks[0];

  for (const key of ["html", "style", "className"]) {
    assert.ok(!(key in quote), `a block stored "${key}"`);
  }
});
