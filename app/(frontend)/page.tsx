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

import { getCampaigns, getHeroSlides, getProgrammes } from "@/lib/cms";

export default async function HomePage() {
  // The three sections that are interactive, and so run in the browser, get
  // their content from here; the rest read it themselves.
  const [slides, programmes, campaigns] = await Promise.all([
    getHeroSlides(),
    getProgrammes(),
    getCampaigns(),
  ]);

  return (
    <>
      <Hero slides={slides} />
      <VisionMission />
      <Causes programs={programmes} />
      <GalleryPreview />
      <ImpactStats />
      <FeaturedCampaign stories={campaigns} />
      <ImpactStories />
      <AboutTestimonials />
      <LeadershipPreview />
      <HomeCTA />
    </>
  );
}
