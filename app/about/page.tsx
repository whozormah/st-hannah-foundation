import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about St. Hannah Foundation, our mission, vision, governance and the people restoring hope and empowering communities across Nigeria.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Us | St. Hannah Foundation",
    description:
      "Learn about St. Hannah Foundation, our mission, vision, governance and the people restoring hope and empowering communities across Nigeria.",
    url: "/about",
  },
};

import PageHeader from "@/components/shared/PageHeader";

import AboutMission from "@/components/sections/about/AboutMission";
import AboutFounder from "@/components/sections/about/AboutFounder";
import AboutImpact from "@/components/sections/about/AboutImpact";
import AboutImpactAreas from "@/components/sections/about/AboutImpactAreas";

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




      <AboutPresence />

      <AboutCTA />
    </>
  );
}
