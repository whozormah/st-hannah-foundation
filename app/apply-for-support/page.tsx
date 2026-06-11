import PageHeader from "@/components/shared/PageHeader";

import SupportCategories from "@/components/sections/apply/SupportCategories";
import AidApplicationForm from "@/components/sections/apply/AidApplicationForm";
import ApplicationProcess from "@/components/sections/apply/ApplicationProcess";
import ApplyCTA from "@/components/sections/apply/ApplyCTA";

export default function ApplyForSupportPage() {
  return (
    <>
      <PageHeader
        title="Apply For Support"
        subtitle="Apply for educational, family, empowerment, medical and community support programs through St. Hannah Foundation."
      />

      <SupportCategories />

      <AidApplicationForm />

      <ApplicationProcess />

      <ApplyCTA />
    </>
  );
}
