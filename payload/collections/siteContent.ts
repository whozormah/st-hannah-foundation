import type { CollectionConfig, Field } from "payload";

import { CMS_TAGS } from "../../lib/cms-tags";
import {
  contentAccess,
  imagePath,
  imagePaths,
  list,
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

export const InKindCategories = titledEntry(
  "in-kind-categories",
  "In-kind Category",
  "In-kind Categories",
  CMS_TAGS.inKindCategories,
);

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
    imagePath("image"),
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
    imagePath("image"),
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
    imagePath("image"),
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
    imagePath("thumbnail"),
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
    imagePath("heroImage"),
    imagePaths("gallery"),
    paragraphs("description"),
    { name: "whyStoryMattersTitle", type: "text" },
    { name: "whyStoryMatters", type: "textarea" },
    list("needs"),
    { name: "videoLink", type: "text" },
    { name: "featured", type: "checkbox" },
    order,
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
];
