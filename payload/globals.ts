import type { GlobalConfig } from "payload";

import { allow } from "./access";

/* Section 8.2, "Navigation, settings": Owner full, Administrator read and
   update, nobody else. Globals have no create or delete. */
const settingsAccess = {
  read: allow("owner", "administrator"),
  update: allow("owner", "administrator"),
};

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  admin: { group: "Administration" },
  access: settingsAccess,
  fields: [
    { name: "foundationName", type: "text", required: true },
    { name: "email", type: "email" },
    { name: "phone", type: "text" },
    { name: "nigeriaAddress", type: "textarea" },
    { name: "usaAddress", type: "textarea" },
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

export const Foundation: GlobalConfig = {
  slug: "foundation",
  label: "About the Foundation",
  admin: { group: "Content" },
  access: settingsAccess,
  fields: [
    { name: "vision", type: "textarea" },
    { name: "mission", type: "textarea" },
    { name: "founderStory", type: "richText" },
    { name: "history", type: "richText" },
  ],
};

export const SeoDefaults: GlobalConfig = {
  slug: "seo-defaults",
  label: "SEO Defaults",
  admin: { group: "Content" },
  access: settingsAccess,
  fields: [
    { name: "titleTemplate", type: "text" },
    { name: "description", type: "textarea" },
    { name: "openGraphImage", type: "relationship", relationTo: "media" },
  ],
};

/* CNT-09 and CNT-10: anything derivable is derived. Only genuinely
   unmeasurable figures live here, each with its source and the date it was
   verified, in exactly one place. */
export const StatisticsManual: GlobalConfig = {
  slug: "statistics-manual",
  label: "Manual Statistics",
  admin: { group: "Content" },
  access: settingsAccess,
  fields: [
    {
      name: "figures",
      type: "array",
      fields: [
        { name: "label", type: "text", required: true },
        { name: "value", type: "text", required: true },
        { name: "source", type: "text", required: true },
        { name: "verifiedAt", type: "date", required: true },
      ],
    },
  ],
};

export const globals = [
  SiteSettings,
  Navigation,
  Foundation,
  SeoDefaults,
  StatisticsManual,
];
