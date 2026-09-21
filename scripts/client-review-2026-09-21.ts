/* The Foundation's review of 21 September 2026 (CR-031), as content:
   - the homepage leadership section loses its small label;
   - "Where It All Began" shows Prophetess Hannah Okoh's photograph.
   Run with the portrait's path as the first argument. Safe to run twice. */
import { getPayload } from "payload";
import config from "../payload.config";

const portrait = process.argv[2];
if (!portrait) throw new Error("Pass the portrait's path.");

const payload = await getPayload({ config });

const existing = (await payload.find({ collection: "media", where: { filename: { like: "hannah-okoh-portrait" } }, limit: 1, depth: 0, overrideAccess: true })).docs[0] as { id: number } | undefined;
const media = existing ?? (await payload.create({
  collection: "media",
  filePath: portrait,
  data: { alt: "Prophetess Hannah Okoh, smiling, in a gold gele and a gold necklace." } as never,
  overrideAccess: true,
}));

const page = (await payload.find({ collection: "pages", where: { slug: { equals: "home" } }, depth: 0, limit: 1, overrideAccess: true })).docs[0] as unknown as { id: number; blocks: Record<string, unknown>[] };
const blocks = page.blocks.map((block) =>
  block.blockType === "leadershipPreview" ? { ...block, eyebrow: "" }
    : block.blockType === "heartOfFoundation" ? { ...block, image: (media as { id: number }).id }
    : block,
);
await payload.update({ collection: "pages", id: page.id, data: { blocks, _status: "published" } as never, overrideAccess: true });

const after = (await payload.findByID({ collection: "pages", id: page.id, depth: 1, overrideAccess: true })) as unknown as { blocks: Record<string, { filename?: string } | string | undefined>[] };
const lead = after.blocks.find((b) => b.blockType === "leadershipPreview");
const heart = after.blocks.find((b) => b.blockType === "heartOfFoundation");
const photo = heart?.image as { filename?: string } | undefined;
console.log(`leadership label: ${JSON.stringify(lead?.eyebrow ?? "")} | heart photo: ${photo?.filename ?? "none"}`);
process.exit(0);
