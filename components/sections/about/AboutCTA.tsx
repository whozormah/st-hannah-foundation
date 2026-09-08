"use client";

import { useState } from "react";
import { Heart, Users, Handshake, ArrowRight } from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";
import PartnerModal from "@/components/shared/PartnerModal";

export default function AboutCTA() {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-brand py-16 md:py-24 text-white">
        {/* Background */}

        <div className="absolute inset-0">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="container-custom relative z-10">
          {/* Heading */}

          <div className="mx-auto max-w-4xl text-center">
            <span className="font-semibold uppercase tracking-[6px] text-accent">
              Become Part Of The Story
            </span>

            <h2 className="mt-6 text-5xl font-bold leading-tight md:text-6xl">
              Together We Can{" "}
              <br />
              Transform More Lives
            </h2>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/85">
              Every act of generosity, every volunteer and every partnership
              helps restore dignity, strengthen families and create lasting
              opportunities across communities.
            </p>
          </div>

          {/* Cards */}

          <div className="mx-auto mt-20 grid max-w-7xl gap-8 lg:grid-cols-3">
            {/* Donate */}

            <button
              onClick={() => setShowDonationModal(true)}
              className="group rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:bg-white/10 hover:shadow-2xl"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-accent/20 bg-accent/10">
                <Heart size={38} className="text-accent" />
              </div>

              <h3 className="mt-8 text-3xl font-bold">Donate</h3>

              <p className="mt-5 leading-8 text-white/80">
                Help provide food, education, healthcare and opportunities that
                restore hope and transform lives.
              </p>

              <div className="mt-8 flex items-center gap-2 font-semibold text-accent">
                Support A Cause
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-2"
                />
              </div>
            </button>

            {/* Volunteer */}

            <a
              href="/volunteer"
              className="group rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:bg-white/10 hover:shadow-2xl"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-accent/20 bg-accent/10">
                <Users size={38} className="text-accent" />
              </div>

              <h3 className="mt-8 text-3xl font-bold">Volunteer</h3>

              <p className="mt-5 leading-8 text-white/80">
                Share your skills, passion and time to help create lasting
                change in the lives of children and families.
              </p>

              <div className="mt-8 flex items-center gap-2 font-semibold text-accent">
                Join Our Team
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-2"
                />
              </div>
            </a>

            {/* Partner */}

            <button
              onClick={() => setShowPartnerModal(true)}
              className="group rounded-[36px] border border-white/10 bg-white/5 p-6 sm:p-10 text-left backdrop-blur-md transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:bg-white/10 hover:shadow-2xl"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-accent/20 bg-accent/10">
                <Handshake size={38} className="text-accent" />
              </div>

              <h3 className="mt-8 text-3xl font-bold">Partner With Us</h3>

              <p className="mt-5 leading-8 text-white/80">
                Collaborate with us through strategic partnerships, sponsorships
                and initiatives that expand our impact.
              </p>

              <div className="mt-8 flex items-center gap-2 font-semibold text-accent">
                Become A Partner
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-2"
                />
              </div>
            </button>
          </div>

          {/* Closing */}

          <div className="mx-auto mt-20 max-w-3xl text-center">
            <p className="text-xl leading-9 text-white/80">
              Every contribution creates new opportunities, restores dignity and
              helps build stronger communities for generations to come.
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
