/* Builds the website's icon from the Foundation's logo (CR-032).
   The logo is fine brown line-work that disappears at tab size, so the
   portrait is cropped out of it, its lines painted cream, and set on the
   Foundation's brown. Run with: node scripts/make-favicon.mjs */
import sharp from "sharp";
import fs from "node:fs/promises";

const SIZE = 512;
const INNER = 404;
const BROWN = { r: 0x6f, g: 0x34, b: 0x03 };
const CREAM = { r: 0xf6, g: 0xeb, b: 0xd8 };

const { width, height } = await sharp("public/logo.png").metadata();

// The portrait alone: the ring of lettering is unreadable at this size.
const head = await sharp("public/logo.png")
  .extract({
    left: Math.round(width * 0.2),
    top: Math.round(height * 0.14),
    width: Math.round(width * 0.6),
    height: Math.round(height * 0.64),
  })
  .flatten({ background: "#ffffff" })
  .resize(INNER, INNER, { fit: "contain", background: "#ffffff" })
  .toBuffer();

// Staged, because sharp reorders operations within a single pipeline.
const inverted = await sharp(head).greyscale().negate().png().toBuffer();
const alpha = await sharp(inverted).linear(3.6, 0).toColourspace("b-w").raw().toBuffer();

const lines = await sharp({ create: { width: INNER, height: INNER, channels: 3, background: CREAM } })
  .joinChannel(alpha, { raw: { width: INNER, height: INNER, channels: 1 } })
  .png()
  .toBuffer();

const ground = Buffer.from(
  `<svg width="${SIZE}" height="${SIZE}"><rect width="${SIZE}" height="${SIZE}" rx="112" fill="#6F3403"/></svg>`,
);

const icon = await sharp({ create: { width: SIZE, height: SIZE, channels: 4, background: { ...BROWN, alpha: 0 } } })
  .composite([{ input: ground }, { input: lines, top: (SIZE - INNER) / 2, left: (SIZE - INNER) / 2 }])
  .png()
  .toBuffer();

await sharp(icon).toFile("app/icon.png");
await sharp(icon).resize(180, 180).flatten({ background: BROWN }).toFile("app/apple-icon.png");

// favicon.ico, for browsers and link previews that ask for it by name.
const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => sharp(icon).resize(s, s).png({ compressionLevel: 9 }).toBuffer()));
const header = Buffer.alloc(6 + 16 * sizes.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
sizes.forEach((size, i) => {
  const at = 6 + 16 * i;
  header.writeUInt8(size, at);
  header.writeUInt8(size, at + 1);
  header.writeUInt16LE(1, at + 4);
  header.writeUInt16LE(32, at + 6);
  header.writeUInt32LE(pngs[i].length, at + 8);
  header.writeUInt32LE(offset, at + 12);
  offset += pngs[i].length;
});
await fs.writeFile("app/favicon.ico", Buffer.concat([header, ...pngs]));

console.log("app/icon.png, app/apple-icon.png and app/favicon.ico written");
