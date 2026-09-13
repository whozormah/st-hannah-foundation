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
