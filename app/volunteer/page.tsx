import PageHeader from "@/components/shared/PageHeader";

import VolunteerOpportunities from "@/components/sections/volunteer/VolunteerOpportunities";
import VolunteerBenefits from "@/components/sections/volunteer/VolunteerBenefits";
import VolunteerForm from "@/components/sections/volunteer/VolunteerForm";
import VolunteerCTA from "@/components/sections/volunteer/VolunteerCTA";

export default function VolunteerPage() {
  return (
    <>
      <PageHeader
        title="Volunteer"
        subtitle="Join a growing community of passionate individuals committed to empowering lives, supporting families and creating lasting change."
      />

      <VolunteerOpportunities />

      <VolunteerBenefits />

      <VolunteerForm />

      <VolunteerCTA />
    </>
  );
}
