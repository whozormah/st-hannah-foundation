import Link from "next/link";

import programsData from "@/public/data/programs.json";

import {
  GraduationCap,
  HeartHandshake,
  Users,
  Wallet,
  Wrench,
  Globe,
  Stethoscope,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface Program {
  slug: string;
  title: string;
  excerpt: string;
  icon: string;
}

const iconMap = {
  GraduationCap,
  HeartHandshake,
  Users,
  Wallet,
  Wrench,
  Globe,
  Stethoscope,
  ShieldCheck,
};

const programs: Program[] = programsData;

export default function ProgramsAreas() {


  return (
    <section className="bg-cream py-32">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto mb-20 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-brand">
            Areas Of Impact
          </span>

          <h2 className="mt-5 text-5xl font-bold text-ink md:text-6xl">
            Creating Change Through
            <br />
            Purposeful Action
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-accent" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-700">
            Through targeted programmes and community-driven initiatives, St.
            Hannah Foundation restores hope, strengthens families and empowers
            communities to build brighter futures.
          </p>
        </div>

        {/* Featured Banner */}

        <div className="relative mb-20 overflow-hidden rounded-[40px] bg-gradient-to-r from-brand via-[#9A5A12] to-[#B27425] px-12 py-16 text-white shadow-2xl">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative mx-auto max-w-4xl text-center">
            <span className="uppercase tracking-[5px] text-[#F4D06F]">
              Our Commitment
            </span>

            <h3 className="mt-5 text-4xl font-bold leading-tight">
              Every Programme Exists To Restore Hope
              <br />
              And Create Lasting Change
            </h3>

            <p className="mt-8 text-lg leading-9 text-white/85">
              Every initiative is intentionally designed to meet real needs,
              strengthen families, empower communities and create sustainable
              opportunities that continue long after an outreach has ended.
            </p>
          </div>
        </div>

        {/* Divider */}

        <div className="mx-auto mb-16 h-[3px] w-24 rounded-full bg-accent" />

        {/* Programme Cards */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {programs.map((program) => {
            const Icon = iconMap[program.icon as keyof typeof iconMap];

            return (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group flex flex-col rounded-[36px] border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:shadow-2xl"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-cream-warm transition-all duration-500 group-hover:scale-110 group-hover:bg-brand">
                  {Icon && (
                    <Icon
                      size={36}
                      className="text-brand transition-all duration-500 group-hover:text-white"
                    />
                  )}
                </div>

                <h3 className="text-2xl font-bold leading-tight text-ink">
                  {program.title}
                </h3>

                <p className="mt-5 flex-grow leading-8 text-gray-700">
                  {program.excerpt}
                </p>

                <div className="mt-10 flex items-center gap-2 font-semibold text-brand">
                  Learn More
                  <ArrowRight
                    size={18}
                    className="transition duration-300 group-hover:translate-x-2"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Closing Statement */}

        <div className="mx-auto mt-24 max-w-5xl rounded-[40px] bg-white p-14 text-center shadow-xl">
          <span className="uppercase tracking-[5px] text-brand">
            Why It Matters
          </span>

          <h3 className="mt-5 text-4xl font-bold text-ink">
            Lasting Impact Starts With Intentional Action
          </h3>

          <div className="mx-auto mt-6 h-[3px] w-20 rounded-full bg-accent" />

          <p className="mt-8 text-lg leading-9 text-gray-700">
            Behind every programme is a person, a family or a community waiting
            for an opportunity to thrive. Through sustainable interventions,
            compassionate service and meaningful partnerships, we continue to
            restore dignity, strengthen resilience and create brighter futures
            one life at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
