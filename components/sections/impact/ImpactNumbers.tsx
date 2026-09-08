import { Users, HeartHandshake, HandHeart, Sparkles } from "lucide-react";

import siteStats from "@/public/data/stats.json";

// One set of figures for the page, read from stats.json. They previously
// appeared twice, in ImpactArchive and again in ImpactCTA, and the
// "15+ Students Sponsored" in both contradicted the data.
const numbers = [
  {
    icon: HeartHandshake,
    value: siteStats.impact.widowsSupported,
    label: "Widows supported",
  },
  {
    icon: Users,
    value: siteStats.impact.childrenReached,
    label: "Children reached",
  },
  {
    icon: HandHeart,
    value: siteStats.impact.communityOutreachEvents,
    label: "Outreach events",
  },
  {
    icon: Sparkles,
    value: siteStats.impact.livesImpacted,
    label: "Lives impacted",
  },
];

export default function ImpactNumbers() {
  return (
    <section className="bg-cream py-16">
      <div className="container-custom">
        <dl className="grid gap-8 rounded-[28px] border border-accent/15 bg-white px-10 py-10 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
          {numbers.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="text-center">
                <span
                  aria-hidden
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-warm text-brand"
                >
                  <Icon size={26} />
                </span>

                <dd className="mt-5 text-4xl font-bold text-brand md:text-5xl">
                  {item.value}
                </dd>

                <dt className="mt-3 text-sm font-semibold uppercase tracking-[3px] text-gray-500">
                  {item.label}
                </dt>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
