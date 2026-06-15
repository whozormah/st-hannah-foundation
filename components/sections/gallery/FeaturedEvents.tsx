"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface EventItem {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch("/data/featured-events.json")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-24 bg-[#FAF7F2]">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-16">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Featured Events{" "}
          </span>
          <h2 className="text-5xl font-bold mt-4">
            Impact Beyond The Pictures
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            Explore some of the key programmes and outreach initiatives that
            continue to transform lives and strengthen communities.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event.title}
              className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="relative h-[260px]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8">
                <span className="text-[#844204] font-semibold uppercase tracking-[3px]">
                  {event.category}
                </span>

                <h3 className="text-2xl font-bold mt-3">{event.title}</h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {event.description}
                </p>
                <Link
                  href={event.link}
                  className="inline-flex items-center mt-6 text-[#844204] font-semibold hover:gap-3 transition-all"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
