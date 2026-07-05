"use client";

import { useEffect, useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageCircle,
  ArrowRight,
} from "lucide-react";

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

export default function ContactInformation() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch("/data/site-settings.json")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch(console.error);
  }, []);

  return (
    <section className="bg-white py-24  overflow-hidden">
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-1 xl:grid-cols-[430px_minmax(0,1fr)]">
          {/* Contact Information */}

          <div className="min-w-0 rounded-[40px] bg-[#FAF7F2] p-8 lg:p-10">
            <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
              Contact Information
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight text-[#1B1815] lg:text-5xl">
              Let's Start A
              <br />
              Meaningful Conversation
            </h2>

            <p className="mt-6 text-lg leading-8 text-gray-600">
              We'd love to hear from you. Whether you're interested in
              partnering, volunteering, supporting a programme or making an
              enquiry, our team is always ready to assist.
            </p>

            <div className="mt-12 space-y-6">
              {/* Email */}

              <div className="flex items-start gap-5 rounded-[28px] bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFF8EC]">
                  <Mail size={28} className="text-[#844204]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">Email Address</h3>

                  <p className="mt-2 break-all text-gray-600">
                    {settings?.email}
                  </p>
                </div>
              </div>

              {/* Phone */}

              <div className="flex items-start gap-5 rounded-[28px] bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFF8EC]">
                  <Phone size={28} className="text-[#844204]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">Phone Number</h3>

                  <p className="mt-2 break-all text-gray-600">
                    {settings?.phone}
                  </p>
                </div>
              </div>

              {/* Nigeria */}

              <div className="flex items-start gap-5 rounded-[28px] bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFF8EC]">
                  <MapPin size={28} className="text-[#844204]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">Nigeria Office</h3>

                  <p className="mt-2 break-words leading-7 text-gray-600">
                    {settings?.nigeriaOffice.address}
                  </p>
                </div>
              </div>

              {/* USA */}

              <div className="flex items-start gap-5 rounded-[28px] bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFF8EC]">
                  <MapPin size={28} className="text-[#844204]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">United States Office</h3>

                  <p className="mt-2 break-words leading-7 text-gray-600">
                    {settings?.usaOffice.address}
                  </p>
                </div>
              </div>

              {/* Response */}

              <div className="flex items-start gap-5 rounded-[28px] bg-white p-6 shadow-sm">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#FFF8EC]">
                  <Clock size={28} className="text-[#844204]" />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-xl font-bold">Response Time</h3>

                  <p className="mt-2 text-gray-600">
                    We typically respond within 24–48 hours.
                  </p>
                </div>
              </div>
            </div>

            {/* WhatsApp Card */}

            <div className="mt-10 rounded-[32px] bg-[#844204] p-8 text-white">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <MessageCircle size={28} />
                </div>

                <h3 className="text-2xl font-bold">Need A Faster Response?</h3>
              </div>

              <p className="mt-6 leading-8 text-white/90">
                Chat directly with our team on WhatsApp for quick enquiries,
                partnership discussions and programme information.
              </p>
              <a
                href={`https://wa.me/${settings?.phone?.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center rounded-full bg-white px-8 py-4 font-semibold text-[#844204] transition-all duration-300 hover:scale-105"
              >
                Chat On WhatsApp
              </a>
            </div>
          </div>

          {/* Contact Form */}

          <div
            id="contact-form"
            className="min-w-0 rounded-[40px] border border-gray-100 bg-white p-8 shadow-xl lg:p-10"
          >
            <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
              Send A Message
            </span>

            <h2 className="mt-5 text-4xl font-bold leading-tight text-[#1B1815] lg:text-5xl">
              We'd Love To
              <br />
              Hear From You
            </h2>

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

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-3 block font-semibold">Full Name</label>

                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="John Doe"
                    className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 focus:border-[#844204] focus:bg-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-3 block font-semibold">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="john@example.com"
                    className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 focus:border-[#844204] focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block font-semibold">Subject</label>

                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="How can we help?"
                  className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 focus:border-[#844204] focus:bg-white focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-3 block font-semibold">
                  Reason For Contact
                </label>

                <select
                  name="enquiry"
                  className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 focus:border-[#844204] focus:bg-white focus:outline-none"
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

              <div>
                <label className="mb-3 block font-semibold">Your Message</label>

                <textarea
                  rows={8}
                  name="message"
                  required
                  placeholder="Tell us about your enquiry..."
                  className="w-full rounded-2xl border border-gray-200 bg-[#FAF7F2] p-5 focus:border-[#844204] focus:bg-white focus:outline-none"
                />
              </div>

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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
