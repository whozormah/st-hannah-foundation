"use client";

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
    <section className="bg-white py-32">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto mb-20 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-[#844204]">
            Our Process
          </span>

          <h2 className="mt-5 text-5xl font-bold text-[#1B1815] md:text-6xl">
            How We Create
            <br />
            Lasting Impact
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[#D9A441]" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            Lasting transformation doesn't happen overnight. Every programme
            follows a deliberate process designed to meet immediate needs while
            creating opportunities for sustainable growth.
          </p>
        </div>

        {/* Banner */}

        <div className="relative mb-20 overflow-hidden rounded-[40px] bg-gradient-to-r from-[#844204] via-[#9A5A12] to-[#B27425] px-12 py-16 text-center text-white shadow-2xl">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative">
            <span className="uppercase tracking-[5px] text-[#F4D06F]">
              Our Philosophy
            </span>

            <h3 className="mt-5 text-4xl font-bold">
              Listen.
              <span className="text-[#F4D06F]"> Support.</span>
              <span className="text-white"> Empower.</span>
              <span className="text-[#F4D06F]"> Transform.</span>
            </h3>

            <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/85">
              We believe meaningful change happens when compassion is combined
              with intentional action, accountability and long-term commitment.
            </p>
          </div>
        </div>

        {/* Process */}

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="group relative rounded-[36px] border border-gray-100 bg-[#FAF7F2] p-8 shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/40 hover:shadow-2xl"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#FFF8EC] transition-all duration-500 group-hover:scale-110 group-hover:bg-[#844204]">
                  <Icon
                    size={36}
                    className="text-[#844204] transition-all duration-500 group-hover:text-white"
                  />
                </div>

                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold uppercase tracking-[3px] text-[#9A6A17]">
                    Step {index + 1}
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-[#D9A441] transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>

                <h3 className="text-2xl font-bold text-[#1B1815]">
                  {step.title}
                </h3>

                <p className="mt-5 leading-8 text-gray-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Closing */}

        <div className="mx-auto mt-24 max-w-5xl rounded-[40px] bg-[#FAF7F2] p-14 text-center">
          <span className="uppercase tracking-[5px] text-[#844204]">
            Why Our Process Works
          </span>

          <h3 className="mt-5 text-4xl font-bold text-[#1B1815]">
            Sustainable Change Is Built Step By Step
          </h3>

          <div className="mx-auto mt-6 h-[3px] w-20 rounded-full bg-[#D9A441]" />

          <p className="mt-8 text-lg leading-9 text-gray-600">
            By listening first, responding intentionally and investing in
            long-term empowerment, we create programmes that don't simply solve
            today's challenges—they help communities build a stronger tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}
