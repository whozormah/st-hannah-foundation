"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, PlayCircle } from "lucide-react";

interface ImpactStorySectionProps {
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  videoLink?: string;
  reverse?: boolean;
}

export default function ImpactStorySection({
  title,
  date,
  location,
  image,
  description,
  videoLink,
  reverse = false,
}: ImpactStorySectionProps) {
  return (
    <article
      className={`grid items-center gap-16 lg:grid-cols-2 ${
        reverse ? "lg:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Image */}

      <div className="group overflow-hidden rounded-[40px] shadow-xl">
        <div className="relative h-[520px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

          <div className="absolute bottom-8 left-8">
            <span className="rounded-full bg-[#D9A441] px-5 py-2 text-xs font-bold uppercase tracking-[3px] text-[#2E1B05]">
              Story Of Impact
            </span>
          </div>
        </div>
      </div>

      {/* Content */}

      <div className="max-w-xl">
        <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
          Community Impact
        </span>

        <h2 className="mt-5 text-4xl font-bold leading-tight text-[#1B1815] md:text-5xl">
          {title}
        </h2>

        <div className="mt-6 flex flex-wrap gap-6 text-sm font-medium text-[#844204]">
          <div className="flex items-center gap-2">
            <Calendar size={16} />
            {date}
          </div>

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            {location}
          </div>
        </div>

        <div className="mt-8 h-[3px] w-20 rounded-full bg-[#D9A441]" />

        <p className="mt-8 text-lg leading-9 text-gray-600">{description}</p>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/gallery"
            className="group inline-flex items-center gap-3 rounded-full bg-[#844204] px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-[#6D3503]"
          >
            View Gallery
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          {videoLink && (
            <Link
              href={videoLink}
              target="_blank"
              className="inline-flex items-center gap-3 rounded-full border-2 border-[#844204] px-8 py-4 font-semibold text-[#844204] transition hover:bg-[#844204] hover:text-white"
            >
              <PlayCircle size={18} />
              Watch Highlights
            </Link>
          )}
        </div>

        <div className="mt-12 rounded-[28px] bg-[#FAF7F2] p-8">
          <h3 className="text-2xl font-bold text-[#1B1815]">
            Why This Story Matters
          </h3>

          <div className="mt-5 h-[3px] w-14 rounded-full bg-[#D9A441]" />

          <p className="mt-6 leading-8 text-gray-600">
            Every outreach represents a real person, a real family and a real
            opportunity for lasting transformation. Together with our partners,
            volunteers and supporters, we continue creating stories of hope
            across our communities.
          </p>
        </div>
      </div>
    </article>
  );
}
