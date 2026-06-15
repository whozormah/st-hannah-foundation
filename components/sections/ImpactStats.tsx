"use client";

import { useEffect, useState } from "react";
import { HeartHandshake, Users, GraduationCap, HandHeart } from "lucide-react";

interface StatsData {
  childrenReached: string;
  widowsSupported: string;
  educationalBeneficiaries: string;
  communitiesImpacted: string;
}

export default function ImpactStats() {
  const [statsData, setStatsData] = useState<StatsData | null>(null);

  useEffect(() => {
    fetch("/data/stats.json")
      .then((res) => res.json())
      .then((data) => {
        setStatsData(data.homepage);
      })
      .catch((err) => console.error(err));
  }, []);

  const stats = [
    {
      icon: Users,
      number: statsData?.childrenReached || "0",
      title: "Children Reached",
    },
    {
      icon: HeartHandshake,
      number: statsData?.widowsSupported || "0",
      title: "Widows Supported",
    },
    {
      icon: GraduationCap,
      number: statsData?.educationalBeneficiaries || "0",
      title: "Educational Beneficiaries",
    },
    {
      icon: HandHeart,
      number: statsData?.communitiesImpacted || "0",
      title: "Communities Impacted",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
            Impact At A Glance{" "}
          </span>
          ```
          <h2 className="text-4xl md:text-5xl font-bold text-[#1B1815] mt-4">
            Impact That Changes Lives
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-6 text-lg">
            Every initiative, every outreach and every act of generosity
            contributes to building stronger families, restoring dignity and
            creating opportunities for individuals and communities to thrive.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 text-center border border-[#D9A441]/20 hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mx-auto mb-6">
                  <Icon size={32} className="text-[#844204]" />
                </div>

                <h3 className="text-4xl md:text-5xl font-bold text-[#844204]">
                  {stat.number}
                </h3>

                <p className="mt-4 text-gray-600 font-medium">{stat.title}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
