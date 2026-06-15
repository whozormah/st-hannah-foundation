"use client";

import { useState } from "react";
import Link from "next/link";

import { Heart, Users, Building2, HandHeart } from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";
import PartnerModal from "@/components/shared/PartnerModal";

export default function ProgramsGetInvolved() {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  const options = [
    {
      title: "Donate",
      icon: Heart,
      description:
        "Help fund life-changing programmes that restore hope, empower families and strengthen communities.",
      action: "donate",
    },
    {
      title: "Volunteer",
      icon: Users,
      description:
        "Share your time, skills and passion to support meaningful initiatives and community projects.",
      link: "/volunteer",
    },
    {
      title: "Partner With Us",
      icon: Building2,
      description:
        "Join hands with us as an individual, business or organisation to create sustainable impact.",
      action: "partner",
    },
    {
      title: "Request Support",
      icon: HandHeart,
      description:
        "Learn about available programmes and submit an application for assistance where eligible.",
      link: "/support",
    },
  ];

  return (
    <>
      {" "}
      <section className="py-32 bg-[#FAF7F2]">
        {" "}
        <div className="container-custom">
          {" "}
          <div className="text-center max-w-4xl mx-auto mb-20">
            {" "}
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Get Involved{" "}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Join Us In Transforming Lives
            </h2>
            <p className="mt-6 text-lg text-gray-600 leading-8">
              Every act of generosity, service and partnership helps us reach
              more individuals, strengthen more families and create lasting
              impact across communities.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {options.map((option) => {
              const Icon = option.icon;

              if (option.action === "donate") {
                return (
                  <button
                    key={option.title}
                    onClick={() => setShowDonationModal(true)}
                    className="text-left bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
                      <Icon size={28} className="text-[#844204]" />
                    </div>

                    <h3 className="text-2xl font-bold">{option.title}</h3>

                    <p className="mt-4 text-gray-600 leading-7">
                      {option.description}
                    </p>
                  </button>
                );
              }

              if (option.action === "partner") {
                return (
                  <button
                    key={option.title}
                    onClick={() => setShowPartnerModal(true)}
                    className="text-left bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
                      <Icon size={28} className="text-[#844204]" />
                    </div>

                    <h3 className="text-2xl font-bold">{option.title}</h3>

                    <p className="mt-4 text-gray-600 leading-7">
                      {option.description}
                    </p>
                  </button>
                );
              }

              return (
                <Link
                  href={option.link!}
                  key={option.title}
                  className="bg-white rounded-[32px] p-8 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 block"
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
                    <Icon size={28} className="text-[#844204]" />
                  </div>

                  <h3 className="text-2xl font-bold">{option.title}</h3>

                  <p className="mt-4 text-gray-600 leading-7">
                    {option.description}
                  </p>
                </Link>
              );
            })}
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
