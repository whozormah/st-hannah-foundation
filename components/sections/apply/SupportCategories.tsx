"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import InKindDonationModal from "@/components/shared/in-kind/InKindDonationModal";

interface Program {
  slug: string;
  title: string;
  excerpt: string;
}

export default function SupportCategories() {
  const [isInKindModalOpen, setIsInKindModalOpen] = useState(false);

  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("/data/programs.json")
      .then((res) => res.json())
      .then((data) =>
        setPrograms(
          data.filter((item: Program) => item.slug !== "community-outreach"),
        ),
      )
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {" "}
      <section className="py-24 bg-[#FAF7F2]">
        {" "}
        <div className="container-custom">
          {" "}
          <div className="text-center max-w-4xl mx-auto mb-16">
            {" "}
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Available Support{" "}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Support Programmes Available
            </h2>
            <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600 leading-8">
              Explore the support services and empowerment programmes currently
              available through St. Hannah Foundation. Each application is
              reviewed individually based on need, eligibility and available
              resources.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Link
                href={`/programs/${program.slug}`}
                key={program.slug}
                className="bg-white rounded-[32px] p-8 border border-gray-100 hover:border-[#D9A441]/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 block"
              >
                <div className="w-16 h-1 bg-[#D9A441] rounded-full mb-6" />

                <h3 className="text-2xl font-bold">{program.title}</h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {program.excerpt}
                </p>

                <div className="mt-6 text-[#844204] font-semibold">
                  Learn More →
                </div>
              </Link>
            ))}

            {/* In-Kind Donations */}

            <div className="bg-[#844204] text-white rounded-[32px] p-8 border border-[#844204] hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="w-16 h-1 bg-[#D9A441] rounded-full mb-6" />

              <h3 className="text-2xl font-bold">In-Kind Donations</h3>

              <p className="mt-4 text-white/80 leading-7">
                Donate food items, clothing, educational materials, medical
                supplies, household items, business equipment, tools and other
                resources that can directly support vulnerable individuals,
                families and communities.
              </p>

              <button
                type="button"
                onClick={() => setIsInKindModalOpen(true)}
                className="mt-6 bg-white text-[#844204] px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"
              >
                Donate Items
              </button>
            </div>
          </div>
        </div>
      </section>
      <InKindDonationModal
        isOpen={isInKindModalOpen}
        onClose={() => setIsInKindModalOpen(false)}
      />
    </>
  );
}
