"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Users, Handshake, ArrowRight } from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";
import PartnerModal from "@/components/shared/PartnerModal";

export default function ImpactCTA() {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  return (
    <>
      {" "}
      <section className="relative py-32 overflow-hidden bg-[#844204] text-white">
        {/* Background Effects */}
        ```
        <div className="absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-[#D9A441]/10 rounded-full blur-3xl" />

          <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-[#D9A441]/10 rounded-full blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          {/* Heading */}

          <div className="max-w-4xl mx-auto text-center">
            <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
              Join The Mission
            </span>

            <h2 className="text-4xl md:text-6xl xl:text-7xl font-bold mt-6 leading-tight">
              Hope Begins
              <br />
              With People Like You
            </h2>

            <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-200 leading-8">
              Through generosity, volunteering and strategic partnerships,
              together we can restore hope, strengthen families, empower widows,
              support education and transform communities.
            </p>
          </div>

          {/* Impact Stats */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-16 text-center">
            <div>
              <h3 className="text-4xl font-bold text-[#D9A441]">500+</h3>

              <p className="mt-2 text-gray-300">Widows Supported</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#D9A441]">100+</h3>

              <p className="mt-2 text-gray-300">Children Reached</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#D9A441]">50+</h3>

              <p className="mt-2 text-gray-300">Communities Impacted</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-[#D9A441]">10+</h3>

              <p className="mt-2 text-gray-300">Years Of Impact</p>
            </div>
          </div>

          {/* Action Cards */}

          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto mt-20">
            {/* Donate */}

            <button
              onClick={() => setShowDonationModal(true)}
              className="group bg-white/5 border border-white/10 hover:border-[#D9A441]/40 backdrop-blur-md rounded-[32px] p-10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 shadow-2xl text-left"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#D9A441]/10 border border-[#D9A441]/20 flex items-center justify-center">
                <Heart size={38} className="text-[#D9A441]" />
              </div>

              <h3 className="text-3xl font-bold mt-8">Donate</h3>

              <p className="mt-4 text-gray-300 leading-8">
                Support programs that provide food, education, empowerment and
                opportunities to vulnerable families.
              </p>

              <div className="flex items-center gap-2 mt-8 text-[#D9A441] font-semibold">
                Support A Cause
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition"
                />
              </div>
            </button>

            {/* Volunteer */}

            <Link
              href="/volunteer"
              className="group bg-white/5 border border-white/10 hover:border-[#D9A441]/40 backdrop-blur-md rounded-[32px] p-10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 shadow-2xl text-left"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#D9A441]/10 border border-[#D9A441]/20 flex items-center justify-center">
                <Users size={38} className="text-[#D9A441]" />
              </div>

              <h3 className="text-3xl font-bold mt-8">Volunteer</h3>

              <p className="mt-4 text-gray-300 leading-8">
                Share your skills, expertise and time to help transform lives
                and strengthen communities.
              </p>

              <div className="flex items-center gap-2 mt-8 text-[#D9A441] font-semibold">
                Join Our Team
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition"
                />
              </div>
            </Link>

            {/* Partner */}

            <button
              onClick={() => setShowPartnerModal(true)}
              className="group bg-white/5 border border-white/10 hover:border-[#D9A441]/40 backdrop-blur-md rounded-[32px] p-10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-3 shadow-2xl text-left"
            >
              <div className="w-20 h-20 rounded-2xl bg-[#D9A441]/10 border border-[#D9A441]/20 flex items-center justify-center">
                <Handshake size={38} className="text-[#D9A441]" />
              </div>

              <h3 className="text-3xl font-bold mt-8">Partner With Us</h3>

              <p className="mt-4 text-gray-300 leading-8">
                Collaborate through sponsorships, corporate partnerships and
                strategic initiatives that expand our impact.
              </p>

              <div className="flex items-center gap-2 mt-8 text-[#D9A441] font-semibold">
                Become A Partner
                <ArrowRight
                  size={18}
                  className="group-hover:translate-x-2 transition"
                />
              </div>
            </button>
          </div>

          {/* Closing Statement */}

          <div className="max-w-3xl mx-auto text-center mt-20">
            <p className="text-xl text-gray-200 leading-9">
              Every contribution, every volunteer and every partner helps create
              opportunities, restore dignity and build stronger communities
              across Nigeria and beyond.
            </p>
          </div>
        </div>
      </section>
      <DonationModal
        isOpen={showDonationModal}
        onClose={() => setShowDonationModal(false)}
      />
      <PartnerModal
        isOpen={showPartnerModal}
        onClose={() => setShowPartnerModal(false)}
      />
    </>
  );
}
