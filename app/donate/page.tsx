import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support our work with a secure online donation, in-kind gifts of items and materials, or a sponsorship commitment.",
  alternates: { canonical: "/donate" },
  openGraph: {
    title: "Donate | St. Hannah Foundation",
    description:
      "Support our work with a secure online donation, in-kind gifts of items and materials, or a sponsorship commitment.",
    url: "/donate",
  },
};

import PageHeader from "@/components/shared/PageHeader";

import DonationImpact from "@/components/sections/donate/DonationImpact";
import DonationForm from "@/components/sections/donate/DonationForm";

import DonateCTA from "@/components/sections/donate/DonateCTA";
import Sponsorship from "@/components/sections/donate/Sponsorship";
import InKindDonations from "@/components/sections/donate/InKindDonations";

export default function DonatePage() {
  return (
    <>
      <PageHeader
        title="Donate"
        subtitle="Your support helps us empower lives, strengthen families and create sustainable impact in communities."
      />

      <DonationImpact />

      <DonationForm />

      <Sponsorship />

      <InKindDonations />

      <DonateCTA />
    </>
  );
}
