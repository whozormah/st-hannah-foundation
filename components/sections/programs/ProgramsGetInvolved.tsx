"use client";

import { useState } from "react";
import Link from "next/link";

import { Heart, Users, Building2, HandHeart, ArrowRight } from "lucide-react";

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
      link: "/apply-for-support",
    },
  ];

  return (
    <>
      <section className="bg-cream py-32">
        <div className="container-custom">
          {/* Heading */}

          <div className="mx-auto mb-20 max-w-4xl text-center">
            <span className="font-semibold uppercase tracking-[6px] text-brand">
              Get Involved
            </span>

            <h2 className="mt-5 text-5xl font-bold text-ink md:text-6xl">
              Be Part Of
              <br />
              Something Bigger
            </h2>

            <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-accent" />

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-700">
              Every act of generosity, service and partnership helps us reach
              more individuals, strengthen more families and create lasting
              impact across communities.
            </p>
          </div>

          {/* Banner */}

          <div className="relative mb-20 overflow-hidden rounded-[40px] bg-gradient-to-r from-brand via-[#9A5A12] to-[#B27425] px-12 py-16 text-white shadow-2xl">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

            <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

            <div className="relative mx-auto max-w-4xl text-center">
              <span className="uppercase tracking-[5px] text-[#F4D06F]">
                Join The Mission
              </span>

              <h3 className="mt-5 text-4xl font-bold">
                Small Acts Of Kindness
                <br />
                Create Extraordinary Impact
              </h3>

              <p className="mt-8 text-lg leading-9 text-white/85">
                Whether you choose to give, volunteer, partner or seek support,
                every connection strengthens our mission of restoring hope and
                empowering communities.
              </p>
            </div>
          </div>

          {/* Cards */}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {options.map((option) => {
              const Icon = option.icon;

              const cardClasses =
                "group flex flex-col rounded-[36px] border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:shadow-2xl";

              const CardContent = (
                <>
                  <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-cream-warm transition-all duration-500 group-hover:scale-110 group-hover:bg-brand">
                    <Icon
                      size={36}
                      className="text-brand transition-all duration-500 group-hover:text-white"
                    />
                  </div>

                  <h3 className="text-2xl font-bold text-ink">
                    {option.title}
                  </h3>

                  <p className="mt-5 flex-grow leading-8 text-gray-700">
                    {option.description}
                  </p>

                  <div className="mt-10 flex items-center gap-2 font-semibold text-brand">
                    Learn More
                    <ArrowRight
                      size={18}
                      className="transition duration-300 group-hover:translate-x-2"
                    />
                  </div>
                </>
              );

              if (option.action === "donate") {
                return (
                  <button
                    key={option.title}
                    onClick={() => setShowDonationModal(true)}
                    className={`${cardClasses} text-left`}
                  >
                    {CardContent}
                  </button>
                );
              }

              if (option.action === "partner") {
                return (
                  <button
                    key={option.title}
                    onClick={() => setShowPartnerModal(true)}
                    className={`${cardClasses} text-left`}
                  >
                    {CardContent}
                  </button>
                );
              }

              return (
                <Link
                  key={option.title}
                  href={option.link!}
                  className={cardClasses}
                >
                  {CardContent}
                </Link>
              );
            })}
          </div>

          {/* Closing */}

          <div className="mx-auto mt-24 max-w-5xl rounded-[40px] bg-white p-14 text-center shadow-xl">
            <span className="uppercase tracking-[5px] text-brand">
              Together We Can
            </span>

            <h3 className="mt-5 text-4xl font-bold text-ink">
              Every Contribution Creates A Brighter Tomorrow
            </h3>

            <div className="mx-auto mt-6 h-[3px] w-20 rounded-full bg-accent" />

            <p className="mt-8 text-lg leading-9 text-gray-700">
              Lasting transformation happens when compassionate people come
              together. Your support, whether through giving, volunteering or
              partnership, enables us to reach more families, empower more
              children and strengthen more communities.
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
