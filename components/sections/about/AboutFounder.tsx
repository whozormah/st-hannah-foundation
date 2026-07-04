"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface FounderData {
  badge: string;
  title: string;
  name: string;
  position: string;
  organization: string;
  image: string;
  quote: string;
  message: string[];
}

export default function AboutFounder() {
  const [founder, setFounder] = useState<FounderData | null>(null);

  useEffect(() => {
    fetch("/data/homepage/founder.json")
      .then((res) => res.json())
      .then((data) => setFounder(data))
      .catch((err) => console.error(err));
  }, []);

  if (!founder) return null;

  return (
    <section className="bg-[#FAF7F2] py-32">
      <div className="container-custom">
        {/* Section Heading */}

        <div className="mx-auto mb-24 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-[#844204]">
            The Vision Behind The Foundation
          </span>

          <h2 className="mt-5 text-5xl font-bold text-[#1B1815] md:text-6xl">
            A Story Rooted In Compassion
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[#D9A441]" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            Every movement begins with a story. St. Hannah Foundation was born
            from a deep commitment to serving others, restoring hope and helping
            vulnerable individuals discover new possibilities for their future.
          </p>
        </div>

        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Image */}

          <div className="relative">
            <div className="overflow-hidden rounded-[40px] bg-white shadow-2xl">
              <div className="relative h-[760px]">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-contain p-8"
                />
              </div>
            </div>

            {/* Floating Quote Card */}

            <div className="absolute -bottom-10 -right-10 max-w-sm rounded-[28px] border border-[#D9A441]/20 bg-white p-8 shadow-2xl">
              <span className="text-6xl font-serif text-[#D9A441]/20">"</span>

              <p className="-mt-5 italic leading-8 text-gray-600">
                {founder.quote}
              </p>
            </div>
          </div>

          {/* Content */}

          <div>
            <span className="inline-flex rounded-full bg-[#844204]/10 px-5 py-2 text-sm font-semibold text-[#844204]">
              {founder.badge}
            </span>

            <h3 className="mt-6 text-5xl font-bold leading-tight text-[#1B1815]">
              {founder.name}
            </h3>

            <p className="mt-3 text-xl font-semibold text-[#9A6A17]">
              {founder.position}
            </p>

            <div className="mt-8 h-[3px] w-20 rounded-full bg-[#D9A441]" />

            <div className="mt-10 space-y-8 text-lg leading-9 text-gray-600">
              {founder.message.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Signature Card */}

            <div className="mt-14 rounded-[30px] border border-[#D9A441]/20 bg-white p-8 shadow-lg">
              <h4 className="text-2xl font-bold text-[#844204]">
                {founder.name}
              </h4>

              <p className="mt-2 font-semibold text-[#9A6A17]">
                {founder.position}
              </p>

              <div className="mt-6 h-px w-16 bg-[#D9A441]" />

              <p className="mt-6 italic leading-8 text-gray-600">
                "{founder.quote}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
