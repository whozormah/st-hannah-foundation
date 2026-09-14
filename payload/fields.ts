import type { Field } from "payload";

/* Images live in the media library (MIG-08): each is uploaded once, with its
   description (alt text, required by CNT-06), and chosen wherever it
   appears. Until Cloudflare R2 exists an upload is kept on the server's
   disk, which a redeploy discards (MED-01), so the library goes live with R2
   (CR-011). */
export const imageField = (name: string): Field => ({
  name,
  type: "upload",
  relationTo: "media",
});

export const imageFields = (name: string): Field => ({
  name,
  type: "upload",
  relationTo: "media",
  hasMany: true,
});

/** Short list items, edited as a list of lines. */
export const list = (name: string): Field => ({ name, type: "text", hasMany: true });

/** Paragraphs, each its own box, kept in order. */
export const paragraphs = (name: string): Field => ({
  name,
  type: "array",
  fields: [{ name: "text", type: "textarea", required: true }],
});
