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
      />

      <PartnershipBenefits />

      <PartnershipTypes />

      <PartnershipImpact />

      <PartnershipCTA />
    </>
  );
}
