import {
  GraduationCap,
  HeartHandshake,
  Users,
  Home,
  HandHeart,
  Briefcase,
} from "lucide-react";

export default function AboutImpactAreas() {
  const areas = [
    {
      icon: GraduationCap,
      title: "Education & Learning",
      description:
        "Creating opportunities through educational support, mentorship, digital literacy and access to learning resources.",
    },
    {
      icon: HeartHandshake,
      title: "Child Welfare",
      description:
        "Supporting vulnerable children through care initiatives, educational access, wellbeing support and opportunity creation.",
    },
    {
      icon: Users,
      title: "Family Support",
      description:
        "Strengthening families through practical assistance, empowerment initiatives and compassionate intervention.",
    },
    {
      icon: Home,
      title: "Community Development",
      description:
        "Building stronger communities through outreach programs, partnerships and sustainable support systems.",
    },
    {
      icon: HandHeart,
      title: "Humanitarian Relief",
      description:
        "Responding to urgent needs with dignity through food support, emergency assistance and community care.",
    },
    {
      icon: Briefcase,
      title: "Volunteer Engagement",
      description:
        "Mobilizing passionate individuals to serve, contribute their skills and create meaningful impact.",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            How We Create Impact
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Transforming Lives Through Action
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Our work focuses on practical interventions that restore hope,
            strengthen families and empower communities to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.title}
                className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
                  <Icon size={30} className="text-[#844204]" />
                </div>

                <h3 className="text-2xl font-bold">{area.title}</h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {area.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
