"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Program {
  slug: string;
  title: string;
  heroImage: string;
  excerpt: string;
}

export default function ProgramsFeatured() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("/data/programs.json")
      .then((res) => res.json())
      .then((data) => setPrograms(data.slice(0, 4)))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-32 bg-white">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Featured Programmes{" "}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Transforming Lives Through Meaningful Action
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            Our programmes are designed to restore dignity, create opportunity
            and strengthen communities through sustainable support and
            compassionate intervention.
          </p>
        </div>
        <div className="space-y-20">
          {programs.map((program, index) => (
            <div
              key={program.slug}
              className={`grid lg:grid-cols-2 gap-14 items-center ${
                index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div className="relative h-[450px] rounded-[32px] overflow-hidden shadow-xl">
                <Image
                  src={program.heroImage}
                  alt={program.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <span className="uppercase tracking-[4px] text-[#844204] font-semibold">
                  Programme Area
                </span>

                <h3 className="text-4xl font-bold mt-4">{program.title}</h3>

                <p className="mt-8 text-gray-600 leading-8">
                  {program.excerpt}
                </p>

                <Link
                  href={`/programs/${program.slug}`}
                  className="inline-flex items-center mt-8 bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6e3503] transition"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-20">
          <Link
            href="/programs"
            className="inline-flex items-center border border-[#844204] text-[#844204] px-8 py-4 rounded-xl font-semibold hover:bg-[#844204] hover:text-white transition"
          >
            Explore All Programmes
          </Link>
        </div>
      </div>
    </section>
  );
}
