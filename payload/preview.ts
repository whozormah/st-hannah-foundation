import type { CollectionConfig } from "payload";

/* The page each kind of content appears on, for the admin's Preview button
   (CNT-05). Content shown on no page (FAQs, in-kind categories), the media
   library, and page sections without drafts (globals) have none. */
const PAGE_FOR: Record<string, (doc: Record<string, unknown>) => string | null> = {
  pages: () => "/",
  programmes: (doc) => (doc.slug ? `/programs/${doc.slug}` : null),
  "impact-stories": (doc) => (doc.slug ? `/impact-stories/${doc.slug}` : null),
  testimonials: () => "/",
  "campaign-stories": () => "/",
  leadership: () => "/team",
  "volunteer-profiles": () => "/team",
  "gallery-photos": () => "/gallery",
  "featured-events": () => "/gallery",
  "video-highlights": () => "/gallery",
  "volunteer-opportunities": () => "/volunteer",
  "volunteer-benefits": () => "/volunteer",
  // An event appears in the homepage's Event Appeal section (CR-013).
  events: () => "/",
};

export const PREVIEWABLE = Object.keys(PAGE_FOR);

export const addPreview = (collection: CollectionConfig): CollectionConfig => {
  const pageFor = PAGE_FOR[collection.slug];

  if (!pageFor) return collection;

  return {
    ...collection,
    admin: {
      ...collection.admin,
      preview: (doc) => {
        const path = pageFor(doc);

        return path ? `/api/draft-preview?path=${encodeURIComponent(path)}` : null;
      },
    },
  };
};
