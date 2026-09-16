import { APIError, type CollectionBeforeValidateHook, type CollectionConfig, type Field } from "payload";

import { allow, allowField } from "../access";
import {
  revalidateAllOnChange,
  revalidateAllOnDelete,
  revalidateOnChange,
  revalidateOnDelete,
} from "../revalidate";
import { CMS_TAGS } from "../../lib/cms-tags";
import { homepageBlocks } from "../blocks";
import { imageField, imageFields, list, paragraphs } from "../fields";
import { slugField } from "../slugs";

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

/* Shown on content the website does not display at present, so an editor
   is not left wondering why a published change appears nowhere. */
export const NOT_ON_WEBSITE =
  "Not shown on the website at the moment. The section that displayed this was retired; the content is kept here, ready if that section returns.";

// Field helpers live in ../fields, which the block library shares; they are
// re-exported so existing imports keep working.
export { imageField, imageFields, list, paragraphs } from "../fields";

/** Publishing refreshes the website (PUB-04); see payload/revalidate.ts. */
export const refreshes = (tag: string) => ({
  afterChange: [revalidateOnChange(tag)],
  afterDelete: [revalidateOnDelete(tag)],
});

/* Every image here is published on the website, so anyone may view one and
   its description: a visitor's browser has to load the file, and Payload
   serves a file only to someone allowed to read it (MED-01: site media is
   public). Uploading, editing and deleting stay with the content roles
   (section 8.2), and the record-keeping fields are for staff only. */
const staffOnly = allowField("owner", "administrator", "content");

/* MED-03, extended by CR-013: images up to 10 MB, videos (MP4) up to 50 MB.
   Checked when a file arrives, before anything is stored. */
const MB = 1024 * 1024;
const UPLOAD_LIMITS: Record<string, number> = { image: 10 * MB, video: 50 * MB };

const enforceUploadLimits: CollectionBeforeValidateHook = ({ data }) => {
  const size = Number((data as { filesize?: unknown } | undefined)?.filesize);
  const kind = String((data as { mimeType?: unknown } | undefined)?.mimeType ?? "").split("/")[0];
  const limit = UPLOAD_LIMITS[kind];

  if (limit && size > limit) {
    throw new APIError(
      `This ${kind} is ${(size / MB).toFixed(1)} MB; the limit is ${limit / MB} MB. Use a smaller version.`,
      400,
      undefined,
      true,
    );
  }

  return data;
};

