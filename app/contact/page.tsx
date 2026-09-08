import PageHeader from "@/components/shared/PageHeader";

import ContactDetails from "@/components/sections/contact/ContactDetails";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactOffices from "@/components/sections/contact/ContactOffices";
import ContactFAQ from "@/components/sections/contact/ContactFAQ";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We would love to hear from you. Reach out about our programmes, volunteering, partnerships and community initiatives."
        image="/headers/contact.jpg"
      />

      {/* Details and form sit side by side: the page's job is to get someone
          in touch, so nothing comes between the two things that do that. */}
      <section className="bg-white py-24">
        <div className="container-custom">
          <div className="grid items-start gap-8 lg:grid-cols-[400px_minmax(0,1fr)] xl:gap-12">
            <ContactDetails />

            <div id="contact-form" className="min-w-0">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <ContactOffices />

      <ContactFAQ />
    </>
  );
}
