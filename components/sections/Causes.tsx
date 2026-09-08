"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DonationModal from "@/components/shared/DonationModal";
import programsData from "@/public/data/programs.json";

interface Program {
  slug: string;
  title: string;
  heroImage: string;
  excerpt: string;
}

const ALL_PROGRAMMES = programsData.length;

// A homepage teaser; /programs carries the full list.
const programs: Program[] = programsData.slice(0, 4);

export default function Causes() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  const openDonationModal = (programTitle: string) => {
    setSelectedProgram(programTitle);
    setIsDonationOpen(true);
  };

  return (
    <>
      <section className="bg-white py-24">
        <div className="container-custom">
          {/* Header */}

          <div className="mb-12 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
                Our Programmes
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
                Creating opportunities. Restoring hope.
              </h2>

              <p className="mt-5 text-lg leading-9 text-gray-700">
                Targeted, sustainable initiatives that help individuals,
                families and communities thrive.
              </p>
            </div>

            <Link
              href="/programs"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-brand px-7 py-3 font-semibold text-brand transition-all duration-300 hover:bg-brand hover:text-white"
            >
              All {ALL_PROGRAMMES} programmes
              <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>

          {/* Programs Grid */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {programs.map((program) => (
              <div
                key={program.slug}
                className="group bg-white rounded-[28px] overflow-hidden border border-accent/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}

                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={program.heroImage}
                    alt={program.title}
                    fill
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white text-2xl font-bold">
                      {program.title}
                    </h3>
                  </div>
                </div>

                {/* Content */}

                <div className="p-6">
                  <p className="text-gray-700 leading-7 mb-6">
                    {program.excerpt}
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => openDonationModal(program.title)}
                      className="bg-brand hover:bg-brand-light text-white text-center py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                    >
                      Support This Program
                    </button>

                    <Link
                      href={`/programs/${program.slug}`}
                      className="flex items-center justify-center gap-2 border border-brand text-brand hover:bg-brand hover:text-white py-3 rounded-xl font-medium transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <DonationModal
        isOpen={isDonationOpen}
        programName={selectedProgram}
        onClose={() => {
          setIsDonationOpen(false);
          setSelectedProgram("");
        }}
      />
    </>
  );
}
