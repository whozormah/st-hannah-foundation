"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface Volunteer {
  name: string;
  role: string;
  image: string;
}

export default function AboutVolunteers() {
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);

  useEffect(() => {
    fetch("/data/volunteers.json")
      .then((res) => res.json())
      .then((data) => setVolunteers(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-32 bg-[#FAF7F2]">
      <div className="container-custom">
        {/* Header */}

        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Volunteer Leadership Team
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            The Heartbeat Of Our Mission
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg leading-8">
            Behind every outreach, intervention and community programme is a
            dedicated team of volunteers whose passion, compassion and service
            help transform lives and strengthen communities.
          </p>
        </div>

        {/* Message Banner */}

        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#844204] to-[#A85A12] rounded-[32px] p-10 md:p-14 mb-20 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold">
            Volunteers Make The Difference
          </h3>

          <p className="mt-6 text-white/90 text-lg leading-8 max-w-3xl mx-auto">
            Every outreach, every visit, every act of kindness and every life
            transformed is made possible through individuals who choose to serve
            others with dedication, humility and love.
          </p>
        </div>

        {/* Volunteer Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer.name}
              className="bg-white rounded-[32px] overflow-hidden hover:-translate-y-3 hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-[350px] bg-white flex items-end justify-center">
                <Image
                  src={volunteer.image}
                  alt={volunteer.name}
                  fill
                  className="object-contain p-6"
                />
              </div>

              <div className="p-8 text-center">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#FAF7F2] text-[#844204] text-xs font-semibold mb-5">
                  Volunteer Leader
                </span>

                <h3 className="text-2xl font-bold leading-tight">
                  {volunteer.name}
                </h3>

                <p className="mt-3 text-[#844204] font-medium">
                  {volunteer.role}
                </p>

                <div className="w-12 h-1 bg-[#D9A441] mx-auto mt-6 rounded-full" />

                <p className="mt-5 text-gray-600 text-sm leading-7">
                  Supporting outreach programmes, community engagement and
                  initiatives that bring hope, opportunities and lasting impact
                  to individuals and families.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
