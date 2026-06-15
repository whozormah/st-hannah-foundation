"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import settings from "@/public/data/site-settings.json";

import DonationModal from "@/components/shared/DonationModal";

interface SiteSettings {
  foundationName: string;
  email: string;
  phone: string;

  nigeriaOffice: {
    address: string;
  };

  usaOffice: {
    address: string;
  };

  socials: {
    facebook: string;
    instagram: string;
    youtube: string;
    linkedin: string;
    tiktok: string;
  };
}

export default function Footer() {
  const [showDonationModal, setShowDonationModal] = useState(false);

  return (
    <>
      <footer className="bg-[#140B02] text-white">
        {/* Newsletter Section */}

        <div className="border-b border-white/10">
          <div className="container-custom py-20">
            <div className="max-w-4xl mx-auto text-center">
              <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
                Stay Connected
              </span>

              <h2 className="text-4xl md:text-5xl font-bold mt-4">
                Stay Connected To The Mission
              </h2>

              <p className="mt-6 text-gray-300 max-w-2xl mx-auto leading-8">
                Receive updates on outreach activities, impact stories,
                volunteer opportunities and community initiatives.
              </p>

              <form
                action="YOUR_FORMSPREE_ENDPOINT"
                method="POST"
                className="mt-10 flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto"
              >
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl bg-white text-black outline-none"
                />

                <button
                  type="submit"
                  className="bg-[#844204] hover:bg-[#A85A12] px-8 py-4 rounded-xl font-semibold transition"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
        {/* Main Footer */}

        <div className="container-custom py-24">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Foundation Info */}

            <div className="lg:col-span-4">
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16">
                  <Image
                    src="/logo.png"
                    alt={settings?.foundationName || ""}
                    fill
                    className="object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    {settings?.foundationName}
                  </h3>

                  <p className="text-[#D9A441] text-sm">
                    Empowering Communities Through Love & Service
                  </p>
                </div>
              </div>

              <p className="mt-8 text-gray-300 leading-8">
                We exist to uplift families and communities through education,
                empowerment, compassionate support and sustainable development
                initiatives that create lasting impact.
              </p>

              <div className="mt-8 border-l-4 border-[#D9A441] pl-5">
                <p className="italic text-gray-300 leading-8">
                  "To build a world where every child and family experiences the
                  fullness of their God-given potential."
                </p>
              </div>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link
                  href="/volunteer"
                  className="bg-white text-[#140B02] px-6 py-3 rounded-xl font-semibold"
                >
                  Volunteer
                </Link>

                <button
                  onClick={() => setShowDonationModal(true)}
                  className="bg-[#844204] hover:bg-[#A85A12] px-6 py-3 rounded-xl font-semibold transition"
                >
                  Donate
                </button>
              </div>
            </div>

            {/* Explore */}

            <div className="lg:col-span-2">
              <h4 className="font-bold text-xl mb-6">Explore</h4>

              <ul className="space-y-4 text-gray-300">
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/about">About Us</Link>
                </li>
                <li>
                  <Link href="/programs">Programs</Link>
                </li>
                <li>
                  <Link href="/impact-stories">Impact Stories</Link>
                </li>
                <li>
                  <Link href="/gallery">Gallery</Link>
                </li>
                <li>
                  <Link href="/team">Leadership</Link>
                </li>
              </ul>
            </div>

            {/* Get Involved */}

            <div className="lg:col-span-2">
              <h4 className="font-bold text-xl mb-6">Get Involved</h4>

              <ul className="space-y-4 text-gray-300">
                <li>
                  <button
                    onClick={() => setShowDonationModal(true)}
                    className="hover:text-[#D9A441] transition"
                  >
                    Donate
                  </button>
                </li>

                <li>
                  <Link href="/volunteer">Volunteer</Link>
                </li>

                <li>
                  <Link href="/contact">Partner With Us</Link>
                </li>

                <li>
                  <Link href="/apply-for-support">Apply For Support</Link>
                </li>
              </ul>
            </div>
            {/* Contact */}

            <div className="lg:col-span-4">
              <h4 className="font-bold text-xl mb-6">Contact</h4>

              <div className="space-y-6">
                {/* Email */}

                <div>
                  <p className="text-[#D9A441] text-sm uppercase tracking-wider">
                    Email
                  </p>

                  <a
                    href={`mailto:${settings?.email}`}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {settings?.email}
                  </a>
                </div>

                {/* Phone */}

                <div>
                  <p className="text-[#D9A441] text-sm uppercase tracking-wider">
                    Phone
                  </p>

                  <a
                    href={`tel:${settings?.phone}`}
                    className="text-gray-300 hover:text-white transition"
                  >
                    {settings?.phone}
                  </a>
                </div>

                {/* Nigeria Office */}

                <div>
                  <p className="text-[#D9A441] text-sm uppercase tracking-wider">
                    Nigeria Office
                  </p>

                  <p className="text-gray-300 leading-7">
                    {settings?.nigeriaOffice.address}
                  </p>
                </div>

                {/* USA Office */}

                <div>
                  <p className="text-[#D9A441] text-sm uppercase tracking-wider">
                    USA Office
                  </p>

                  <p className="text-gray-300 leading-7">
                    {settings?.usaOffice.address}
                  </p>
                </div>

                {/* Socials */}

                <div className="pt-6 border-t border-white/10">
                  <p className="font-semibold mb-4">Follow Us</p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href={settings?.socials.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#D9A441] transition"
                    >
                      Facebook
                    </a>

                    <a
                      href={settings?.socials.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#D9A441] transition"
                    >
                      Instagram
                    </a>

                    <a
                      href={settings?.socials.tiktok}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-[#D9A441] transition"
                    >
                      TikTok
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Footer Bottom */}

        <div className="border-t border-white/10">
          <div className="container-custom py-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © 2026 {settings?.foundationName}. All Rights Reserved.
            </p>

            <p className="text-gray-400 text-sm text-center md:text-right">
              Designed & Developed by{" "}
              <a
                href="https://www.instagram.com/whozormah?igsh=bmJhbW12bjhvMDRp"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D9A441] hover:text-white transition font-medium"
              >
                @whozormah
              </a>
            </p>
          </div>
        </div>
      </footer>

      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />
    </>
  );
}
