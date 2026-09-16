import type { Block, Field, TextFieldSingleValidation } from "payload";
import {
  BlockquoteFeature,
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  lexicalEditor,
  OrderedListFeature,
  ParagraphFeature,
  UnorderedListFeature,
} from "@payloadcms/richtext-lexical";

import { imageField } from "./fields";
import { isPlayableVideo, isSafeLink } from "../lib/links";
import { SECTION_COPY, type SectionCopy } from "../lib/section-copy";

/* The homepage block library: CNT-03's twelve, plus vision and mission and
   the leadership preview (CR-009).

   CNT-04: no block takes HTML, inline styles or CSS classes. Every field is
   plain text, a choice from a list, or rich text limited to headings,
   emphasis, lists, quotations and checked links. How a block looks is code;
   editors choose which blocks, in what order, and what they say. */

const SAFE_LINK_MESSAGE =
  "Use a page on this site (starting with /) or a full address starting with https://, mailto: or tel:.";

const safeLink: TextFieldSingleValidation = (value) =>
  !value || isSafeLink(value) || SAFE_LINK_MESSAGE;

const link = (name: string, label: string): Field => ({
  name,
  label,
  type: "text",
  validate: safeLink,
});

/* The heading wording a section carries, pre-filled with the site's own. */
const copy = (defaults: SectionCopy, { multiline = false } = {}): Field[] => [
  ...(defaults.eyebrow !== undefined
    ? [
        {
          name: "eyebrow",
          label: "Small Heading",
          type: "text",
          defaultValue: defaults.eyebrow,
          admin: { description: "The short line above the heading. Leave empty for none." },
        } satisfies Field,
      ]
    : []),
  ...(defaults.title !== undefined
    ? [
        {
          name: "title",
          label: "Heading",
          type: multiline ? "textarea" : "text",
          required: true,
          defaultValue: defaults.title,
          ...(multiline
            ? { admin: { description: "Start a new line where the heading should break." } }
            : {}),
        } as Field,
      ]
    : []),
  ...(defaults.description !== undefined
    ? [
        {
          name: "description",
          label: "Introduction",
          type: "textarea",
          defaultValue: defaults.description,
          admin: { description: "Leave empty for none." },
        } satisfies Field,
      ]
    : []),
];

/* `about` says what the block shows; the block's name is what editors see.
   Each block's type is named "…Block": several blocks share a name with a
   collection (Testimonials), and GraphQL refuses two types of one name. */
const block = (slug: string, singular: string, about: string, fields: Field[]): Block => ({
  slug,
  interfaceName: `${slug[0].toUpperCase()}${slug.slice(1)}Block`,
  labels: { singular, plural: singular },
  admin: { custom: { about } },
  fields,
});

export const homepageBlocks: Block[] = [
  block("hero", "Hero", "The large rotating banner at the top.", [
    {
      name: "slides",
      type: "array",
      minRows: 1,
      required: true,
      fields: [
        {
          name: "eyebrow",
          label: "Small Label",
          type: "text",
          admin: {
            description:
              "The small label above the heading. Leave it empty for the usual \"Serving Widows, Children & Families\".",
          },
        },
        { name: "title", label: "Heading", type: "text", required: true },
        { name: "description", label: "Text", type: "textarea" },
        imageField("image"),
        { name: "buttonText", label: "Button Label", type: "text" },
        link("buttonLink", "Button Link"),
      ],
    },
  ]),
  block(
    "visionMission",
    "Vision and Mission",
    "The Foundation's introduction, vision and mission, from About the Foundation.",
    [],
  ),
  block(
    "programmeCards",
    "Programme Cards",
    "The first four programmes, in their display order.",
    copy(SECTION_COPY.programmeCards),
  ),
  block(
    "galleryStrip",
    "Gallery Strip",
    "One tile per gallery area, from the Gallery.",
    copy(SECTION_COPY.galleryStrip),
  ),
  block(
    "statistics",
    "Statistics Row",
    "The homepage's four figures, from Statistics.",
    copy(SECTION_COPY.statistics),
  ),
  block(
    "donationCallToAction",
    "Donation Call to Action",
    "The featured campaign stories, with a donate button.",
    copy(SECTION_COPY.donationCallToAction),
  ),
  block(
    "storyCards",
    "Story Cards",
    "The first three impact stories.",
    copy(SECTION_COPY.storyCards),
  ),
  block(
    "testimonials",
    "Testimonials",
    "The published testimonials.",
    copy(SECTION_COPY.testimonials),
  ),
  block(
    "leadershipPreview",
    "Leadership Preview",
    "The first three leaders, with a link to the whole team.",
    copy(SECTION_COPY.leadershipPreview),
  ),
  block(
    "callToAction",
    "Call to Action",
    "The closing invitation to give, volunteer or partner.",
    copy(SECTION_COPY.callToAction, { multiline: true }),
  ),
  block(
    "eventAppeal",
    "Event Appeal",
    "A fundraising event beside a donation appeal (CR-013).",
    [
      {
        name: "event",
        type: "relationship",
        relationTo: "events",
        required: true,
        admin: { description: "The event to show. Its words, pictures and video are edited in Events." },
      },
    ],
  ),
  block("richText", "Rich Text", "Formatted text: headings, lists, quotations and links.", [
    {
      name: "content",
      label: "Text",
      type: "richText",
      required: true,
      editor: lexicalEditor({
        features: () => [
          ParagraphFeature(),
          HeadingFeature({ enabledHeadingSizes: ["h2", "h3"] }),
          BoldFeature(),
          ItalicFeature(),
          UnorderedListFeature(),
          OrderedListFeature(),
          BlockquoteFeature(),
          LinkFeature({
            enabledCollections: [],
            fields: ({ defaultFields }) =>
              defaultFields.map((field) =>
                field.name === "url" ? ({ ...field, validate: safeLink } as typeof field) : field,
              ),
          }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ],
      }),
    },
  ]),
  block("imageText", "Image and Text", "A photograph beside a heading and text.", [
    { name: "eyebrow", label: "Small Heading", type: "text" },
    { name: "title", label: "Heading", type: "text", required: true },
    { name: "text", label: "Text", type: "textarea", required: true },
    // Its description comes with it from the media library (CNT-06).
    { ...imageField("image"), required: true } as Field,
    {
      name: "imagePosition",
      label: "Image Side",
      type: "select",
      defaultValue: "left",
      options: [
        { label: "Left", value: "left" },
        { label: "Right", value: "right" },
      ],
    },
    { name: "buttonLabel", label: "Button Label", type: "text" },
    link("buttonLink", "Button Link"),
  ]),
  block("quote", "Quote", "A quotation, in the style the impact stories use.", [
    {
      name: "text",
      label: "Quotation",
      type: "textarea",
      required: true,
      admin: {
        description:
          "Words someone actually said, with their permission (CNT-11). Never write a quotation for someone.",
      },
    },
    { name: "author", label: "Who Said It", type: "text" },
  ]),
  block(
    "video",
    "Video",
    "A video on YouTube or Vimeo, shown as a picture that opens it. Not embedded, so visitors are not tracked by the video site until they choose to watch.",
    [
      { name: "title", label: "Heading", type: "text", required: true },
      { name: "description", label: "Text", type: "textarea" },
      { ...imageField("thumbnail"), required: true } as Field,
      {
        name: "link",
        label: "Video Link",
        type: "text",
        required: true,
        validate: (value: string | null | undefined) =>
          (!!value && isSafeLink(value) && isPlayableVideo(value)) ||
          "Use the address of the video itself, e.g. https://www.youtube.com/watch?v=…",
      },
    ],
  ),
];
