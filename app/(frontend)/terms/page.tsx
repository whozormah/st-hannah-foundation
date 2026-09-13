import type { Metadata } from "next";

import legal from "@/public/data/legal.json";

import PageHeader from "@/components/shared/PageHeader";
import LegalDocument, {
  isApproved,
} from "@/components/sections/legal/LegalDocument";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: legal.terms.summary,
  alternates: { canonical: "/terms" },
  // A draft is reachable for review but kept out of search results.
  robots: isApproved ? undefined : { index: false, follow: false },
  openGraph: {
    title: "Terms of Use | St. Hannah Foundation",
    description: legal.terms.summary,
    url: "/terms",
  },
};

export default function TermsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Terms of Use"
        subtitle={legal.terms.summary}
      />

      <LegalDocument document={legal.terms} />
    </>
  );
}
