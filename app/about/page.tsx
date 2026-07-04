import PageHeader from "@/components/shared/PageHeader";

import LeadershipPreview from "@/components/sections/LeadershipPreview";
import AboutMission from "@/components/sections/about/AboutMission";
import AboutFounder from "@/components/sections/about/AboutFounder";
import AboutImpact from "@/components/sections/about/AboutImpact";
import AboutImpactAreas from "@/components/sections/about/AboutImpactAreas";
import AboutLeadership from "@/components/sections/about/AboutLeadership";
import AboutTestimonials from "@/components/sections/about/AboutTestimonials";
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

      <LeadershipPreview
        eyebrow="Our Leadership"
        title="Meet The Team Leading Our Mission"
        description="Our leadership team provides strategic direction, stewardship and accountability, ensuring every programme reflects our commitment to serving communities with excellence."
        showButton={false}
      />

      <AboutTestimonials />

      <AboutVolunteers />

      <AboutPresence />

      <AboutCTA />
    </>
  );
}
