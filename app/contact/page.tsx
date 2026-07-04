"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  HandHeart,
  HeartHandshake,
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
} from "lucide-react";

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

          <div className="grid gap-8 mb-24 md:grid-cols-3">
            <Link
              href="/volunteer"
              className="group rounded-[36px] border border-gray-100 bg-[#FAF7F2] p-10 transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/30 hover:bg-white hover:shadow-2xl"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white transition-all duration-500 group-hover:bg-[#844204]">
                <Users
                  size={34}
                  className="text-[#844204] transition-all duration-500 group-hover:text-white"
                />
              </div>

              <span className="uppercase tracking-[4px] text-sm font-semibold text-[#844204]">
                Join Our Team
              </span>

              <h3 className="mt-4 text-3xl font-bold text-[#1B1815]">
                Volunteer
              </h3>

              <p className="mt-5 leading-8 text-gray-600">
                Share your time, talents and passion to help create lasting
                impact in vulnerable communities.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 font-semibold text-[#844204]">
                Become A Volunteer
                <ArrowRight
                  size={18}
                  className="transition duration-300 group-hover:translate-x-2"
                />
              </div>
            </Link>

            <Link
              href="/support"
              className="group rounded-[36px] border border-gray-100 bg-[#FAF7F2] p-10 transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/30 hover:bg-white hover:shadow-2xl"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white transition-all duration-500 group-hover:bg-[#844204]">
                <HandHeart
                  size={34}
                  className="text-[#844204] transition-all duration-500 group-hover:text-white"
                />
              </div>

              <span className="uppercase tracking-[4px] text-sm font-semibold text-[#844204]">
                Need Assistance
              </span>

              <h3 className="mt-4 text-3xl font-bold text-[#1B1815]">
                Request Support
              </h3>

              <p className="mt-5 leading-8 text-gray-600">
                Learn about our programmes and discover whether you or someone
                you know may be eligible for assistance.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 font-semibold text-[#844204]">
                Learn More
                <ArrowRight
                  size={18}
                  className="transition duration-300 group-hover:translate-x-2"
                />
              </div>
            </Link>

            <Link
              href="#contact-form"
              className="group rounded-[36px] border border-gray-100 bg-[#FAF7F2] p-10 transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/30 hover:bg-white hover:shadow-2xl"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-white transition-all duration-500 group-hover:bg-[#844204]">
                <HeartHandshake
                  size={34}
                  className="text-[#844204] transition-all duration-500 group-hover:text-white"
                />
              </div>

              <span className="uppercase tracking-[4px] text-sm font-semibold text-[#844204]">
                Work With Us
              </span>

              <h3 className="mt-4 text-3xl font-bold text-[#1B1815]">
                Partner With Us
              </h3>

              <p className="mt-5 leading-8 text-gray-600">
                Collaborate with us as an individual, business or organisation
                to create sustainable change across communities.
              </p>

              <div className="mt-8 inline-flex items-center gap-3 font-semibold text-[#844204]">
                Start A Partnership
                <ArrowRight
                  size={18}
                  className="transition duration-300 group-hover:translate-x-2"
                />
              </div>
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="rounded-[40px] bg-[#FAF7F2] p-10 lg:p-12">
              <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
                Contact Information
              </span>

              <h3 className="text-4xl font-bold mt-5 leading-tight">
                Let's Start A
                <br />
                Meaningful Conversation
              </h3>

              <p className="mt-6 text-gray-600 leading-8 text-lg">
                We'd love to hear from you. Whether you're interested in
                partnering, volunteering, supporting a programme or making an
                enquiry, our team is ready to assist.
              </p>

              <div className="space-y-6 mt-12">
                {/* Email */}

                <div className="group flex gap-5 bg-white rounded-[28px] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF8EC] flex items-center justify-center group-hover:bg-[#844204] transition">
                    <Mail
                      size={28}
                      className="text-[#844204] group-hover:text-white transition"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-xl">Email Address</h4>

                    <p className="mt-2 text-gray-600 leading-7">
                      {settings?.email}
                    </p>
                  </div>
                </div>

                {/* Phone */}

                <div className="group flex gap-5 bg-white rounded-[28px] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF8EC] flex items-center justify-center group-hover:bg-[#844204] transition">
                    <Phone
                      size={28}
                      className="text-[#844204] group-hover:text-white transition"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-xl">Phone Number</h4>

                    <p className="mt-2 text-gray-600">{settings?.phone}</p>
                  </div>
                </div>

                {/* Nigeria */}

                <div className="group flex gap-5 bg-white rounded-[28px] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF8EC] flex items-center justify-center group-hover:bg-[#844204] transition">
                    <MapPin
                      size={28}
                      className="text-[#844204] group-hover:text-white transition"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-xl">Nigeria Office</h4>

                    <p className="mt-2 text-gray-600 leading-7">
                      {settings?.nigeriaOffice.address}
                    </p>
                  </div>
                </div>

                {/* USA */}

                <div className="group flex gap-5 bg-white rounded-[28px] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF8EC] flex items-center justify-center group-hover:bg-[#844204] transition">
                    <MapPin
                      size={28}
                      className="text-[#844204] group-hover:text-white transition"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-xl">United States Office</h4>

                    <p className="mt-2 text-gray-600 leading-7">
                      {settings?.usaOffice.address}
                    </p>
                  </div>
                </div>

                {/* Response */}

                <div className="group flex gap-5 bg-white rounded-[28px] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#FFF8EC] flex items-center justify-center group-hover:bg-[#844204] transition">
                    <Clock
                      size={28}
                      className="text-[#844204] group-hover:text-white transition"
                    />
                  </div>

                  <div>
                    <h4 className="font-bold text-xl">Response Time</h4>

                    <p className="mt-2 text-gray-600">
                      We typically respond within 24–48 hours.
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}

              <div className="mt-10 rounded-[32px] bg-[#844204] p-8 text-white">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                    <MessageCircle size={28} />
                  </div>

                  <div>
                    <h4 className="font-bold text-2xl">
                      Need A Faster Response?
                    </h4>
                  </div>
                </div>

                <p className="mt-6 leading-8 text-white/90">
                  Chat directly with our team on WhatsApp for quick enquiries,
                  partnership discussions and programme information.
                </p>

                <a
                  href={`https://wa.me/${settings?.phone?.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-8 bg-white text-[#844204] px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
                >
                  Chat On WhatsApp
                </a>
              </div>
            </div>

            <div
              id="contact-form"
              className="rounded-[40px] border border-gray-100 bg-white p-10 shadow-xl lg:p-12"
            >
              <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
                Send A Message
              </span>

              <h3 className="mt-5 text-4xl font-bold leading-tight text-[#1B1815]">
                We'd Love To
                <br />
                Hear From You
              </h3>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                Tell us how we can help. Whether it's a general enquiry,
                partnership, volunteering opportunity or support request, we'll
                connect you with the right member of our team.
              </p>

              <form
                action="https://formspree.io/f/xlgkpggp"
                method="POST"
                className="mt-10 space-y-7"
              >
                <input type="hidden" name="form-name" value="Contact Form" />

                {/* Name & Email */}

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-3 block font-semibold text-[#1B1815]">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="John Doe"
                      className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 transition-all duration-300 focus:border-[#844204] focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-3 block font-semibold text-[#1B1815]">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="john@example.com"
                      className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 transition-all duration-300 focus:border-[#844204] focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Subject */}

                <div>
                  <label className="mb-3 block font-semibold text-[#1B1815]">
                    Subject
                  </label>

                  <input
                    type="text"
                    name="subject"
                    required
                    placeholder="How can we help?"
                    className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 transition-all duration-300 focus:border-[#844204] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Enquiry */}

                <div>
                  <label className="mb-3 block font-semibold text-[#1B1815]">
                    Reason For Contact
                  </label>

                  <select
                    name="enquiry"
                    className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 transition-all duration-300 focus:border-[#844204] focus:bg-white focus:outline-none"
                  >
                    <option>General Enquiry</option>
                    <option>Volunteer Application</option>
                    <option>Partnership Request</option>
                    <option>Donation Enquiry</option>
                    <option>Support Request</option>
                    <option>Media Enquiry</option>
                    <option>Corporate Partnership</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Message */}

                <div>
                  <label className="mb-3 block font-semibold text-[#1B1815]">
                    Your Message
                  </label>

                  <textarea
                    rows={8}
                    name="message"
                    required
                    placeholder="Tell us about your enquiry..."
                    className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 transition-all duration-300 focus:border-[#844204] focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Button */}

                <div className="pt-3">
                  <button
                    type="submit"
                    className="group inline-flex items-center gap-3 rounded-full bg-[#844204] px-10 py-5 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D3503] hover:shadow-xl"
                  >
                    Send Message
                    <ArrowRight
                      size={18}
                      className="transition-transform duration-300 group-hover:translate-x-2"
                    />
                  </button>
                </div>
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
