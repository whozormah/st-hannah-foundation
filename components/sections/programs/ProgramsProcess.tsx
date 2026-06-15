import { Search, HeartHandshake, Lightbulb, Users } from "lucide-react";

export default function ProgramsProcess() {
  const steps = [
    {
      icon: Search,
      title: "Identify Needs",
      description:
        "We listen, engage communities and assess real challenges affecting individuals and families.",
    },
    {
      icon: HeartHandshake,
      title: "Provide Support",
      description:
        "We respond through targeted programmes, practical assistance and compassionate intervention.",
    },
    {
      icon: Lightbulb,
      title: "Empower For Growth",
      description:
        "Beyond immediate relief, we create opportunities for learning, skills development and self-reliance.",
    },
    {
      icon: Users,
      title: "Strengthen Communities",
      description:
        "Our goal is lasting transformation that uplifts families, strengthens communities and creates sustainable impact.",
    },
  ];

  return (
    <section className="py-32 bg-white">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Our Approach{" "}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Creating Sustainable Impact
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            We believe meaningful change goes beyond temporary assistance. Our
            approach focuses on restoring dignity, creating opportunities and
            empowering individuals to build brighter futures.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="bg-[#FAF7F2] rounded-[32px] p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
                  <Icon size={30} className="text-[#844204]" />
                </div>

                <h3 className="text-2xl font-bold">{step.title}</h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
