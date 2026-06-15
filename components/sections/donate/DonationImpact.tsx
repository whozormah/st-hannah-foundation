"use client";

import { useEffect, useState } from "react";

interface Stat {
  number: string;
  label: string;
}

interface Cause {
  title: string;
  description: string;
}

interface DonationImpactData {
  stats: Stat[];
  causes: Cause[];
}

export default function DonationImpact() {
  const [data, setData] = useState<DonationImpactData>({
    stats: [],
    causes: [],
  });

  useEffect(() => {
    fetch("/data/donation-impact.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-28 bg-[#FAF7F2]">
      {" "}
      <div className="container-custom">
        {/* Header */}

        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Your Impact
          </span>

          <h2 className="text-5xl md:text-6xl font-bold mt-4">
            Every Gift Creates A Ripple Of Hope
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Every donation contributes directly to programmes and initiatives
            that empower individuals, strengthen families and create
            opportunities for sustainable growth and transformation.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-5xl font-bold text-[#844204]">
                {stat.number}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Support Areas */}

        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Support Areas
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Transforming Generosity Into Impact
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Your generosity enables us to continue delivering life-changing
            programmes that uplift individuals, support families and strengthen
            communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.causes.map((cause) => (
            <div
              key={cause.title}
              className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
                <div className="w-6 h-6 rounded-full bg-[#844204]" />
              </div>

              <h3 className="text-2xl font-bold">{cause.title}</h3>

              <p className="mt-4 text-gray-600 leading-7">
                {cause.description}
              </p>
            </div>
          ))}
        </div>

        {/* Donation Promise */}

        <div className="mt-24 bg-white rounded-[32px] p-10 md:p-14 text-center shadow-sm">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Our Commitment
          </span>

          <h3 className="text-4xl md:text-5xl font-bold mt-4">
            Stewarding Every Gift With Integrity
          </h3>

          <p className="max-w-4xl mx-auto mt-6 text-gray-600 leading-8">
            We are committed to ensuring that every donation is used
            responsibly, transparently and strategically to create measurable
            impact. Through accountability, stewardship and compassionate
            service, we maximize every contribution to transform lives and
            strengthen communities.
          </p>
        </div>
      </div>
    </section>
  );
}
