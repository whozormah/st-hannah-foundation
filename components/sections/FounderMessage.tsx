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
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            {founder.badge}{" "}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            {founder.title}
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg leading-8">
            Discover the vision, inspiration and legacy that gave birth to St.
            Hannah Foundation and continues to guide its mission today.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Founder Image */}

          <div className="bg-[#FAF7F2] rounded-[32px] overflow-hidden shadow-lg">
            <div className="relative h-[650px]">
              <Image
                src={founder.image}
                alt={founder.name}
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Founder Content */}

          <div>
            <span className="inline-flex px-4 py-2 rounded-full bg-[#844204]/10 text-[#844204] font-semibold text-sm">
              {founder.position}
            </span>

            <h3 className="text-4xl font-bold mt-6">{founder.name}</h3>

            <p className="text-[#844204] font-medium mt-2">
              {founder.organization}
            </p>

            <blockquote className="mt-8 text-2xl leading-relaxed italic text-[#844204] border-l-4 border-[#D9A441] pl-6">
              "{founder.quote}"
            </blockquote>

            <div className="space-y-6 mt-10 text-gray-600 leading-8">
              {founder.message.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
