import type { Metadata } from "next";

import legal from "@/public/data/legal.json";

import PageHeader from "@/components/shared/PageHeader";
import LegalDocument, {
  isApproved,
} from "@/components/sections/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: legal.privacy.summary,
  alternates: { canonical: "/privacy" },
  // A draft is reachable for review but kept out of search results.
  robots: isApproved ? undefined : { index: false, follow: false },
  openGraph: {
    title: "Privacy Policy | St. Hannah Foundation",
    description: legal.privacy.summary,
    url: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle={legal.privacy.summary}
      />

      <LegalDocument document={legal.privacy} />
    </>
  );
}
