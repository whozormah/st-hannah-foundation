"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Handshake,
  Heart,
  Users,
  type LucideIcon,
} from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";
import PartnerModal from "@/components/shared/PartnerModal";
import Rays from "@/components/shared/Rays";
import TitleLines from "@/components/shared/TitleLines";
import { SECTION_COPY, type SectionCopy } from "@/lib/section-copy";

/* The homepage's closing invitation, redesigned to answer the Vision and
   Mission section (CR-016): the invitation and the Foundation's words on the
   left, and the three ways to join on the right as doorways, giving first and
   in gold. The rays from the section labels rise, full size, as a sunrise
   behind the closing line. Every word is the site's own, unchanged. */

type Way = {
  icon: LucideIcon;
  label: string;
  title: string;
  text: string;
  action: string;
  featured?: boolean;
};

const DONATE: Way = {
  icon: Heart,
  label: "Give Hope",
  title: "Donate",
  text: "Support programmes that provide education, healthcare, food assistance and long term empowerment for vulnerable children and families.",
  action: "Make A Difference",
  featured: true,
};

const VOLUNTEER: Way = {
  icon: Users,
  label: "Serve",
  title: "Volunteer",
  text: "Share your time, skills and passion with communities that need encouragement, care and practical support.",
  action: "Volunteer With Us",
};

const PARTNER: Way = {
  icon: Handshake,
  label: "Collaborate",
  title: "Partner With Us",
  text: "Build meaningful partnerships that expand opportunities, strengthen communities and create sustainable impact.",
  action: "Start A Partnership",
};

const DOORWAY =
  "group reveal-rise relative block w-full overflow-hidden rounded-[32px] p-7 text-left transition-colors duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft sm:p-9";

function doorway(way: Way) {
  return way.featured
    ? `${DOORWAY} bg-accent-soft text-ink shadow-[0_40px_90px_-40px_rgba(245,210,122,0.55)] hover:bg-[#f8dc94]`
    : `${DOORWAY} border border-white/10 bg-white/[0.04] text-white hover:border-accent/40 hover:bg-white/[0.08]`;
}

function WayBody({ way }: { way: Way }) {
  const Icon = way.icon;
  const tone = way.featured ? "text-brand-dark" : "text-accent-soft";

  return (
    <span className="flex flex-col gap-6 sm:flex-row sm:items-start">
      <span
        aria-hidden
        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${
          way.featured ? "bg-ink/10" : "bg-accent/10"
        } ${tone}`}
      >
        <Icon size={30} />
      </span>

      <span className="block flex-1">
        <span className={`block text-xs font-semibold uppercase tracking-[4px] ${tone}`}>
          {way.label}
        </span>

        {/* A span, not a heading: headings are not allowed inside buttons. */}
        <span className="mt-2 block font-display text-3xl font-bold">{way.title}</span>

        <span
          className={`mt-4 block max-w-lg leading-8 ${
            way.featured ? "text-ink/75" : "text-white/75"
          }`}
        >
          {way.text}
        </span>

        <span className={`mt-6 inline-flex items-center gap-2 font-semibold ${tone}`}>
          {way.action}
          <ArrowRight
            aria-hidden
            size={20}
            className="transition-transform duration-300 group-hover:translate-x-1.5 sm:hidden"
          />
        </span>
      </span>

      {/* On wider screens the arrow sits apart, and turns towards the reader. */}
      <span
        aria-hidden
        className={`hidden h-14 w-14 shrink-0 items-center justify-center rounded-full transition-transform duration-500 group-hover:rotate-45 sm:flex ${
          way.featured ? "bg-ink text-accent-soft" : "border border-white/15 text-white"
        }`}
      >
        <ArrowUpRight size={24} />
      </span>
    </span>
  );
}

function Sunrise() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 420"
      className="pointer-events-none absolute -bottom-12 left-1/2 w-[1100px] max-w-none -translate-x-1/2 text-accent/[0.12]"
    >
      <circle cx="400" cy="420" r="120" fill="currentColor" />
      {Array.from({ length: 15 }, (_, i) => -70 + i * 10).map((angle) => (
        <line
          key={angle}
          x1="400"
          y1="260"
          x2="400"
          y2="30"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          transform={`rotate(${angle} 400 420)`}
        />
      ))}
    </svg>
  );
}

export default function ImpactCTA({
  eyebrow = SECTION_COPY.callToAction.eyebrow,
  title = SECTION_COPY.callToAction.title,
  description = SECTION_COPY.callToAction.description,
}: SectionCopy) {
  const [showDonationModal, setShowDonationModal] = useState(false);
  const [showPartnerModal, setShowPartnerModal] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-[#6F3403] via-[#4A2303] to-[#2A1703] py-16 text-white md:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.18),transparent_65%)]"
        />
        <Sunrise />

        <div className="container-custom relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
            {/* The invitation */}
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-28">
                {eyebrow && (
                  <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-accent-soft">
                    <Rays className="h-5 w-8 shrink-0 text-accent" />
                    {eyebrow}
                  </p>
                )}

                <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
                  <TitleLines text={title} />
                </h2>

                {description && (
                  <p className="mt-8 text-lg leading-9 text-white/80">
                    {description}
                  </p>
                )}

                <figure className="mt-12">
                  <blockquote className="font-display text-2xl italic leading-relaxed text-white/90">
                    &quot;Hope grows wherever compassion becomes action.&quot;
                  </blockquote>

                  <figcaption className="mt-4 flex items-center gap-4 text-sm uppercase tracking-[4px] text-accent-soft">
                    <span aria-hidden className="h-px w-10 bg-accent-soft/60" />
                    St. Hannah Foundation
                  </figcaption>
                </figure>
              </div>
            </div>

            {/* The three ways to join */}
            <div className="grid content-start gap-5 lg:col-span-7">
              <button
                type="button"
                onClick={() => setShowDonationModal(true)}
                className={doorway(DONATE)}
              >
                <WayBody way={DONATE} />
              </button>

              <Link href="/volunteer" className={doorway(VOLUNTEER)}>
                <WayBody way={VOLUNTEER} />
              </Link>

              <button
                type="button"
                onClick={() => setShowPartnerModal(true)}
                className={doorway(PARTNER)}
              >
                <WayBody way={PARTNER} />
              </button>
            </div>
          </div>

          <p className="mx-auto mt-20 max-w-3xl text-center font-display text-2xl italic leading-relaxed text-white/90 md:mt-28 md:text-3xl">
            Together we can build a future where every child, every family and
            every community has the opportunity to thrive with dignity, hope
            and purpose.
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
