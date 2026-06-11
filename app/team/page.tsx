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
      />

      <AboutGovernance />

      <AboutVolunteers />

      <TeamCTA />
    </>
  );
}
