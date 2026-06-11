import PageHeader from "@/components/shared/PageHeader";
import ContactMap from "@/components/sections/contact/ContactMap";
import ContactFAQ from "@/components/sections/contact/ContactFAQ";
import ContactCTA from "@/components/sections/contact/ContactCTA";

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We would love to hear from you. Reach out to learn more about our programs, volunteer opportunities, partnerships and community initiatives."
      />

      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Get In Touch
            </span>

            <h2 className="text-5xl font-bold mt-4">
              We'd Love To Hear From You
            </h2>

            <p className="mt-8 text-lg text-gray-600 leading-8">
              Whether you want to volunteer, partner with us, support our
              programs or learn more about the work of St. Hannah Foundation,
              our team is always ready to connect with you.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}

            <div className="bg-[#FAF7F2] rounded-[32px] p-10">
              <h3 className="text-3xl font-bold">Contact Information</h3>

              <div className="space-y-10 mt-10">
                <div>
                  <h4 className="font-bold text-lg">Email Address</h4>

                  <p className="mt-2 text-gray-600">
                    support@thesthannahfoundation.com
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg">Nigeria Office</h4>

                  <p className="mt-2 text-gray-600 leading-7">
                    35, Ilaje Road
                    <br />
                    Bariga, Lagos
                    <br />
                    Nigeria
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg">United States Office</h4>

                  <p className="mt-2 text-gray-600 leading-7">
                    4310 S King Dr.
                    <br />
                    Unit 3D
                    <br />
                    Chicago, IL 60653
                    <br />
                    United States
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg">Response Time</h4>

                  <p className="mt-2 text-gray-600">
                    We typically respond to enquiries within 24 - 48 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}

            <div className="bg-white border border-gray-100 shadow-sm rounded-[32px] p-10">
              <h3 className="text-3xl font-bold">Send Us A Message</h3>

              <p className="text-gray-600 mt-3">
                Fill out the form below and a member of our team will get back
                to you.
              </p>

              <form className="mt-8 space-y-6">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#844204]"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#844204]"
                />

                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#844204]"
                />

                <textarea
                  rows={6}
                  placeholder="Your Message"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#844204]"
                />

                <button
                  type="submit"
                  className="bg-[#844204] hover:bg-[#6d3503] transition text-white px-8 py-4 rounded-xl font-semibold"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <ContactMap />

      <ContactFAQ />

      <ContactCTA />
    </>
  );
}
