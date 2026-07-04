"use client";

import Link from "next/link";
import {
  Camera,
  PlayCircle,
  ArrowRight,
  Heart,
  Users,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export default function ImpactArchive() {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Widows Supported",
      description: "Helping women rebuild their lives with dignity.",
    },
    {
      icon: GraduationCap,
      number: "15+",
      label: "Students Sponsored",
      description: "Creating educational opportunities for young people.",
    },
    {
      icon: Heart,
      number: "100+",
      label: "Families Supported",
      description: "Providing hope and practical assistance to families.",
    },
    {
      icon: Briefcase,
      number: "50+",
      label: "Businesses Empowered",
      description: "Supporting livelihoods through sustainable empowerment.",
    },
  ];

  return (
    <section className="bg-[#FAF7F2] py-32">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto mb-20 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-[#844204]">
            Continue Exploring
          </span>

          <h2 className="mt-5 text-5xl font-bold text-[#1B1815] md:text-6xl">
            Every Story Inspires
            <br />
            Another Story
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[#D9A441]" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            Our archive continues to grow as more lives are transformed through
            compassion, partnership and sustainable community development.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="group rounded-[36px] border border-gray-100 bg-white p-8 text-center shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/30 hover:shadow-2xl"
              >
                <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFF8EC] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#844204]">
                  <Icon
                    size={36}
                    className="text-[#844204] transition-all duration-500 group-hover:text-white"
                  />
                </div>

                <h3 className="text-5xl font-bold text-[#844204]">
                  {stat.number}
                </h3>

                <div className="mx-auto mt-5 h-[3px] w-12 rounded-full bg-[#D9A441]" />

                <h4 className="mt-5 text-xl font-bold text-[#1B1815]">
                  {stat.label}
                </h4>

                <p className="mt-4 leading-7 text-gray-600">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Archive Links */}

        <div className="mt-24 grid gap-10 lg:grid-cols-2">
          <Link
            href="/gallery"
            className="group overflow-hidden rounded-[40px] border border-gray-100 bg-white p-12 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/40 hover:shadow-2xl"
          >
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#FFF8EC] transition-all duration-500 group-hover:bg-[#844204]">
              <Camera
                size={42}
                className="text-[#844204] transition-all duration-500 group-hover:text-white"
              />
            </div>

            <span className="uppercase tracking-[4px] text-[#844204] font-semibold">
              Photo Gallery
            </span>

            <h3 className="mt-5 text-4xl font-bold text-[#1B1815]">
              Explore Our Gallery
            </h3>

            <p className="mt-6 text-lg leading-9 text-gray-600">
              Browse powerful moments captured during community outreach,
              educational programmes, humanitarian support and volunteer
              activities across our areas of impact.
            </p>

            <div className="mt-10 inline-flex items-center gap-3 font-semibold text-[#844204]">
              Explore Gallery
              <ArrowRight
                size={18}
                className="transition duration-300 group-hover:translate-x-2"
              />
            </div>
          </Link>

          <Link
            href="https://youtube.com"
            target="_blank"
            className="group overflow-hidden rounded-[40px] border border-gray-100 bg-white p-12 shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/40 hover:shadow-2xl"
          >
            <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-[28px] bg-[#FFF8EC] transition-all duration-500 group-hover:bg-[#844204]">
              <PlayCircle
                size={42}
                className="text-[#844204] transition-all duration-500 group-hover:text-white"
              />
            </div>

            <span className="uppercase tracking-[4px] text-[#844204] font-semibold">
              Video Highlights
            </span>

            <h3 className="mt-5 text-4xl font-bold text-[#1B1815]">
              Watch Lives Being Changed
            </h3>

            <p className="mt-6 text-lg leading-9 text-gray-600">
              Experience our outreach programmes, beneficiary testimonies,
              educational interventions and inspiring moments through our video
              collection.
            </p>

            <div className="mt-10 inline-flex items-center gap-3 font-semibold text-[#844204]">
              Watch Videos
              <ArrowRight
                size={18}
                className="transition duration-300 group-hover:translate-x-2"
              />
            </div>
          </Link>
        </div>

        {/* Closing */}

        <div className="mx-auto mt-24 max-w-5xl rounded-[40px] bg-white p-14 text-center shadow-xl">
          <span className="uppercase tracking-[5px] text-[#844204]">
            More Than Numbers
          </span>

          <h3 className="mt-5 text-4xl font-bold text-[#1B1815]">
            Every Statistic Represents A Changed Life
          </h3>

          <div className="mx-auto mt-6 h-[3px] w-20 rounded-full bg-[#D9A441]" />

          <p className="mt-8 text-lg leading-9 text-gray-600">
            Behind every outreach, every programme and every success story is a
            person whose future has been transformed through compassion,
            generosity and the unwavering commitment of our volunteers, partners
            and supporters.
          </p>
        </div>
      </div>
    </section>
  );
}
