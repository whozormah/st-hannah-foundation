import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Partnerships",
  description:
    "Partner with St. Hannah Foundation. Corporate, institutional and community partnerships that scale impact across Nigeria.",
  alternates: { canonical: "/partnerships" },
  openGraph: {
    title: "Partnerships | St. Hannah Foundation",
    description:
      "Partner with St. Hannah Foundation. Corporate, institutional and community partnerships that scale impact across Nigeria.",
    url: "/partnerships",
  },
};

import PageHeader from "@/components/shared/PageHeader";
import PartnershipBenefits from "@/components/sections/partnerships/PartnershipBenefits";
import PartnershipTypes from "@/components/sections/partnerships/PartnershipTypes";
import PartnershipImpact from "@/components/sections/partnerships/PartnershipImpact";
import PartnershipCTA from "@/components/sections/partnerships/PartnershipCTA";

export default function PartnershipsPage() {
  return (
    <>
      <PageHeader
        title="Become A Partner"
        subtitle="Partner with St. Hannah Foundation to create lasting impact through education support, widow empowerment, family assistance, community outreach and sustainable development initiatives."
        image="/causes/business.png"
      />

      <PartnershipBenefits />

      <PartnershipTypes />

      <PartnershipImpact />

      <PartnershipCTA />
    </>
  );
}
