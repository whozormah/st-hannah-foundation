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

const programs: Program[] = programsData;

export default function Causes() {
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  const openDonationModal = (programTitle: string) => {
    setSelectedProgram(programTitle);
    setIsDonationOpen(true);
  };

  return (
    <>
      <section className="py-28 bg-white">
        <div className="container-custom">
          {/* Header */}

          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="uppercase tracking-[5px] text-brand font-semibold">
              Our Programs
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-ink">
              Creating Opportunities. Restoring Hope.
            </h2>

            <p className="mt-6 text-gray-700 text-lg leading-8">
              Through targeted interventions and sustainable initiatives, we
              provide support, empowerment and opportunities that help
              individuals, families and communities thrive.
            </p>
          </div>

          {/* Programs Grid */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
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

          {/* Bottom CTA */}

          <div className="text-center mt-16">
            <Link
              href="/programs"
              className="inline-flex items-center gap-3 bg-accent hover:bg-[#c8922f] text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300"
            >
              Explore All Programs
              <ArrowRight size={20} />
            </Link>
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
