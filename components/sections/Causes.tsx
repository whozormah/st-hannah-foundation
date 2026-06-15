"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import DonationModal from "@/components/shared/DonationModal";

interface Program {
  title: string;
  image: string;
  description: string;
  link: string;
}

export default function Causes() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isDonationOpen, setIsDonationOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState("");

  useEffect(() => {
    fetch("/data/programs/programs.json")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error(err));
  }, []);

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
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Our Programs
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4 text-[#1B1815]">
              Creating Opportunities. Restoring Hope.
            </h2>

            <p className="mt-6 text-gray-600 text-lg leading-8">
              Through targeted interventions and sustainable initiatives, we
              provide support, empowerment and opportunities that help
              individuals, families and communities thrive.
            </p>
          </div>

          {/* Programs Grid */}

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
            {programs.map((program, index) => (
              <div
                key={index}
                className="group bg-white rounded-[28px] overflow-hidden border border-[#D9A441]/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                {/* Image */}

                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={program.image}
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
                  <p className="text-gray-600 leading-7 mb-6">
                    {program.description}
                  </p>

                  <div className="flex flex-col gap-3">
                    <button
                      onClick={() => openDonationModal(program.title)}
                      className="bg-[#844204] hover:bg-[#A85A12] text-white text-center py-3 rounded-xl font-medium transition-all duration-300 hover:scale-[1.02]"
                    >
                      Support This Program
                    </button>

                    <Link
                      href={program.link}
                      className="flex items-center justify-center gap-2 border border-[#844204] text-[#844204] hover:bg-[#844204] hover:text-white py-3 rounded-xl font-medium transition-all duration-300"
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
              className="inline-flex items-center gap-3 bg-[#D9A441] hover:bg-[#c8922f] text-black px-8 py-4 rounded-xl font-semibold transition-all duration-300"
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
