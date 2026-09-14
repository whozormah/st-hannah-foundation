/* Cache tags shared by the website's CMS reads (lib/cms.ts) and the
   collections and globals that invalidate them on publish. Kept free of
   imports: the collections are loaded by the Payload config, which
   lib/cms.ts itself loads, so importing from there would be circular. */
export const CMS_TAGS = {
  testimonials: "cms:testimonials",
  programmes: "cms:programmes",
  stories: "cms:stories",
  leadership: "cms:leadership",
  volunteers: "cms:volunteers",
  gallery: "cms:gallery",
  events: "cms:events",
  videos: "cms:videos",
  volunteerOpportunities: "cms:volunteer-opportunities",
  volunteerBenefits: "cms:volunteer-benefits",
  inKindCategories: "cms:in-kind-categories",
  campaigns: "cms:campaign-stories",
  siteSettings: "cms:site-settings",
  foundation: "cms:foundation",
  pages: "cms:pages",
  applyPage: "cms:apply-page",
  donatePage: "cms:donate-page",
  statistics: "cms:statistics",
} as const;
