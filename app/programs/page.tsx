import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Programmes",
  description:
    "Explore our programmes: education support, widow empowerment, medical aid, family support, financial aid and community outreach.",
  alternates: { canonical: "/programs" },
  openGraph: {
    title: "Our Programmes | St. Hannah Foundation",
    description:
      "Explore our programmes: education support, widow empowerment, medical aid, family support, financial aid and community outreach.",
    url: "/programs",
  },
};

import PageHeader from "@/components/shared/PageHeader";

import ProgramsStats from "@/components/sections/programs/ProgramsStats";
import ProgramsAreas from "@/components/sections/programs/ProgramsAreas";
import ProgramsFeatured from "@/components/sections/programs/ProgramsFeatured";
import ProgramsProcess from "@/components/sections/programs/ProgramsProcess";
import ProgramsGetInvolved from "@/components/sections/programs/ProgramsGetInvolved";
import ProgramsCTA from "@/components/sections/programs/ProgramsCTA";

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        title="Programs"
        subtitle="Creating opportunities, restoring dignity and transforming communities through sustainable impact initiatives."
      />

      <ProgramsStats />

      <ProgramsAreas />

      <ProgramsFeatured />

      <ProgramsProcess />

      <ProgramsGetInvolved />

      <ProgramsCTA />
    </>
  );
}
