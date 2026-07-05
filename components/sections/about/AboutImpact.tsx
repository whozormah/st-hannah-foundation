"use client";

import { useEffect, useState } from "react";

interface ProgramsStatsData {
  yearsOfCompassion: string;
  livesReached: string;
  outreachActivities: string;
  countriesRepresented: string;
}

interface StatsData {
  programs: ProgramsStatsData;
}

export default function AboutImpact() {
  const [statsData, setStatsData] = useState<ProgramsStatsData | null>(null);

  useEffect(() => {
    fetch("/data/stats.json")
      .then((res) => res.json())
      .then((data: StatsData) => setStatsData(data.programs))
      .catch((err) => console.error(err));
  }, []);

  const stats = [
    {
      number: statsData?.yearsOfCompassion || "0",
      label: "Years of Compassion",
    },
    {
      number: statsData?.livesReached || "0",
      label: "Lives Reached",
    },
    {
      number: statsData?.outreachActivities || "0",
      label: "Community Outreach Activities",
    },
    {
      number: statsData?.countriesRepresented || "0",
      label: "Nations Represented",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#FAF7F2] rounded-[24px] p-10 text-center"
            >
              <h3 className="text-5xl font-bold text-[#844204]">
                {stat.number}
              </h3>

              <p className="mt-4 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
