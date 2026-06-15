"use client";

import { useState } from "react";
import PartnerModal from "@/components/shared/PartnerModal";

export default function Sponsorship() {
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  const opportunities = [
    "Educational Sponsorship",
    "Community Development Sponsorship",
    "Widow Empowerment Sponsorship",
    "Event Sponsorship",
    "Strategic Partnerships",
    "Corporate Social Responsibility (CSR)",
  ];

  return (
    <>
      <section className="py-24 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Sponsorship & Partnerships
            </span>

            <h2 className="text-5xl font-bold mt-4">
              Become A Partner In Impact
            </h2>

            <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
              Organizations, businesses and individuals can partner with St.
              Hannah Charity Foundation to create sustainable impact in
              communities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {opportunities.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setIsPartnerOpen(true)}
                className="bg-[#FAF7F2] p-8 rounded-[24px] text-left hover:shadow-lg hover:-translate-y-1 transition duration-300 border border-transparent hover:border-[#D9A441]"
              >
                <h3 className="font-bold text-xl">{item}</h3>

                <p className="mt-4 text-gray-600 text-sm">
                  Click to explore sponsorship and partnership opportunities.
                </p>

                <span className="inline-block mt-6 text-[#844204] font-semibold">
                  Learn More →
                </span>
              </button>
            ))}
          </div>

          <div className="text-center mt-12">
            <button
              type="button"
              onClick={() => setIsPartnerOpen(true)}
              className="inline-flex bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6d3503] transition"
            >
              Become A Sponsor
            </button>
          </div>
        </div>
      </section>

      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />
    </>
  );
}
