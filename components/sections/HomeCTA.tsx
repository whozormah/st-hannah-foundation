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
      <section className="relative overflow-hidden bg-[#6F3403] py-36 text-white">
        {/* Background */}

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-40 -top-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />

          <div className="absolute -right-40 bottom-0 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />

          <div className="absolute inset-0 opacity-[0.04]">
            <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="pattern"
                  width="120"
                  height="120"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="2" fill="#ffffff" />
                </pattern>
              </defs>

              <rect width="100%" height="100%" fill="url(#pattern)" />
            </svg>
          </div>
        </div>

        <div className="container-custom relative z-10">
          {/* Heading */}

          <div className="mx-auto max-w-5xl text-center">
            <span className="inline-flex rounded-full border border-accent/20 bg-accent/10 px-6 py-3 text-xs font-semibold uppercase tracking-[5px] text-accent-soft">
              Join The Mission
            </span>

            <h2 className="mt-8 text-5xl font-bold leading-tight md:text-7xl">
              Be The Reason
              <br />
              Hope Continues
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-xl leading-10 text-white/85">
              Every act of kindness creates opportunities for children,
              strengthens families and restores hope to communities. Whether you
              choose to give, volunteer or partner with us, you become part of a
              mission that changes lives every day.
            </p>

            <div className="mx-auto mt-12 h-px w-40 bg-white/20" />

            {/* Quote */}

            <div className="mx-auto mt-12 max-w-3xl">
              <p className="text-3xl font-light italic leading-relaxed text-white/90">
                &quot;Hope grows wherever compassion becomes action.&quot;
              </p>

              <p className="mt-5 text-sm uppercase tracking-[4px] text-accent-soft">
                St. Hannah Foundation
              </p>
            </div>
          </div>

          {/* Action Cards */}

          <div className="mx-auto mt-24 grid max-w-7xl gap-8 lg:grid-cols-3">
            {/* Donate */}

            <button
              onClick={() => setShowDonationModal(true)}
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-10 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:bg-white/10 hover:shadow-[0_35px_80px_rgba(0,0,0,.18)]"
            >
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-accent/20 bg-accent/10">
                  <Heart size={44} className="text-accent-soft" />
                </div>

                <span className="mt-8 inline-block text-xs uppercase tracking-[4px] text-accent-soft">
                  Give Hope
                </span>

                <h3 className="mt-3 text-4xl font-bold">Donate</h3>

                <p className="mt-6 leading-8 text-white/80">
                  Support programmes that provide education, healthcare, food
                  assistance and long term empowerment for vulnerable children
                  and families.
                </p>

                <div className="mt-10 h-px w-full bg-white/10" />

                <div className="mt-8 flex items-center justify-between">
                  <span className="font-semibold text-accent-soft">
                    Make A Difference
                  </span>

                  <ArrowRight
                    size={22}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </div>
            </button>

            {/* Volunteer */}

            <Link
              href="/volunteer"
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-10 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:bg-white/10 hover:shadow-[0_35px_80px_rgba(0,0,0,.18)]"
            >
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-accent/20 bg-accent/10">
                  <Users size={44} className="text-accent-soft" />
                </div>

                <span className="mt-8 inline-block text-xs uppercase tracking-[4px] text-accent-soft">
                  Serve
                </span>

                <h3 className="mt-3 text-4xl font-bold">Volunteer</h3>

                <p className="mt-6 leading-8 text-white/80">
                  Share your time, skills and passion with communities that need
                  encouragement, care and practical support.
                </p>

                <div className="mt-10 h-px w-full bg-white/10" />

                <div className="mt-8 flex items-center justify-between">
                  <span className="font-semibold text-accent-soft">
                    Volunteer With Us
                  </span>

                  <ArrowRight
                    size={22}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </div>
            </Link>

            {/* Partner */}

            <button
              onClick={() => setShowPartnerModal(true)}
              className="group relative overflow-hidden rounded-[36px] border border-white/10 bg-white/5 p-10 text-left backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:bg-white/10 hover:shadow-[0_35px_80px_rgba(0,0,0,.18)]"
            >
              <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/10 blur-3xl transition-all duration-500 group-hover:scale-150" />

              <div className="relative">
                <div className="flex h-24 w-24 items-center justify-center rounded-[28px] border border-accent/20 bg-accent/10">
                  <Handshake size={44} className="text-accent-soft" />
                </div>

                <span className="mt-8 inline-block text-xs uppercase tracking-[4px] text-accent-soft">
                  Collaborate
                </span>

                <h3 className="mt-3 text-4xl font-bold">Partner With Us</h3>

                <p className="mt-6 leading-8 text-white/80">
                  Build meaningful partnerships that expand opportunities,
                  strengthen communities and create sustainable impact.
                </p>

                <div className="mt-10 h-px w-full bg-white/10" />

                <div className="mt-8 flex items-center justify-between">
                  <span className="font-semibold text-accent-soft">
                    Start A Partnership
                  </span>

                  <ArrowRight
                    size={22}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </div>
            </button>
          </div>

          {/* Closing Quote */}

          <div className="mx-auto mt-24 max-w-3xl text-center">
            <div className="mx-auto mb-10 h-px w-40 bg-white/20" />

            <p className="text-2xl font-light italic leading-relaxed text-white/90">
              Together we can build a future where every child, every family and
              every community has the opportunity to thrive with dignity, hope
              and purpose.
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
