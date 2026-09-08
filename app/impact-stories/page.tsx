import PageHeader from "@/components/shared/PageHeader";
import ImpactNumbers from "@/components/sections/impact/ImpactNumbers";
import ImpactFeaturedStory from "@/components/sections/impact/ImpactFeaturedStory";
import ImpactStoryIndex from "@/components/sections/impact/ImpactStoryIndex";
import ImpactCTA from "@/components/sections/impact/ImpactCTA";

export default function ImpactStoriesPage() {
  return (
    <>
      <PageHeader
        title="Impact Stories"
        subtitle="Stories of hope, resilience and transformation from the communities we serve."
      />

      <ImpactNumbers />

      <ImpactFeaturedStory />

      <ImpactStoryIndex />

      <ImpactCTA />
    </>
  );
}
