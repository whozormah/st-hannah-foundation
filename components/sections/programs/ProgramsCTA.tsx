"use client";

import DonationModal from "@/components/shared/DonationModal";
import PartnerModal from "@/components/shared/PartnerModal";

import { useState } from "react";

export default function ProgramsCTA() {
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
        <div className="container-custom text-center relative z-10 max-w-5xl">
          <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
            A Better Future Starts Today
          </span>

          <h2 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
            Every Life Touched
            <br />
            Creates A Ripple Of Hope
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-200 leading-8">
            Through education, family support, humanitarian assistance,
            empowerment programmes and community outreach, we are helping
            individuals and families build brighter futures and stronger
            communities.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <button
              onClick={() => setShowDonationModal(true)}
              className="bg-white text-[#844204] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
            >
              Support The Mission
            </button>

            <button
              onClick={() => setShowPartnerModal(true)}
              className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#844204] transition"
            >
              Become A Partner
            </button>
          </div>

          <p className="mt-10 text-sm text-gray-300">
            Together, we can restore dignity, create opportunities and transform
            lives.
          </p>
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
