import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getFoundation } from "@/lib/cms";
import Rays from "@/components/shared/Rays";

interface FoundationData {
  badge: string;
  title: string;
  description: string;
  vision: string[];
  mission: string[];
}

/* The Foundation's introduction, vision and mission (CR-014, redesigned in
   CR-028 for longer statements): the introduction opens with a drop cap, and
   the vision and mission stand side by side across the full width, one light
   and one dark, over a sunrise drawn from the section's own rays. Each shows
   its opening paragraph; the rest is on the About page. Every word is the
   Foundation's, from About the Foundation in the CMS. */

function Sunrise() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 800 300"
      className="pointer-events-none absolute -bottom-4 left-1/2 w-[1400px] max-w-none -translate-x-1/2 text-accent/25"
    >
      <circle cx="400" cy="300" r="86" fill="currentColor" />
      {Array.from({ length: 13 }, (_, i) => -60 + i * 10).map((angle) => (
        <line
          key={angle}
          x1="400"
          y1="190"
          x2="400"
          y2="20"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
          transform={`rotate(${angle} 400 300)`}
        />
      ))}
    </svg>
  );
}

export default async function VisionMission() {
  const foundation: FoundationData = await getFoundation();

  return (
    <section className="relative overflow-hidden bg-cream py-16 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.18),transparent_65%)]"
      />
      <Sunrise />

      <div className="container-custom relative">
        {/* The introduction */}
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-brand">
            <Rays />
            {foundation.badge}
          </p>

          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
            {foundation.title}
          </h2>

          <div aria-hidden className="mt-8 h-[3px] w-20 rounded-full bg-gradient-to-r from-brand to-accent" />

          <p className="mt-8 text-lg leading-9 text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-brand">
            {foundation.description}
          </p>
        </div>

        {/* Vision and mission, side by side */}
        <div className="mt-14 grid gap-6 lg:mt-20 lg:grid-cols-2 lg:gap-8">
          <article className="reveal-rise relative flex flex-col overflow-hidden rounded-[36px] border border-accent/25 bg-white px-7 pb-10 pt-9 shadow-[0_40px_90px_-50px_rgba(132,66,4,0.5)] sm:px-12 sm:pb-12 sm:pt-11">
            <h3 className="relative inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-brand">
              <Rays className="h-5 w-8 shrink-0 text-accent" />
              Our Vision
            </h3>

            <p className="relative mt-7 font-display text-2xl italic leading-[1.45] text-ink sm:text-3xl">
              {foundation.vision[0]}
            </p>

            {/* The rest of the statement is on the About page (CR-028). */}
            {foundation.vision.length > 1 && (
              <Link
                href="/about#our-vision"
                className="relative mt-auto inline-flex w-fit items-center gap-2 pt-8 font-semibold text-brand underline-offset-4 hover:underline"
              >
                Read our full vision
                <ArrowRight aria-hidden size={18} />
              </Link>
            )}
          </article>

          <article className="reveal-rise relative flex flex-col overflow-hidden rounded-[36px] bg-gradient-to-br from-[#2E1B05] via-brand-dark to-brand px-7 pb-10 pt-9 text-white shadow-[0_40px_90px_-40px_rgba(46,27,5,0.7)] sm:px-12 sm:pb-12 sm:pt-11">
            <h3 className="relative inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-accent-soft">
              <Rays className="h-5 w-8 shrink-0 text-accent" />
              Our Mission
            </h3>

            <p className="relative mt-7 font-display text-2xl leading-[1.45] sm:text-3xl">
              {foundation.mission[0]}
            </p>

            {foundation.mission.length > 1 && (
              <Link
                href="/about#our-mission"
                className="relative mt-auto inline-flex w-fit items-center gap-2 pt-8 font-semibold text-accent-soft underline-offset-4 hover:underline"
              >
                Read our full mission
                <ArrowRight aria-hidden size={18} />
              </Link>
            )}
          </article>
        </div>
      </div>
    </section>
  );
}
