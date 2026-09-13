import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Volunteer With Us",
  description:
    "Give your time and skills. Discover volunteer opportunities and apply to serve with St. Hannah Foundation.",
  alternates: { canonical: "/volunteer" },
  openGraph: {
    title: "Volunteer With Us | St. Hannah Foundation",
    description:
      "Give your time and skills. Discover volunteer opportunities and apply to serve with St. Hannah Foundation.",
    url: "/volunteer",
  },
};

import PageHeader from "@/components/shared/PageHeader";

import VolunteerOpportunities from "@/components/sections/volunteer/VolunteerOpportunities";
import VolunteerBenefits from "@/components/sections/volunteer/VolunteerBenefits";
import VolunteerForm from "@/components/sections/volunteer/VolunteerForm";
import VolunteerCTA from "@/components/sections/volunteer/VolunteerCTA";

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        title="Volunteer"
        subtitle="Join a growing community of passionate individuals committed to empowering lives, supporting families and creating lasting change."
        image="/gallery/gallery2.jpeg"
      />

      <VolunteerOpportunities />

      <VolunteerBenefits />

      <VolunteerForm />

      <VolunteerCTA />
    </>
  );
}
