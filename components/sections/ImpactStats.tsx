import { HeartHandshake, Users, GraduationCap, HandHeart } from "lucide-react";

export default function ImpactStats() {
  const stats = [
    {
      icon: Users,
      number: "500+",
      title: "Children Reached",
    },
    {
      icon: HeartHandshake,
      number: "150+",
      title: "Widows Supported",
    },
    {
      icon: GraduationCap,
      number: "200+",
      title: "Educational Beneficiaries",
    },
    {
      icon: HandHeart,
      number: "25+",
      title: "Communities Impacted",
    },
  ];

  return (
    <section className="py-28 bg-[#844204]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
            Impact At A Glance
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-white mt-4">
            Transforming Lives Through Service
          </h2>

          <p className="text-gray-200 max-w-3xl mx-auto mt-6">
            Every initiative, every outreach and every act of generosity
            contributes to building stronger families and thriving communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            return (
              <div
                key={index}
                className="bg-white rounded-3xl p-10 text-center hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mx-auto mb-6">
                  <Icon size={32} className="text-[#844204]" />
                </div>

                <h3 className="text-5xl font-bold text-[#844204]">
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
