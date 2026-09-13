import type { CollectionConfig, Field } from "payload";

import { allow } from "../access";
import { revalidateOnChange, revalidateOnDelete } from "../revalidate";
import { CMS_TAGS } from "../../lib/cms-tags";

/* Content, media and SEO — section 8.2: Owner and Administrator CRUD, Content
   Manager create/read/update but no delete, Case Officer and Finance none. */
export const contentAccess = {
  create: allow("owner", "administrator", "content"),
  read: allow("owner", "administrator", "content"),
  update: allow("owner", "administrator", "content"),
  delete: allow("owner", "administrator"),
};

// CNT-05: draft, preview and publish with version history on every content
// collection.
export const versions = { drafts: true } as const;

const seo: Field = {
  name: "seo",
  type: "group",
  fields: [
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    { name: "image", type: "relationship", relationTo: "media" },
  ],
};

const slug: Field = {
  name: "slug",
  type: "text",
  required: true,
  unique: true,
  index: true,
};

/* Images are paths to files the website already has, until the private
   Cloudflare storage exists (MED-01). Uploading into the media library now
   would put files on the server's disk, which a redeploy destroys. */
/* Shown on content the website does not display at present, so an editor
   is not left wondering why a published change appears nowhere. */
export const NOT_ON_WEBSITE =
  "Not shown on the website at the moment. The section that displayed this was retired; the content is kept here, ready if that section returns.";

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

/** Publishing refreshes the website (PUB-04); see payload/revalidate.ts. */
export const refreshes = (tag: string) => ({
  afterChange: [revalidateOnChange(tag)],
  afterDelete: [revalidateOnDelete(tag)],
});

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media item", plural: "Media" },
  upload: true,
  admin: { group: "Content" },
  access: contentAccess,
  fields: [
    // CNT-06: alt text is required, so a visible image can never publish
    // without it.
    { name: "alt", type: "text", required: true },
    { name: "caption", type: "text" },
    { name: "tags", type: "text", hasMany: true },
    {
      name: "uploadedBy",
      type: "relationship",
      relationTo: "admin-users",
      admin: { readOnly: true },
    },
  ],
};

/* Section 5.1, mapped to the programmes as they actually exist: the spec's
   early draft imagined a body and objectives; the real content has why,
   approach, beneficiaries and a closing call to action. */
export const Programmes: CollectionConfig = {
  slug: "programmes",
  labels: { singular: "Programme", plural: "Programmes" },
  hooks: refreshes(CMS_TAGS.programmes),
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "slug", "_status"] },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    slug,
    { name: "icon", type: "text" },
    imagePath("heroImage"),
    { name: "excerpt", type: "textarea" },
    { name: "why", type: "textarea" },
    { name: "approach", type: "textarea" },
    { name: "impact", type: "textarea" },
    list("activities"),
    list("beneficiaries"),
    { name: "ctaTitle", type: "text" },
    { name: "ctaText", type: "textarea" },
    { name: "order", type: "number" },
    seo,
  ],
};

/* Values are kept as the Foundation wrote them (MIG-07): "100+" and
   "October 2025" are stored as text, not converted into a number or a date
   the source never stated. */
export const ImpactStories: CollectionConfig = {
  slug: "impact-stories",
  labels: { singular: "Impact Story", plural: "Impact Stories" },
  hooks: refreshes(CMS_TAGS.stories),
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "category", "_status"] },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    slug,
    { name: "category", type: "text" },
    // One summary serves both the story list and the story page: in the
    // source they were separate fields holding identical text in all five.
    { name: "excerpt", type: "textarea" },
    { name: "beneficiaries", type: "text" },
    { name: "featured", type: "checkbox" },
    { name: "donationProgram", type: "text" },
    { name: "date", type: "text" },
    { name: "location", type: "text" },
    imagePath("image"),
    imagePaths("images"),
    { name: "challenge", type: "textarea" },
    { name: "response", type: "textarea" },
    { name: "impact", type: "textarea" },
    paragraphs("story"),
    {
      name: "quote",
      type: "group",
      fields: [
        { name: "text", type: "textarea" },
        { name: "author", type: "text" },
      ],
    },
    { name: "order", type: "number" },
    seo,
  ],
};

export const Leadership: CollectionConfig = {
  slug: "leadership",
  labels: { singular: "Leader", plural: "Leadership" },
  hooks: refreshes(CMS_TAGS.leadership),
  admin: { useAsTitle: "name", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "position", type: "text", required: true },
    imagePath("image"),
    { name: "bio", type: "textarea" },
    { name: "order", type: "number" },
  ],
};

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  hooks: refreshes(CMS_TAGS.testimonials),
  admin: { useAsTitle: "name", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "quote", type: "textarea", required: true },
    { name: "name", type: "text", required: true },
    { name: "role", type: "text" },
    { name: "photo", type: "relationship", relationTo: "media" },
    { name: "order", type: "number" },
  ],
};

export const Faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: { useAsTitle: "question", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "question", type: "text", required: true },
    { name: "answer", type: "textarea", required: true },
    { name: "category", type: "text" },
    { name: "order", type: "number" },
  ],
};

/* CNT-01: the flexible block canvas is for the homepage and legal pages only.
   Every other page keeps a fixed template. CNT-04: no block accepts free-form
   HTML or arbitrary styling. */
export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: { useAsTitle: "title", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    slug,
    {
      name: "blocks",
      type: "blocks",
      blocks: [
        {
          slug: "richText",
          fields: [{ name: "content", type: "richText" }],
        },
        {
          slug: "callToAction",
          fields: [
            { name: "heading", type: "text", required: true },
            { name: "body", type: "textarea" },
            { name: "buttonLabel", type: "text" },
            { name: "buttonHref", type: "text" },
          ],
        },
      ],
    },
    seo,
  ],
};

export const contentCollections = [
  Media,
  Programmes,
  ImpactStories,
  Leadership,
  Testimonials,
  Faqs,
  Pages,
];