export const Media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Image", plural: "Media Library" },
  upload: { mimeTypes: ["image/jpeg", "image/png", "image/webp", "video/mp4"] },
  hooks: {
    beforeValidate: [enforceUploadLimits],
    afterChange: [revalidateAllOnChange],
    afterDelete: [revalidateAllOnDelete],
  },
  admin: {
    group: "Content",
    useAsTitle: "alt",
    defaultColumns: ["filename", "alt", "altApproved"],
  },
  access: { ...contentAccess, read: () => true },
  fields: [
    // CNT-06: required, so an image can never be used without one.
    {
      name: "alt",
      label: "Image Description (Alt Text)",
      type: "text",
      required: true,
      admin: {
        description:
          "What the image shows, for people who cannot see it. Describe only what is visible: no names, places or events the picture does not show.",
      },
    },
    {
      name: "altApproved",
      label: "Description Approved by the Foundation",
      type: "checkbox",
      defaultValue: false,
      access: { read: staffOnly },
      admin: {
        description:
          "The descriptions carried over from the old website were drafted by the developer (CR-011). Tick once the Foundation has checked this one.",
      },
    },
    { name: "caption", type: "text" },
    { name: "tags", type: "text", hasMany: true, access: { read: staffOnly } },
    {
      name: "uploadedBy",
      type: "relationship",
      relationTo: "admin-users",
      access: { read: staffOnly },
      admin: { readOnly: true },
    },
    {
      name: "sourcePaths",
      label: "Previously At",
      type: "text",
      hasMany: true,
      access: { read: staffOnly },
      admin: {
        readOnly: true,
        description:
          "Where this image was on the website before the media library, kept to trace the migration (MIG-08).",
      },
    },
    // Identifies the photograph itself, so the migration uploads each once.
    {
      name: "sourceHash",
      type: "text",
      unique: true,
      index: true,
      access: { read: staffOnly },
      admin: { hidden: true },
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
    slugField({ from: "title" }),
    { name: "icon", type: "text" },
    imageField("heroImage"),
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
const storyImagesOnly = { mimeType: { contains: "image" } };
const storyVideosOnly = { mimeType: { contains: "video" } };

export const ImpactStories: CollectionConfig = {
  slug: "impact-stories",
  labels: { singular: "Impact Story", plural: "Impact Stories" },
  hooks: refreshes(CMS_TAGS.stories),
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "category", "_status"] },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    slugField({ from: "title" }),
    { name: "category", type: "text" },
    {
      name: "programme",
      type: "relationship",
      relationTo: "programmes",
      admin: {
        description:
          "The programme this story came out of, shown on its card as \"Part of our … programme\". Leave it empty if it belongs to none.",
      },
    },
    // One summary serves both the story list and the story page: in the
    // source they were separate fields holding identical text in all five.
    { name: "excerpt", type: "textarea" },
    { name: "beneficiaries", type: "text" },
    { name: "featured", type: "checkbox" },
    { name: "donationProgram", type: "text" },
    { name: "date", type: "text" },
    { name: "location", type: "text" },
    imageField("image"),
    imageFields("images"),
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
    /* CR-021: a full transformation story. Every part is optional and its
       section on the page stays hidden until it has real content. */
    {
      name: "stats",
      label: "Impact Figures",
      type: "array",
      labels: { singular: "Figure", plural: "Figures" },
      admin: {
        description:
          "Shown beneath the story's opening, such as \"500+\" and \"Widows gathered\". Only figures the Foundation has confirmed.",
      },
      fields: [
        { name: "value", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      ...imageFields("supportingImages"),
      label: "Pictures Within The Story",
      filterOptions: storyImagesOnly,
      admin: { description: "Placed between the paragraphs of the story, in this order." },
    } as Field,
    {
      name: "videos",
      label: "Event Videos",
      type: "array",
      labels: { singular: "Video", plural: "Videos" },
      fields: [
        { name: "video", type: "upload", relationTo: "media", required: true, filterOptions: storyVideosOnly },
        { name: "title", type: "text" },
        {
          ...imageField("poster"),
          label: "Cover Picture",
          filterOptions: storyImagesOnly,
          admin: { description: "Optional: shown before the video plays." },
        } as Field,
      ],
    },
    {
      name: "testimonies",
      label: "Testimonies",
      type: "array",
      labels: { singular: "Testimony", plural: "Testimonies" },
      admin: {
        description:
          "Real testimonies from the people the story is about. Upload a testimony's video or photograph only once they have agreed to it being published.",
      },
      validate: ((rows: unknown) =>
        !Array.isArray(rows) ||
        rows.every((row: { quote?: string; video?: unknown }) => row?.quote?.trim() || row?.video) ||
        "Each testimony needs their words, a video, or both.") as never,
      fields: [
        {
          name: "quote",
          label: "Their Words",
          type: "textarea",
          admin: {
            description: "As they gave them. Correct spelling or punctuation only, never the meaning.",
          },
        },
        { name: "video", label: "Video Testimony", type: "upload", relationTo: "media", filterOptions: storyVideosOnly },
        { ...imageField("photo"), label: "Photograph", filterOptions: storyImagesOnly } as Field,
        {
          name: "attribution",
          type: "select",
          required: true,
          defaultValue: "anonymous",
          options: [
            { label: "Show their name", value: "named" },
            { label: "Anonymous", value: "anonymous" },
          ],
        },
        {
          name: "name",
          type: "text",
          admin: { condition: (_data: unknown, row: { attribution?: string }) => row?.attribution === "named" },
          validate: ((value: unknown, { siblingData }: { siblingData?: { attribution?: string } }) =>
            siblingData?.attribution === "named" && !(typeof value === "string" && value.trim())
              ? "Add their name, or choose Anonymous."
              : true) as never,
        } as Field,
        {
          name: "about",
          label: "About Them (optional)",
          type: "text",
          admin: { description: "For example \"Widow, Bariga\". Leave it empty unless they agreed to it." },
        },
        {
          name: "consentConfirmed",
          label: "Consent to publish confirmed",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description:
              "Tick only once they have agreed to this being published, named or anonymously as chosen above. Until then it is kept here but never shown on the website.",
          },
        },
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
    imageField("image"),
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
/* CNT-01: the block canvas is for the homepage only (and, later, the legal
   pages — CR-009 leaves them with Phase 1's approval gate). Every other page
   has a fixed layout (CNT-02), so no other page can be made here, and no page
   here gets a new web address (PUB-01). */
export const PAGE_SLUGS = ["home"];

export const Pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  hooks: refreshes(CMS_TAGS.pages),
  admin: {
    useAsTitle: "title",
    group: "Content",
    description:
      "The homepage, built from sections you can add, reorder and remove. Every other page has a fixed layout; its words are edited in its own section of the admin.",
  },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    {
      ...slug,
      validate: (value: unknown) =>
        (typeof value === "string" && PAGE_SLUGS.includes(value)) ||
        "Only the homepage (home) is built from sections. Other pages have fixed layouts.",
    } as Field,
    {
      name: "blocks",
      label: "Sections",
      labels: { singular: "Section", plural: "Sections" },
      type: "blocks",
      blocks: homepageBlocks,
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
