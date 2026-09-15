import type { CollectionConfig, Field } from "payload";

import { CMS_TAGS } from "../../lib/cms-tags";
import {
  contentAccess,
  imageField,
  imageFields,
  list,
  NOT_ON_WEBSITE,
  paragraphs,
  refreshes,
  versions,
} from "./content";

/* CR-008: the rest of the website's content, which section 5 of the
   specification had no home for. Each mirrors its source file field for
   field, so the migration is a mapping and the pages render unchanged. */

const order: Field = { name: "order", type: "number" };

/** A titled entry with a description — the shape several lists share. */
const titledEntry = (
  slug: string,
  singular: string,
  plural: string,
  tag: string,
): CollectionConfig => ({
  slug,
  labels: { singular, plural },
  hooks: refreshes(tag),
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "order", "_status"] },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    order,
  ],
});

export const VolunteerOpportunities = titledEntry(
  "volunteer-opportunities",
  "Volunteer Opportunity",
  "Volunteer Opportunities",
  CMS_TAGS.volunteerOpportunities,
);

export const VolunteerBenefits = titledEntry(
  "volunteer-benefits",
  "Volunteer Benefit",
  "Volunteer Benefits",
  CMS_TAGS.volunteerBenefits,
);

const inKind = titledEntry(
  "in-kind-categories",
  "In-kind Category",
  "In-kind Categories",
  CMS_TAGS.inKindCategories,
);

export const InKindCategories: CollectionConfig = {
  ...inKind,
  admin: { ...inKind.admin, description: NOT_ON_WEBSITE },
};

export const VolunteerProfiles: CollectionConfig = {
  slug: "volunteer-profiles",
  labels: { singular: "Volunteer Profile", plural: "Volunteer Profiles" },
  hooks: refreshes(CMS_TAGS.volunteers),
  admin: { useAsTitle: "name", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "role", type: "text" },
    imageField("image"),
    order,
  ],
};

/* The gallery as the site shows it: a list of photographs, each in a
   category the page filters by. Replaces the specification's album model,
   which the site has never had. */
export const GalleryPhotos: CollectionConfig = {
  slug: "gallery-photos",
  labels: { singular: "Photograph", plural: "Gallery" },
  hooks: refreshes(CMS_TAGS.gallery),
  admin: { useAsTitle: "title", group: "Content", defaultColumns: ["title", "category", "order"] },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "category", type: "text", required: true },
    imageField("image"),
    order,
  ],
};

export const FeaturedEvents: CollectionConfig = {
  slug: "featured-events",
  labels: { singular: "Featured Event", plural: "Featured Events" },
  hooks: refreshes(CMS_TAGS.events),
  admin: { useAsTitle: "title", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "description", type: "textarea" },
    { name: "category", type: "text" },
    imageField("image"),
    { name: "link", type: "text" },
    order,
  ],
};

export const VideoHighlights: CollectionConfig = {
  slug: "video-highlights",
  labels: { singular: "Video Highlight", plural: "Video Highlights" },
  hooks: refreshes(CMS_TAGS.videos),
  admin: { useAsTitle: "title", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    { name: "category", type: "text" },
    { name: "description", type: "textarea" },
    imageField("thumbnail"),
    { name: "link", type: "text" },
    order,
  ],
};

/* A featured beneficiary campaign as the donate page tells it. Separate from
   the fundraising Campaigns collection, which is Finance's and holds targets
   and totals, not the story. */
export const CampaignStories: CollectionConfig = {
  slug: "campaign-stories",
  labels: { singular: "Campaign Story", plural: "Campaign Stories" },
  hooks: refreshes(CMS_TAGS.campaigns),
  admin: { useAsTitle: "name", group: "Content" },
  access: contentAccess,
  versions,
  fields: [
    { name: "name", type: "text", required: true },
    { name: "age", type: "number" },
    { name: "tagline", type: "text" },
    { name: "headline", type: "text" },
    imageField("heroImage"),
    imageFields("gallery"),
    paragraphs("description"),
    { name: "whyStoryMattersTitle", type: "text" },
    { name: "whyStoryMatters", type: "textarea" },
    list("needs"),
    { name: "videoLink", type: "text" },
    { name: "featured", type: "checkbox" },
    order,
  ],
};

/* CR-013: a fundraising event, shown on the homepage with an Event Appeal
   section. The section counts down to the date, says "Happening today" on
   the day, and turns into a thank-you with the recap afterwards. */
const onlyImages = { mimeType: { contains: "image" } };
const onlyVideos = { mimeType: { contains: "video" } };

export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Event", plural: "Events" },
  hooks: refreshes(CMS_TAGS.appeals),
  admin: {
    useAsTitle: "title",
    group: "Content",
    defaultColumns: ["title", "date", "_status"],
    description: "Fundraising events. Show one on the homepage by adding an Event Appeal section.",
  },
  access: contentAccess,
  versions,
  fields: [
    { name: "title", type: "text", required: true },
    {
      name: "date",
      label: "Event Date",
      type: "date",
      required: true,
      admin: { date: { pickerAppearance: "dayOnly", displayFormat: "d MMMM yyyy" } },
    },
    {
      name: "time",
      label: "Time",
      type: "text",
      admin: { description: "For example 10:00 am. Leave empty until it is confirmed." },
    },
    { name: "venue", type: "text", required: true },
    {
      name: "summary",
      label: "Why It Matters",
      type: "textarea",
      required: true,
      admin: { description: "Two or three sentences, in the Foundation's own words." },
    },
    {
      ...imageField("poster"),
      label: "Picture",
      required: true,
      filterOptions: onlyImages,
      admin: {
        description: "Shown before the video plays, and to visitors whose phones are set to reduce motion.",
      },
    } as Field,
    {
      ...imageField("loop"),
      label: "Short Silent Video",
      filterOptions: onlyVideos,
      admin: { description: "Optional: 10 to 20 seconds, no sound, played on a loop in the section." },
    } as Field,
    {
      ...imageField("film"),
      label: "Full Video",
      filterOptions: onlyVideos,
      admin: { description: "Optional: opens in the section when the video button is pressed." },
    } as Field,
    {
      name: "mediaCaption",
      label: "Picture Caption",
      type: "text",
      admin: {
        description:
          "Say when the picture or video is from, e.g. \"Widows Program 2025\", so last year's footage is never taken for this year's event.",
      },
    },
    {
      name: "filmLabel",
      label: "Video Button",
      type: "text",
      defaultValue: "Watch last year's programme",
    },
    {
      ...imageField("flyer"),
      label: "Flyer",
      filterOptions: onlyImages,
      admin: { description: "Optional: offered as a download and for sharing." },
    } as Field,
    {
      name: "recap",
      label: "After the Event",
      type: "group",
      admin: { description: "Shown in place of the appeal once the date has passed." },
      fields: [
        { name: "thankYou", label: "Thank-You Message", type: "textarea" },
        { ...imageFields("photos"), label: "Photographs", filterOptions: onlyImages } as Field,
      ],
    },
  ],
};

export const siteContentCollections = [
  GalleryPhotos,
  VolunteerProfiles,
  VolunteerOpportunities,
  VolunteerBenefits,
  InKindCategories,
  FeaturedEvents,
  VideoHighlights,
  CampaignStories,
  Events,
];
