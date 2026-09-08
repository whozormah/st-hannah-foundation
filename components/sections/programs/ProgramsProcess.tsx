import {
  Search,
  HeartHandshake,
  Lightbulb,
  Users,
  ArrowRight,
} from "lucide-react";

export default function ProgramsProcess() {
  const steps = [
    {
      icon: Search,
      title: "Identify Needs",
      description:
        "We begin by listening to communities, understanding local realities and identifying the most pressing needs requiring sustainable intervention.",
    },
    {
      icon: HeartHandshake,
      title: "Provide Support",
      description:
        "Through carefully designed programmes, partnerships and compassionate outreach, we respond with practical solutions that restore dignity.",
    },
    {
      icon: Lightbulb,
      title: "Empower For Growth",
      description:
        "We equip individuals and families with education, skills, mentorship and opportunities that encourage long-term independence.",
    },
    {
      icon: Users,
      title: "Strengthen Communities",
      description:
        "Our work creates ripple effects that build resilient families, stronger communities and sustainable transformation for future generations.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto mb-20 max-w-4xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            Our Process
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            How We Create{" "}
            <br />
            Lasting Impact
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-accent" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-700">
            Lasting transformation doesn&apos;t happen overnight. Every programme
            follows a deliberate process designed to meet immediate needs while
            creating opportunities for sustainable growth.
          </p>
        </div>

        {/* Process */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group relative rounded-[36px] border border-gray-100 bg-cream p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:shadow-2xl"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-cream-warm transition-all duration-500 group-hover:scale-110 group-hover:bg-brand">
                  <Icon
                    size={36}
                    className="text-brand transition-all duration-500 group-hover:text-white"
                  />
                </div>

                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[3px] text-[#9A6A17]">
                    Step {index + 1}
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-accent transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>

                <h3 className="text-2xl font-bold text-ink">
                  {step.title}
                </h3>

                <p className="mt-5 leading-8 text-gray-700">
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
