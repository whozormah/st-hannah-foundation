import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the leadership, trustees and volunteers driving the work of St. Hannah Foundation.",
  alternates: { canonical: "/team" },
  openGraph: {
    title: "Our Team | St. Hannah Foundation",
    description:
      "Meet the leadership, trustees and volunteers driving the work of St. Hannah Foundation.",
    url: "/team",
  },
};

import PageHeader from "@/components/shared/PageHeader";

import AboutGovernance from "@/components/sections/about/AboutGovernance";
import AboutVolunteers from "@/components/sections/about/AboutVolunteers";

import TeamCTA from "@/components/sections/team/TeamCTA";

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Our Team"
        subtitle="Meet the passionate leaders and volunteers driving the mission of St. Hannah Foundation and creating meaningful impact in communities."
        image="/causes/community.jpg"
      />

      <AboutGovernance />

      <AboutVolunteers />

      <TeamCTA />
    </>
  );
}
