"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Users, Handshake, ArrowRight } from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";
import PartnerModal from "@/components/shared/PartnerModal";

export default function ImpactCTA() {
  const [isDonateOpen, setIsDonateOpen] = useState(false);
  const [isPartnerOpen, setIsPartnerOpen] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-[#844204] py-32 text-white">
        {/* Background Glow */}

        <div className="absolute inset-0">
          <div className="absolute -left-32 -top-32 h-[520px] w-[520px] rounded-full bg-[#D9A441]/10 blur-3xl" />

          <div className="absolute -bottom-32 -right-32 h-[520px] w-[520px] rounded-full bg-[#D9A441]/10 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Heading */}

          <div className="mx-auto max-w-5xl text-center">
            <span className="font-semibold uppercase tracking-[6px] text-[#F4D06F]">
              Become Part Of The Story
            </span>

            <h2 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
              The Next Story Of Hope
              <br />
              Could Begin With You
            </h2>

            <div className="mx-auto mt-8 h-[3px] w-24 rounded-full bg-[#D9A441]" />

            <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-white/85">
              Every donation, every volunteer and every partnership makes it
              possible to restore dignity, strengthen families and create new
              opportunities for those who need them most.
            </p>
          </div>

          {/* Statistics */}

          <div className="mx-auto mt-20 grid max-w-5xl gap-10 md:grid-cols-3">
            <div className="text-center">
              <h3 className="text-6xl font-bold text-[#D9A441]">500+</h3>

              <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#D9A441]" />

              <p className="mt-5 text-lg text-white/85">Widows Supported</p>
            </div>

            <div className="text-center">
              <h3 className="text-6xl font-bold text-[#D9A441]">100+</h3>

              <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#D9A441]" />

              <p className="mt-5 text-lg text-white/85">Families Reached</p>
            </div>

            <div className="text-center">
              <h3 className="text-6xl font-bold text-[#D9A441]">15+</h3>

              <div className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-[#D9A441]" />

              <p className="mt-5 text-lg text-white/85">Students Sponsored</p>
            </div>
          </div>

          {/* Cards */}

          <div className="mt-24 grid gap-8 lg:grid-cols-3">
            {/* Donate */}

            <button
              onClick={() => setIsDonateOpen(true)}
              className="group rounded-[36px] border border-white/10 bg-white/5 p-10 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/40 hover:bg-white/10 hover:shadow-2xl"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#D9A441]/10 transition-all duration-500 group-hover:bg-[#D9A441]">
                <Heart
                  size={38}
                  className="text-[#D9A441] transition-all duration-500 group-hover:text-[#2E1B05]"
                />
              </div>

              <h3 className="text-3xl font-bold">Donate</h3>

              <p className="mt-5 leading-8 text-white/80">
                Help fund programmes that provide education, healthcare,
                empowerment and sustainable support to vulnerable communities.
              </p>

              <div className="mt-10 inline-flex items-center gap-3 font-semibold text-[#F4D06F]">
                Support A Cause
                <ArrowRight
                  size={18}
                  className="transition duration-300 group-hover:translate-x-2"
                />
              </div>
            </button>

            {/* Volunteer */}

            <Link
              href="/volunteer"
              className="group rounded-[36px] border border-white/10 bg-white/5 p-10 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/40 hover:bg-white/10 hover:shadow-2xl"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#D9A441]/10 transition-all duration-500 group-hover:bg-[#D9A441]">
                <Users
                  size={38}
                  className="text-[#D9A441] transition-all duration-500 group-hover:text-[#2E1B05]"
                />
              </div>

              <h3 className="text-3xl font-bold">Volunteer</h3>

              <p className="mt-5 leading-8 text-white/80">
                Use your time, experience and passion to create lasting impact
                in the lives of children, widows and families.
              </p>

              <div className="mt-10 inline-flex items-center gap-3 font-semibold text-[#F4D06F]">
                Join Our Team
                <ArrowRight
                  size={18}
                  className="transition duration-300 group-hover:translate-x-2"
                />
              </div>
            </Link>

            {/* Partner */}

            <button
              onClick={() => setIsPartnerOpen(true)}
              className="group rounded-[36px] border border-white/10 bg-white/5 p-10 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/40 hover:bg-white/10 hover:shadow-2xl"
            >
              <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#D9A441]/10 transition-all duration-500 group-hover:bg-[#D9A441]">
                <Handshake
                  size={38}
                  className="text-[#D9A441] transition-all duration-500 group-hover:text-[#2E1B05]"
                />
              </div>

              <h3 className="text-3xl font-bold">Partner With Us</h3>

              <p className="mt-5 leading-8 text-white/80">
                Collaborate with us through sponsorships, corporate partnerships
                and strategic initiatives that expand our reach.
              </p>

              <div className="mt-10 inline-flex items-center gap-3 font-semibold text-[#F4D06F]">
                Become A Partner
                <ArrowRight
                  size={18}
                  className="transition duration-300 group-hover:translate-x-2"
                />
              </div>
            </button>
          </div>

          {/* Closing */}

          <div className="mx-auto mt-24 max-w-4xl text-center">
            <p className="text-xl leading-9 text-white/85">
              The stories you&apos;ve read today are only the beginning. Together, we
              can create many more stories of hope, resilience and lasting
              transformation for generations to come.
            </p>
          </div>
        </div>
      </section>

      <DonationModal
        isOpen={isDonateOpen}
        onClose={() => setIsDonateOpen(false)}
      />

      <PartnerModal
        isOpen={isPartnerOpen}
        onClose={() => setIsPartnerOpen(false)}
      />
    </>
  );
}
