import PageHeader from "@/components/shared/PageHeader";

import SupportCategories from "@/components/sections/apply/SupportCategories";
import BeforeYouApply from "@/components/sections/apply/BeforeYouApply";
import ApplicationProcess from "@/components/sections/apply/ApplicationProcess";
import AidApplicationForm from "@/components/sections/apply/AidApplicationForm";
import ApplyCTA from "@/components/sections/apply/ApplyCTA";

export default function ApplyForSupportPage() {
  return (
    <>
      {" "}
      <PageHeader
        title="Apply For Support"
        subtitle="Request assistance through our support programmes and empowerment initiatives. Every application is reviewed with care, dignity and compassion."
      />
      <SupportCategories />
      <BeforeYouApply />
      <ApplicationProcess />
      <AidApplicationForm />
      <ApplyCTA />
    </>
  );
}
