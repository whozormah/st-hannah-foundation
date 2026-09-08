
import siteStats from "@/public/data/stats.json";

interface ProgramsStatsData {
  yearsOfCompassion: string;
  livesReached: string;
  outreachActivities: string;
  countriesRepresented: string;
}

const statsData: ProgramsStatsData = siteStats.programs;

export default function AboutImpact() {

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
              className="bg-cream rounded-[24px] p-10 text-center"
            >
              <h3 className="text-5xl font-bold text-brand">
                {stat.number}
              </h3>

              <p className="mt-4 text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
