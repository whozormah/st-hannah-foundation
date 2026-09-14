import type { Field } from "payload";

/* Images are paths to files the website already has, until the private
   Cloudflare storage exists (MED-01). Uploading into the media library now
   would put files on the server's disk, which a redeploy destroys. */

export const IMAGE_PATH_HELP =
  "Path to an image the website already has, e.g. /impact/family-support/1.jpg. Uploading new images arrives with the Cloudflare storage.";

export const imagePath = (name: string): Field => ({
  name,
  type: "text",
  admin: { description: IMAGE_PATH_HELP },
});

export const imagePaths = (name: string): Field => ({
  name,
  type: "text",
  hasMany: true,
  admin: { description: IMAGE_PATH_HELP },
});

/** Short list items, edited as a list of lines. */
export const list = (name: string): Field => ({ name, type: "text", hasMany: true });

/** Paragraphs, each its own box, kept in order. */
export const paragraphs = (name: string): Field => ({
  name,
  type: "array",
  fields: [{ name: "text", type: "textarea", required: true }],
});
