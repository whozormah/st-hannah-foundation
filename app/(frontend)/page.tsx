import Hero from "@/components/sections/Hero";
import VisionMission from "@/components/sections/VisionMission";
import AboutTestimonials from "@/components/sections/about/AboutTestimonials";
import ImpactStats from "@/components/sections/ImpactStats";
import FeaturedCampaign from "@/components/sections/FeaturedCampaign";
import Causes from "@/components/sections/Causes";
import ImpactStories from "@/components/sections/ImpactStories";
import GalleryPreview from "@/components/sections/GalleryPreview";
import LeadershipPreview from "@/components/sections/LeadershipPreview";
import HomeCTA from "@/components/sections/HomeCTA";

/* Rendered on request, because it shows CMS content (CR-007). The content
   itself is cached and refreshed on publish (lib/cms.ts), so this stays
   cheap; a static build would bake in whatever the build machine's database
   held, and production images are built in CI, away from the live one. */
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <Hero />
      <VisionMission />
      <Causes />
      <GalleryPreview />
      <ImpactStats />
      <FeaturedCampaign />
      <ImpactStories />
      <AboutTestimonials />
      <LeadershipPreview />
      <HomeCTA />
    </>
  );
}
