import type { MetadataRoute } from "next";
import legal from "@/public/data/legal.json";

import { getProgrammes, getStories } from "@/lib/cms";

// Lists what is published now, so a new story is advertised without a
// deployment (CR-007).
export const dynamic = "force-dynamic";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sthannahfoundation.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const [programs, stories] = await Promise.all([getProgrammes(), getStories()]);

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

  const storyRoutes: MetadataRoute.Sitemap = stories.map(({ slug }) => ({
    url: `${siteUrl}/impact-stories/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Draft legal documents are reachable for review but not advertised.
  const legalRoutes: MetadataRoute.Sitemap =
    legal.status === "approved"
      ? ["/privacy", "/terms"].map((route) => ({
          url: `${siteUrl}${route}`,
          lastModified,
          changeFrequency: "yearly",
          priority: 0.3,
        }))
      : [];

  return [...staticRoutes, ...programRoutes, ...storyRoutes, ...legalRoutes];
}
