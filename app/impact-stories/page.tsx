"use client";

import PageHeader from "@/components/shared/PageHeader";
import ImpactFeaturedStory from "@/components/sections/impact/ImpactFeaturedStory";
import FeaturedStoriesGrid from "@/components/sections/impact/FeaturedStoriesGrid";
import ImpactArchive from "@/components/sections/impact/ImpactArchive";
import ImpactCTA from "@/components/sections/impact/ImpactCTA";

export default function ImpactStoriesPage() {
  return (
    <>
      <PageHeader
        title="Impact Stories"
        subtitle="Discover inspiring stories of hope, resilience and transformation made possible through the work of St. Hannah Foundation and the generosity of our partners, volunteers and supporters."
      />

      <ImpactFeaturedStory />

      <FeaturedStoriesGrid />

      <ImpactArchive />

      <ImpactCTA />
    </>
  );
}
