"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";
import ContactMap from "@/components/sections/contact/ContactMap";
import ContactFAQ from "@/components/sections/contact/ContactFAQ";
import ContactCTA from "@/components/sections/contact/ContactCTA";

interface SiteSettings {
  email: string;
  phone: string;

  nigeriaOffice: {
    address: string;
  };

  usaOffice: {
    address: string;
  };
}

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch("/data/site-settings.json")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="We would love to hear from you. Reach out to learn more about our programmes, volunteer opportunities, partnerships and community initiatives."
        image="/headers/contact.jpg"
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

          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <a
              href="/volunteer"
              className="bg-[#FAF7F2] rounded-[28px] p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold">Volunteer</h3>

              <p className="mt-3 text-gray-600">
                Join our growing network of volunteers and make a difference.
              </p>
            </a>

            <a
              href="/support"
              className="bg-[#FAF7F2] rounded-[28px] p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold">Request Support</h3>

              <p className="mt-3 text-gray-600">
                Apply for assistance through our available programmes.
              </p>
            </a>

            <a
              href="/contact"
              className="bg-[#FAF7F2] rounded-[28px] p-8 hover:shadow-lg transition"
            >
              <h3 className="text-2xl font-bold">Partner With Us</h3>

              <p className="mt-3 text-gray-600">
                Collaborate with us to create lasting impact in communities.
              </p>
            </a>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="bg-[#FAF7F2] rounded-[32px] p-10">
              <h3 className="text-3xl font-bold">Contact Information</h3>

              <div className="space-y-6 mt-10">
                <div>
                  <h4 className="font-bold text-lg">Email Address</h4>

                  <p className="mt-2 text-gray-600">{settings?.email}</p>
                </div>
                <div className="bg-white rounded-2xl p-6">
                  <h4 className="font-bold text-lg">Phone Number</h4>

                  <p className="mt-2 text-gray-600">{settings?.phone}</p>
                </div>

                <div>
                  <h4 className="font-bold text-lg">Nigeria Office</h4>

                  <p className="mt-2 text-gray-600 leading-7">
                    {settings?.nigeriaOffice.address}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-lg">United States Office</h4>

                  <p className="mt-2 text-gray-600 leading-7">
                    {settings?.usaOffice.address}
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

            <div className="bg-white border border-gray-100 shadow-sm rounded-[32px] p-10">
              <h3 className="text-3xl font-bold">Send Us A Message</h3>

              <p className="text-gray-600 mt-3">
                Fill out the form below and a member of our team will get back
                to you.
              </p>

              <form
                action="https://formspree.io/f/xlgkpggp"
                method="POST"
                className="mt-8 space-y-6"
              >
                <input type="hidden" name="form-name" value="Contact Form" />

                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#844204]"
                />

                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#844204]"
                />

                <select
                  name="enquiry"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#844204]"
                >
                  <option>Reason For Contact</option>

                  <option>General Enquiry</option>

                  <option>Volunteer Application</option>

                  <option>Partnership Request</option>

                  <option>Donation Enquiry</option>

                  <option>Media Enquiry</option>

                  <option>Support Request</option>

                  <option>Other</option>
                </select>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="Subject"
                  className="w-full p-4 rounded-xl border border-gray-200 focus:outline-none focus:border-[#844204]"
                />

                <textarea
                  rows={6}
                  name="message"
                  required
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
              <div className="mt-6">
                <a
                  href={`https://wa.me/${settings?.phone?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center border border-[#844204] text-[#844204] px-6 py-4 rounded-xl font-semibold hover:bg-[#844204] hover:text-white transition"
                >
                  Chat With Us On WhatsApp
                </a>
              </div>
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
