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
    <section className="py-32 bg-white">
      <div className="container-custom">
        {/* Section Heading */}

        <div className="max-w-4xl mx-auto text-center mb-24">
          <span className="uppercase tracking-[6px] text-[#844204] font-semibold">
            {founder.badge}
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-[#1B1815]">
            {founder.title}
          </h2>

          <p className="max-w-3xl mx-auto mt-7 text-lg leading-9 text-gray-600">
            Discover the vision, inspiration and legacy that gave birth to St.
            Hannah Foundation and continues to guide its mission today.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Founder Image */}

          <div className="group relative">
            {/* Decorative Glow */}

            <div className="absolute -inset-6 rounded-[42px] bg-[radial-gradient(circle_at_top,#F5E8D2_0%,#FAF7F2_45%,transparent_80%)]" />

            {/* Decorative Border */}

            <div className="absolute inset-0 rounded-[36px] border border-[#D9A441]/20 transition-all duration-700 group-hover:border-[#D9A441] group-hover:scale-[1.01]" />

            <div className="relative overflow-hidden rounded-[36px] bg-[#FAF7F2] shadow-xl transition-all duration-700 group-hover:shadow-2xl">
              <div className="relative h-[760px]">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  priority
                  className="
                    object-cover
                    object-top
                    grayscale
                    transition-all
                    duration-1000
                    ease-out
                    group-hover:grayscale-0
                    group-hover:scale-[1.05]
                  "
                />
              </div>
            </div>
          </div>

          {/* Founder Content */}

          <div>
            <span className="inline-flex rounded-full bg-[#844204]/10 px-5 py-2 text-sm font-semibold text-[#844204]">
              {founder.position}
            </span>

            <h3 className="mt-7 text-4xl md:text-5xl font-bold text-[#1B1815] leading-tight">
              {founder.name}
            </h3>

            <p className="mt-3 text-lg font-medium text-[#844204]">
              {founder.organization}
            </p>

            <blockquote className="relative mt-12 border-l-4 border-[#D9A441] pl-8 text-2xl italic leading-relaxed text-[#844204]">
              <span className="absolute -left-5 -top-12 text-[120px] leading-none text-[#D9A441]/10 font-serif">
                "
              </span>

              {founder.quote}
            </blockquote>

            <div className="mt-12 space-y-8 text-[17px] leading-9 text-gray-600">
              {founder.message.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 flex items-center gap-4">
              <div className="h-px w-16 bg-[#D9A441]" />

              <p className="uppercase tracking-[4px] text-sm font-semibold text-[#844204]">
                Serving with Compassion, Dignity & Hope
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
