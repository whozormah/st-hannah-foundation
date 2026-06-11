import {
  GraduationCap,
  HeartHandshake,
  Users,
  Home,
  HandHeart,
  Briefcase,
} from "lucide-react";

export default function ProgramsAreas() {
  const programs = [
    {
      title: "Education & Learning",
      icon: GraduationCap,
      description:
        "Providing educational support, mentorship and learning opportunities.",
    },
    {
      title: "Child Welfare",
      icon: HeartHandshake,
      description:
        "Supporting vulnerable children through care and opportunity initiatives.",
    },
    {
      title: "Family Support",
      icon: Users,
      description:
        "Strengthening families through empowerment and practical assistance.",
    },
    {
      title: "Community Development",
      icon: Home,
      description:
        "Building stronger communities through outreach and partnerships.",
    },
    {
      title: "Humanitarian Relief",
      icon: HandHeart,
      description: "Responding to urgent needs with compassion and dignity.",
    },
    {
      title: "Volunteer Engagement",
      icon: Briefcase,
      description: "Mobilizing volunteers to create meaningful impact.",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Focus Areas
          </span>

          <h2 className="text-5xl font-bold mt-4">How We Serve Communities</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <div
                key={program.title}
                className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-lg transition"
              >
                <div className="w-16 h-16 bg-[#844204]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Icon size={30} className="text-[#844204]" />
                </div>

                <h3 className="text-2xl font-bold">{program.title}</h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {program.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
