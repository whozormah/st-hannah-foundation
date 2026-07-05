"use client";

import PageHeader from "@/components/shared/PageHeader";

import ContactInformation from "@/components/sections/contact/ContactInformation";
import ContactMap from "@/components/sections/contact/ContactMap";
import ContactFAQ from "@/components/sections/contact/ContactFAQ";
import ContactCTA from "@/components/sections/contact/ContactCTA";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We would love to hear from you. Reach out to learn more about our programmes, volunteer opportunities, partnerships and community initiatives."
        image="/headers/contact.jpg"
      />

      <ContactInformation />

      <ContactMap />

      <ContactFAQ />

      <ContactCTA />
    </>
  );
}
