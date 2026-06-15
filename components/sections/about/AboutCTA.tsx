"use client";

import { useState } from "react";
import { Heart, Users, Handshake } from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";
import PartnerModal from "@/components/shared/PartnerModal";

export default function AboutCTA() {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  return (
    <>
      {" "}
      <section className="py-32 bg-[#844204] text-white relative overflow-hidden">
        {" "}
        <div className="absolute inset-0 opacity-10">
          {" "}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D9A441] rounded-full blur-3xl" />{" "}
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#D9A441] rounded-full blur-3xl" />{" "}
        </div>
        ```
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
              Join The Mission
            </span>

            <h2 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
              Everyone Has A
              <br />
              Role To Play
            </h2>

            <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-200 leading-8">
              Whether through giving, volunteering or partnership, your support
              helps create opportunities, restore hope and transform lives
              across communities.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mt-16">
            <button
              onClick={() => setShowDonationModal(true)}
              className="bg-white/10 backdrop-blur-sm rounded-[32px] p-10 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <Heart size={48} className="mx-auto text-[#D9A441]" />

              <h3 className="text-2xl font-bold mt-6">Donate</h3>

              <p className="mt-4 text-gray-200 leading-7">
                Support programmes that restore dignity, strengthen families and
                create opportunities for lasting change.
              </p>
            </button>

            <a
              href="/volunteer"
              className="bg-white/10 backdrop-blur-sm rounded-[32px] p-10 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <Users size={48} className="mx-auto text-[#D9A441]" />

              <h3 className="text-2xl font-bold mt-6">Volunteer</h3>

              <p className="mt-4 text-gray-200 leading-7">
                Use your time, talents and expertise to support programmes that
                impact lives and communities.
              </p>
            </a>

            <button
              onClick={() => setShowPartnerModal(true)}
              className="bg-white/10 backdrop-blur-sm rounded-[32px] p-10 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <Handshake size={48} className="mx-auto text-[#D9A441]" />

              <h3 className="text-2xl font-bold mt-6">Partner</h3>

              <p className="mt-4 text-gray-200 leading-7">
                Collaborate with us to expand our reach and create sustainable
                impact in more communities.
              </p>
            </button>
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
