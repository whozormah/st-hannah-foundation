import type { CollectionConfig, Field } from "payload";

import { allow } from "../access";

/* Content, media and SEO — section 8.2: Owner and Administrator CRUD, Content
   Manager create/read/update but no delete, Case Officer and Finance none. */
const contentAccess = {
  create: allow("owner", "administrator", "content"),
  read: allow("owner", "administrator", "content"),
  update: allow("owner", "administrator", "content"),
  delete: allow("owner", "administrator"),
};

// CNT-05: draft, preview and publish with version history on every content
// collection.
const versions = { drafts: true } as const;

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

export const Media: CollectionConfig = {
  slug: "media",
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

export const Programmes: CollectionConfig = {
  slug: "programmes",
  admin: { useAsTitle: "name", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "name", type: "text", required: true },
    slug,
    { name: "excerpt", type: "textarea" },
    { name: "body", type: "richText" },
    { name: "heroImage", type: "relationship", relationTo: "media" },
    { name: "gallery", type: "relationship", relationTo: "media", hasMany: true },
    { name: "objectives", type: "text", hasMany: true },
    { name: "activities", type: "text", hasMany: true },
    { name: "impact", type: "textarea" },
    { name: "featured", type: "checkbox" },
    { name: "order", type: "number" },
    seo,
  ],
};

export const ImpactStories: CollectionConfig = {
  slug: "impact-stories",
  admin: { useAsTitle: "title", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    slug,
    { name: "excerpt", type: "textarea" },
    { name: "body", type: "richText" },
    { name: "featuredImage", type: "relationship", relationTo: "media" },
    { name: "images", type: "relationship", relationTo: "media", hasMany: true },
    // The relationship that makes "related stories" real rather than guessed.
    { name: "programme", type: "relationship", relationTo: "programmes" },
    { name: "date", type: "date" },
    { name: "location", type: "text" },
    { name: "beneficiariesReached", type: "number" },
    seo,
  ],
};

export const GalleryAlbums: CollectionConfig = {
  slug: "gallery-albums",
  admin: { useAsTitle: "title", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    slug,
    { name: "description", type: "textarea" },
    { name: "cover", type: "relationship", relationTo: "media" },
    { name: "images", type: "relationship", relationTo: "media", hasMany: true },
    { name: "programme", type: "relationship", relationTo: "programmes" },
    { name: "order", type: "number" },
  ],
};

export const Leadership: CollectionConfig = {
  slug: "leadership",
  admin: { useAsTitle: "name", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "position", type: "text", required: true },
    { name: "bio", type: "textarea" },
    { name: "photo", type: "relationship", relationTo: "media" },
    { name: "order", type: "number" },
  ],
};

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
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
  GalleryAlbums,
  Leadership,
  Testimonials,
  Faqs,
  Pages,
];
