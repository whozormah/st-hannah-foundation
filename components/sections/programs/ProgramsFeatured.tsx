import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import allPrograms from "@/public/data/programs.json";

interface Program {
  slug: string;
  title: string;
  heroImage: string;
  excerpt: string;
}

const programs: Program[] = allPrograms.slice(0, 4);

export default function ProgramsFeatured() {
  return (
    <section className="bg-white py-32">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto mb-24 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-[#844204]">
            Featured Programmes
          </span>

          <h2 className="mt-5 text-5xl font-bold text-[#1B1815] md:text-6xl">
            Stories Of Hope.
            <br />
            Programmes That Transform Lives.
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[#D9A441]" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            Every programme is intentionally designed to restore dignity,
            strengthen communities and create opportunities that produce lasting
            impact.
          </p>
        </div>

        {/* Featured Programmes */}

        <div className="space-y-28">
          {programs.map((program, index) => (
            <div
              key={program.slug}
              className={`grid items-center gap-16 lg:grid-cols-2 ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Image */}

              <div className="group relative overflow-hidden rounded-[40px] shadow-2xl">
                <div className="relative h-[520px]">
                  <Image
                    src={program.heroImage}
                    alt={program.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  <div className="absolute bottom-8 left-8 rounded-full bg-white/90 px-5 py-2 text-sm font-semibold uppercase tracking-[3px] text-[#844204] backdrop-blur-md">
                    Featured Programme
                  </div>
                </div>
              </div>

              {/* Content */}

              <div>
                <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
                  Programme Area
                </span>

                <h3 className="mt-5 text-5xl font-bold leading-tight text-[#1B1815]">
                  {program.title}
                </h3>

                <div className="mt-6 h-[3px] w-20 rounded-full bg-[#D9A441]" />

                <p className="mt-8 text-lg leading-9 text-gray-600">
                  {program.excerpt}
                </p>

                {/* Quote Card */}

                <div className="mt-10 rounded-[28px] border border-[#D9A441]/20 bg-[#FAF7F2] p-8">
                  <p className="italic leading-8 text-gray-600">
                    Every life transformed through this programme is a reminder
                    that compassion, when combined with action, creates lasting
                    change.
                  </p>
                </div>

                <Link
                  href={`/programs/${program.slug}`}
                  className="group mt-10 inline-flex items-center gap-3 rounded-full bg-[#844204] px-8 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#6D3503] hover:shadow-xl"
                >
                  Learn More
                  <ArrowRight
                    size={18}
                    className="transition duration-300 group-hover:translate-x-2"
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}

        <div className="mt-28 rounded-[40px] bg-[#FAF7F2] px-12 py-16 text-center">
          <span className="uppercase tracking-[5px] text-[#844204]">
            Explore More
          </span>

          <h3 className="mt-5 text-4xl font-bold text-[#1B1815]">
            Discover Every Programme Making A Difference
          </h3>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            From education and healthcare to humanitarian relief and economic
            empowerment, our programmes are creating opportunities and changing
            lives every day.
          </p>

          <Link
            href="/programs"
            className="group mt-10 inline-flex items-center gap-3 rounded-full border-2 border-[#844204] px-8 py-4 font-semibold text-[#844204] transition-all duration-300 hover:bg-[#844204] hover:text-white"
          >
            Explore All Programmes
            <ArrowRight
              size={18}
              className="transition duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
