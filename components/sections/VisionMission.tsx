import {
  Eye,
  Target,
  HeartHandshake,
  ShieldCheck,
  Award,
  Sparkles,
  Scale,
  Users,
  Star,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import foundationData from "@/public/data/homepage/foundation.json";
import coreValues from "@/public/data/homepage/core-values.json";

interface FoundationData {
  badge: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
}

interface Value {
  title: string;
  // Optional: add one to core-values.json and the card fills out on its own.
  description?: string;
}

const foundation: FoundationData = foundationData;
const values: Value[] = coreValues;

// Keyed by name rather than array position. The previous version indexed into
// a fixed icon list, so reordering the data silently moved every icon and a
// seventh value would have rendered without one.
const VALUE_ICONS: Record<string, LucideIcon> = {
  Compassion: HeartHandshake,
  Integrity: ShieldCheck,
  Excellence: Award,
  Empowerment: Sparkles,
  Accountability: Scale,
  Community: Users,
  Service: HeartHandshake,
};

export default function VisionMission() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
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

        {/* Core values */}

        <div className="mt-20">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
              What Guides Us
            </span>

            <h3 className="mt-4 text-2xl font-bold text-ink md:text-3xl">
              Our core values
            </h3>

            <p className="mt-5 text-lg leading-9 text-gray-700">
              These shape our decisions and the way we serve every individual
              and community.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {values.map((value) => {
              const Icon = VALUE_ICONS[value.title] ?? Star;

              return (
                <li
                  key={value.title}
                  className="group rounded-[20px] border border-accent/15 bg-white p-6 text-center transition-all duration-500 hover:-translate-y-1 hover:border-accent hover:shadow-lg"
                >
                  <span
                    aria-hidden
                    className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-brand transition-all duration-500 group-hover:bg-brand group-hover:text-white"
                  >
                    <Icon size={24} />
                  </span>

                  <h4 className="mt-5 font-bold leading-6 text-ink">
                    {value.title}
                  </h4>

                  {value.description && (
                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {value.description}
                    </p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
