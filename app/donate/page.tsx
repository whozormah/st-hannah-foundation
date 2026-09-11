import type { Metadata } from "next";

import PageHeader from "@/components/shared/PageHeader";
import DonationForm from "@/components/sections/donate/DonationForm";
import OtherWaysToSupport from "@/components/sections/donate/OtherWaysToSupport";
import InternationalGiving from "@/components/sections/donate/InternationalGiving";
import DonateCTA from "@/components/sections/donate/DonateCTA";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Give securely in Nigerian Naira, donate items and materials, or partner with us. Giving in USD, GBP and EUR is coming soon.",
  alternates: { canonical: "/donate" },
  openGraph: {
    title: "Donate | St. Hannah Foundation",
    description:
      "Give hope, empower lives and strengthen communities. Give securely in Nigerian Naira.",
    url: "/donate",
  },
};

/* One journey: why give, give, other ways to help, international, close.
   The impact statistics and beneficiary story that used to sit here are not
   deleted from the site or the data, they simply no longer compete with the
   donation form. */
export default function DonatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Donate"
        breadcrumbLabel="Donate"
        title="Give hope. Empower lives. Strengthen communities."
        subtitle="Your generosity helps St. Hannah Foundation provide practical support and create opportunities for people and families who need them most."
        image="/causes/children.jpg"
      />

      <DonationForm />

      <OtherWaysToSupport />

      <InternationalGiving />

      <DonateCTA />
    </>
  );
}
