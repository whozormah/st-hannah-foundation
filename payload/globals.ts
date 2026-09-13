import type { Field, GlobalAfterChangeHook, GlobalConfig } from "payload";

import { allow } from "./access";
import { CMS_TAGS } from "../lib/cms-tags";
import { imagePath, list, NOT_ON_WEBSITE, paragraphs } from "./collections/content";
import { refresh } from "./revalidate";

/* Section 8.2, "Navigation, settings": Owner full, Administrator read and
   update, nobody else. Globals have no create or delete. */
const settingsAccess = {
  read: allow("owner", "administrator"),
  update: allow("owner", "administrator"),
};

/* Page content is content, not settings: the Content Manager edits it, as
   they edit programmes and stories (section 8.2, "Content, media, SEO"). */
const pageContentAccess = {
  read: allow("owner", "administrator", "content"),
  update: allow("owner", "administrator", "content"),
};

/* Publishing a global refreshes the website (PUB-04), as collections do. */
const refreshesGlobal = (tag: string): { afterChange: GlobalAfterChangeHook[] } => ({
  afterChange: [
    ({ doc, context }) => {
      refresh(tag, context);
      return doc;
    },
  ],
});

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: { group: "Administration" },
  access: settingsAccess,
  hooks: refreshesGlobal(CMS_TAGS.siteSettings),
  fields: [
    { name: "foundationName", type: "text", required: true },
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    { name: "nigeriaAddress", type: "textarea" },
    { name: "usaAddress", type: "textarea" },
    {
      name: "bank",
      type: "group",
      fields: [
        { name: "bankName", type: "text" },
        { name: "accountNumber", type: "text" },
        { name: "accountName", type: "text" },
      ],
    },
    {
      name: "socials",
      type: "group",
      fields: [
        { name: "facebook", type: "text" },
        { name: "instagram", type: "text" },
        { name: "youtube", type: "text" },
        { name: "linkedin", type: "text" },
        { name: "tiktok", type: "text" },
      ],
    },
  ],
};

/* CNT-03: labels and targets are content; the structure and its depth are
   code, so the navigation cannot be restructured from the admin. */
export const Navigation: GlobalConfig = {
  slug: "navigation",
  label: "Navigation",
  admin: { group: "Content" },
  access: settingsAccess,
  fields: [
    {
      name: "header",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
    {
      name: "footer",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "href", type: "text", required: true },
      ],
    },
  ],
};

/* The Foundation's introduction, vision and mission, and the founder's
   message — as the homepage and About page show them. */
export const Foundation: GlobalConfig = {
  slug: "foundation",
  label: "About the Foundation",
  admin: { group: "Content" },
  access: pageContentAccess,
  hooks: refreshesGlobal(CMS_TAGS.foundation),
  fields: [
    { name: "badge", type: "text" },
    { name: "title", type: "text" },
    { name: "description", type: "textarea" },
    { name: "vision", type: "textarea" },
    { name: "mission", type: "textarea" },
    {
      name: "founder",
      type: "group",
      fields: [
        { name: "badge", type: "text" },
        { name: "title", type: "text" },
        { name: "name", type: "text" },
        { name: "position", type: "text" },
        { name: "organization", type: "text" },
        imagePath("image"),
        { name: "quote", type: "textarea" },
        paragraphs("message"),
      ],
    },
  ],
};

/* The homepage's hero slides. CNT-01's block canvas for the homepage is a
   later Phase 6 step; until then the page's composition stays in code and
   its words live here. */
export const Homepage: GlobalConfig = {
  slug: "homepage",
  label: "Homepage",
  admin: { group: "Content" },
  access: pageContentAccess,
  hooks: refreshesGlobal(CMS_TAGS.homepage),
  fields: [
    {
      name: "heroSlides",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
        imagePath("image"),
        { name: "buttonText", type: "text" },
        { name: "buttonLink", type: "text" },
      ],
    },
  ],
};

export const ApplyPage: GlobalConfig = {
  slug: "apply-page",
  label: "Apply for Support Page",
  admin: { group: "Content" },
  access: pageContentAccess,
  hooks: refreshesGlobal(CMS_TAGS.applyPage),
  fields: [
    { name: "title", type: "text" },
    { name: "intro", type: "textarea" },
    list("importantNotes"),
    list("requiredInformation"),
  ],
};

export const DonatePage: GlobalConfig = {
  slug: "donate-page",
  label: "Donate Page",
  admin: { group: "Content", description: NOT_ON_WEBSITE },
  access: pageContentAccess,
  hooks: refreshesGlobal(CMS_TAGS.donatePage),
  fields: [
    {
      name: "stats",
      type: "array",
      fields: [
        { name: "number", type: "text", required: true },
        { name: "label", type: "text", required: true },
      ],
    },
    {
      name: "causes",
      type: "array",
      fields: [
        { name: "title", type: "text", required: true },
        { name: "description", type: "textarea" },
      ],
    },
  ],
};

export const SeoDefaults: GlobalConfig = {
  slug: "seo-defaults",
  label: "SEO Defaults",
  admin: { group: "Content" },
  access: pageContentAccess,
  fields: [
    { name: "titleTemplate", type: "text" },
    { name: "description", type: "textarea" },
    { name: "openGraphImage", type: "relationship", relationTo: "media" },
  ],
};

/* CNT-09 and CNT-10, as amended by CR-010. The Foundation's totals come
   from years of work before this system, so none can yet be counted from its
   records; they are typed in here, each once, with its source and the date
   it was verified. A page that shows a figure reads it from here, so no two
   pages can disagree — the drift section 5.4 describes.

   Their source is known — they were on the website before the CMS — but
   nobody has verified them yet, so "verified on" stays empty rather than
   claiming a check that never happened (MIG-07). */
const figure = (name: string, shownOn: string): Field => ({
  name,
  type: "group",
  admin: { description: `Shown on: ${shownOn}.` },
  fields: [
    { name: "value", type: "text", required: true },
    { name: "source", type: "textarea" },
    { name: "verifiedAt", type: "date" },
  ],
});

export const StatisticsManual: GlobalConfig = {
  slug: "statistics-manual",
  label: "Statistics",
  admin: { group: "Content" },
  access: pageContentAccess,
  hooks: refreshesGlobal(CMS_TAGS.statistics),
  fields: [
    figure("childrenReached", "the homepage and Impact Stories"),
    figure("widowsSupported", "the homepage, Impact Stories and Partnerships"),
    figure("educationalBeneficiaries", "the homepage"),
    figure("communitiesReached", "the homepage"),
    figure("livesReached", "Programmes, About and Impact Stories"),
    figure("outreachEvents", "Programmes, About and Impact Stories"),
    figure("yearsOfService", "Programmes and About"),
    figure("countriesRepresented", "Programmes and About"),
    figure("familiesReached", "Partnerships"),
    figure("studentsSponsored", "Partnerships"),
  ],
};

export const globals = [
  SiteSettings,
  Navigation,
  Foundation,
  Homepage,
  ApplyPage,
  DonatePage,
  SeoDefaults,
  StatisticsManual,
];
