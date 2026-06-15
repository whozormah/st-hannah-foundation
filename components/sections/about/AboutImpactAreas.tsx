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
        "Building stronger communities through outreach programmes, partnerships and sustainable support systems.",
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
        "Mobilising passionate individuals to serve, contribute their skills and create meaningful impact.",
    },
  ];

  const approach = ["Listen", "Support", "Empower", "Transform"];

  return (
    <section className="py-32 bg-[#FAF7F2]">
      {" "}
      <div className="container-custom">
        {/* Header */}
        ```
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Our Approach
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            How We Create Lasting Impact
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg leading-8">
            We believe lasting change happens when compassion meets action.
            Every programme, outreach and initiative is designed to meet
            immediate needs while creating pathways for long-term growth,
            resilience and transformation.
          </p>
        </div>
        {/* Impact Journey */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {approach.map((step, index) => (
            <div
              key={step}
              className="bg-white rounded-[28px] p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#844204] text-white flex items-center justify-center mx-auto font-bold text-lg">
                {index + 1}
              </div>

              <h3 className="mt-5 text-xl font-bold">{step}</h3>
            </div>
          ))}
        </div>
        {/* Impact Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.title}
                className="group bg-white rounded-[32px] p-8 border border-gray-100 hover:border-[#D9A441]/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
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
        {/* Closing Statement */}
        <div className="max-w-4xl mx-auto text-center mt-20">
          <h3 className="text-3xl font-bold text-[#844204]">
            Creating Opportunities For Lasting Change
          </h3>

          <p className="mt-6 text-gray-600 text-lg leading-8">
            From education and family support to humanitarian assistance and
            community development, our work is focused on restoring dignity,
            strengthening resilience and creating opportunities for people to
            thrive.
          </p>
        </div>
      </div>
    </section>
  );
}
