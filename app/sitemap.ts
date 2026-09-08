import type { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

import programs from "@/public/data/programs.json";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sthannahfoundation.org";

function getStorySlugs() {
  const storiesDir = path.join(
    process.cwd(),
    "public",
    "data",
    "impact-stories",
  );

  return fs
    .readdirSync(storiesDir)
    .filter((file) => file.endsWith(".json") && file !== "stories.json")
    .map((file) => file.replace(".json", ""));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = (
    [
    { url: `${siteUrl}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${siteUrl}/programs`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${siteUrl}/impact-stories`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    { url: `${siteUrl}/gallery`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${siteUrl}/team`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/volunteer`, changeFrequency: "monthly", priority: 0.7 },
    {
      url: `${siteUrl}/partnerships`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    { url: `${siteUrl}/donate`, changeFrequency: "monthly", priority: 0.9 },
    {
      url: `${siteUrl}/apply-for-support`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.6 },
    ] as MetadataRoute.Sitemap
  ).map((route) => ({ ...route, lastModified }));

  const programRoutes: MetadataRoute.Sitemap = programs.map((program) => ({
    url: `${siteUrl}/programs/${program.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const storyRoutes: MetadataRoute.Sitemap = getStorySlugs().map((slug) => ({
    url: `${siteUrl}/impact-stories/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...programRoutes, ...storyRoutes];
}
