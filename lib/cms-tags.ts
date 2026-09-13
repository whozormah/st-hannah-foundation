/* Cache tags shared by the website's CMS reads (lib/cms.ts) and the
   collections that invalidate them on publish. Kept free of imports: the
   collections are loaded by the Payload config, which lib/cms.ts itself
   loads, so importing from there would be circular. */
export const CMS_TAGS = {
  testimonials: "cms:testimonials",
} as const;
