import Link from "next/link";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  HandCoins,
  HeartHandshake,
  Shield,
  Stethoscope,
  Users,
  Wrench,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import programsData from "@/public/data/programs.json";

interface Program {
  slug: string;
  title: string;
  excerpt: string;
  icon: string;
}

// Keyed to the icon names actually used in programs.json. The previous map
// imported Wallet, ShieldCheck and Globe, which no programme asks for, and
// omitted HandCoins, Shield and Building2, which three do; a guard hid the
// failure so Financial Aid, Support Our Men and Community Outreach rendered
// an empty circle.
const ICONS: Record<string, LucideIcon> = {
  GraduationCap,
  HeartHandshake,
  Stethoscope,
  Users,
  HandCoins,
  Shield,
  Wrench,
  Building2,
};

const programs: Program[] = programsData;

export default function ProgramsAreas() {
  return (
    <section className="bg-cream py-24">
      <div className="container-custom">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
              Areas Of Impact
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              Creating change through purposeful action
            </h2>

            <p className="mt-5 text-lg leading-9 text-gray-700">
              Each programme is designed around a real need, and each one is
              still running today.
            </p>
          </div>

          <p className="shrink-0 text-gray-500">
            {programs.length} programmes
          </p>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program) => {
            const Icon = ICONS[program.icon] ?? Sparkles;

            return (
              <li key={program.slug} className="h-full">
                <Link
                  href={`/programs/${program.slug}`}
                  className="group flex h-full flex-col rounded-[24px] border border-accent/15 bg-white p-7 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:shadow-xl"
                >
                  <span
                    aria-hidden
                    className="flex h-16 w-16 items-center justify-center rounded-2xl bg-cream-warm text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white"
                  >
                    <Icon size={30} />
                  </span>

                  <h3 className="mt-7 text-xl font-bold leading-tight text-ink">
                    {program.title}
                  </h3>

                  <p className="mt-4 flex-1 leading-8 text-gray-700">
                    {program.excerpt}
                  </p>

                  <span className="mt-7 inline-flex items-center gap-2 font-semibold text-brand">
                    Learn more
                    <ArrowRight
                      size={16}
                      aria-hidden
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
