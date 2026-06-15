"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function ProgramsAreas() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("/data/programs.json")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-32 bg-[#FAF7F2]">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Areas Of Impact{" "}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Creating Change Through Purposeful Action
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8 max-w-3xl mx-auto">
            Through targeted programmes and community-driven initiatives, St.
            Hannah Foundation restores hope, strengthens families and empowers
            communities to build brighter futures.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {programs.map((program) => {
            const Icon = iconMap[program.icon as keyof typeof iconMap];

            return (
              <Link
                key={program.slug}
                href={`/programs/${program.slug}`}
                className="group bg-white rounded-[32px] p-8 border border-gray-100 hover:border-[#D9A441]/40 hover:-translate-y-3 hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
                  {Icon && <Icon size={30} className="text-[#844204]" />}
                </div>

                <h3 className="text-2xl font-bold leading-tight">
                  {program.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7 flex-grow">
                  {program.excerpt}
                </p>

                <div className="mt-8 flex items-center gap-2 text-[#844204] font-semibold">
                  Learn More
                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-1 transition"
                  />
                </div>
              </Link>
            );
          })}
        </div>
        <div className="max-w-4xl mx-auto text-center mt-24">
          <h3 className="text-3xl md:text-4xl font-bold text-[#844204]">
            Every Programme Begins With A Need
          </h3>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            Whether supporting education, empowering widows, providing medical
            assistance, strengthening families or creating opportunities for
            skilled labourers, our mission remains the same — restoring dignity,
            creating opportunities and transforming lives.
          </p>
        </div>
      </div>
    </section>
  );
}
