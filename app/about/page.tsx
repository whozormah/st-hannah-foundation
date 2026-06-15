import PageHeader from "@/components/shared/PageHeader";
import AboutMission from "@/components/sections/about/AboutMission";
import AboutImpactAreas from "@/components/sections/about/AboutImpactAreas";
import AboutImpact from "@/components/sections/about/AboutImpact";
import AboutFounder from "@/components/sections/about/AboutFounder";
import AboutTestimonials from "@/components/sections/about/AboutTestimonials";
import AboutGovernance from "@/components/sections/about/AboutGovernance";
import AboutVolunteers from "@/components/sections/about/AboutVolunteers";
import AboutPresence from "@/components/sections/about/AboutPresence";
import AboutCTA from "@/components/sections/about/AboutCTA";

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="About Us"
        subtitle="Learn more about our story, mission, leadership and commitment to restoring hope, empowering families and transforming communities."
      />

      <AboutMission />
      <AboutFounder />
      <AboutImpactAreas />
      <AboutImpact />
      <AboutTestimonials />
      <AboutGovernance />
      <AboutVolunteers />
      <AboutCTA />
    </>
  );
}
