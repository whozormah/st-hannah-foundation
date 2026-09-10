import { Eye, Target } from "lucide-react";

import foundationData from "@/public/data/homepage/foundation.json";

interface FoundationData {
  badge: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
}

const foundation: FoundationData = foundationData;

// Keyed by name rather than array position. The previous version indexed into
// a fixed icon list, so reordering the data silently moved every icon and a
// seventh value would have rendered without one.
export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-24">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 -top-56 h-[520px] w-[520px] rounded-full bg-cream" />

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-cream/70" />
      </div>

      <div className="container-custom relative">
        {/* Heading */}

        <div className="max-w-3xl">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            {foundation.badge}
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-5xl">
            {foundation.title}
          </h2>

          <p className="mt-6 text-lg leading-9 text-gray-700">
            {foundation.description}
          </p>
        </div>

        {/* Vision and mission */}

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {[
            { label: "Our Vision", icon: Eye, body: foundation.vision },
            { label: "Our Mission", icon: Target, body: foundation.mission },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <article
                key={item.label}
                className="group relative overflow-hidden rounded-[28px] border border-accent/20 bg-white p-9 shadow-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-xl"
              >
                <span
                  aria-hidden
                  className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand/10 text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white"
                >
                  <Icon size={30} />
                </span>

                {/* The label is the heading. It previously sat above a filler
                    line ("Inspiring Hope.") that was not in the data. */}
                <h3 className="mt-7 text-2xl font-bold text-ink">
                  {item.label}
                </h3>

                <div aria-hidden className="mt-5 h-[2px] w-14 bg-accent" />

                <p className="mt-6 text-lg leading-9 text-gray-700">
                  {item.body}
                </p>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
