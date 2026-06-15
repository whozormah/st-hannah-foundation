"use client";

import { useState } from "react";
import PartnerModal from "@/components/shared/PartnerModal";

export default function PartnershipCTA() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section className="py-28 bg-[#844204] text-white">
        <div className="container-custom text-center">
          <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
            Let's Work Together
          </span>

          <h2 className="text-5xl md:text-6xl font-bold mt-6">
            Become A Partner
          </h2>

          <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-200 leading-8">
            Whether you are an organization, business, institution, church or
            individual, we invite you to join us in creating opportunities and
            transforming lives.
          </p>

          <button
            onClick={() => setIsOpen(true)}
            className="mt-10 bg-white text-[#844204] px-8 py-4 rounded-xl font-semibold"
          >
            Start A Partnership
          </button>
        </div>
      </section>

      <PartnerModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
