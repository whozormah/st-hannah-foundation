import Image from "next/image";
import Link from "next/link";

import eventsData from "@/public/data/featured-events.json";

interface EventItem {
  title: string;
  description: string;
  image: string;
  category: string;
  link: string;
}

const events: EventItem[] = eventsData;

export default function FeaturedEvents() {


  return (
    <section className="bg-white py-14 md:py-24">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="mb-12 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            Behind The Photographs
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            The programmes these moments come from
          </h2>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            Each photograph belongs to a programme still running today.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.title}
              className="overflow-hidden rounded-[24px] border border-accent/15 bg-white shadow-sm transition hover:shadow-xl"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8">
                <span className="text-brand font-semibold uppercase tracking-[3px]">
                  {event.category}
                </span>

                <h3 className="text-2xl font-bold mt-3">{event.title}</h3>

                <p className="mt-4 text-gray-700 leading-7">
                  {event.description}
                </p>
                <Link
                  href={event.link}
                  className="inline-flex items-center mt-6 text-brand font-semibold hover:gap-3 transition-all"
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
