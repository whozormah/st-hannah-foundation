import type { Metadata } from "next";

import PageHeader from "@/components/shared/PageHeader";
import DonationForm from "@/components/sections/donate/DonationForm";
import DonationImpact from "@/components/sections/donate/DonationImpact";
import Sponsorship from "@/components/sections/donate/Sponsorship";
import InKindDonations from "@/components/sections/donate/InKindDonations";
import DonateCTA from "@/components/sections/donate/DonateCTA";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give securely in Nigerian Naira through Paystack, donate items and materials, or sponsor a programme. Giving in USD, GBP and EUR is coming soon.",
  alternates: { canonical: "/donate" },
  openGraph: {
    title: "Donate | St. Hannah Foundation",
    description:
      "Give securely in Nigerian Naira through Paystack, donate items and materials, or sponsor a programme.",
    url: "/donate",
  },
};

export default function DonatePage() {
  return (
    <>
      <PageHeader
        title="Donate"
        subtitle="Your support helps us empower lives, strengthen families and create lasting change."
        image="/causes/children.jpg"
      />

      {/* The form comes first: someone arriving here has already decided.
          Previously it sat behind the statistics and six cause cards, several
          screens down on a phone. */}
      <DonationForm />

      <DonationImpact />

      <Sponsorship />

      <InKindDonations />

      <DonateCTA />
    </>
  );
}
