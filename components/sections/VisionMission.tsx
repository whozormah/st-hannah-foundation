import {
  Eye,
  Target,
  HeartHandshake,
  ShieldCheck,
  Award,
  Sparkles,
  Scale,
  Users,
} from "lucide-react";

import foundationData from "@/public/data/homepage/foundation.json";
import coreValues from "@/public/data/homepage/core-values.json";

interface FoundationData {
  badge: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
}

interface Value {
  title: string;
}

const foundation: FoundationData = foundationData;
const values: Value[] = coreValues;

export default function VisionMission() {
  const valueIcons = [
    HeartHandshake,
    ShieldCheck,
    Award,
    Sparkles,
    Scale,
    Users,
  ];

  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Decorative Background */}

      <div className="absolute inset-0">
        <div className="absolute -top-56 -left-32 h-[520px] w-[520px] rounded-full bg-[#FAF7F2]" />

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#FAF7F2]/70" />
      </div>

      <div className="container-custom relative">
        {/* Heading */}
        <div className="mx-auto mb-24 max-w-5xl text-center">
          <span className="uppercase tracking-[6px] font-semibold text-[#844204]">
            {foundation?.badge}
          </span>

          <h2 className="mt-5 text-5xl md:text-6xl font-bold leading-tight text-[#1B1815]">
            {foundation?.title}
          </h2>

          <div className="mx-auto mt-8 h-[3px] w-24 rounded-full bg-[#D9A441]" />

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-9 text-gray-600">
            {foundation?.description}
          </p>
        </div>
        {/* Vision + Mission */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Vision */}

          <div className="group relative overflow-hidden rounded-[36px] border border-[#D9A441]/20 bg-white p-10 shadow-lg transition-all duration-700 hover:-translate-y-2 hover:border-[#D9A441] hover:shadow-2xl">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#FAF7F2] blur-3xl" />

            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#844204]/10 transition-all duration-500 group-hover:bg-[#844204]">
                <Eye
                  size={36}
                  className="text-[#844204] transition-all duration-500 group-hover:text-white"
                />
              </div>

              <span className="mt-8 block uppercase tracking-[4px] text-sm font-semibold text-[#844204]">
                Our Vision
              </span>

              <h3 className="mt-4 text-4xl font-bold text-[#1B1815]">
                Inspiring Hope.
              </h3>

              <div className="mt-6 h-[2px] w-16 rounded-full bg-[#D9A441]" />

              <p className="mt-8 text-[17px] leading-9 text-gray-600">
                {foundation?.vision}
              </p>
            </div>
          </div>

          {/* Mission */}

          <div className="group relative overflow-hidden rounded-[36px] border border-[#D9A441]/20 bg-white p-10 shadow-lg transition-all duration-700 hover:-translate-y-2 hover:border-[#D9A441] hover:shadow-2xl">
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-[#FAF7F2] blur-3xl" />

            <div className="relative">
              <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-[#844204]/10 transition-all duration-500 group-hover:bg-[#844204]">
                <Target
                  size={36}
                  className="text-[#844204] transition-all duration-500 group-hover:text-white"
                />
              </div>

              <span className="mt-8 block uppercase tracking-[4px] text-sm font-semibold text-[#844204]">
                Our Mission
              </span>

              <h3 className="mt-4 text-4xl font-bold text-[#1B1815]">
                Transforming Lives.
              </h3>

              <div className="mt-6 h-[2px] w-16 rounded-full bg-[#D9A441]" />

              <p className="mt-8 text-[17px] leading-9 text-gray-600">
                {foundation?.mission}
              </p>
            </div>
          </div>
        </div>{" "}
        {/* Core Values */}
        <div className="mt-28">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <span className="uppercase tracking-[6px] font-semibold text-[#844204]">
              What Guides Us
            </span>

            <h3 className="mt-5 text-5xl font-bold text-[#1B1815]">
              Our Core Values
            </h3>

            <div className="mx-auto mt-6 h-[3px] w-20 rounded-full bg-[#D9A441]" />

            <p className="mt-7 text-lg leading-8 text-gray-600">
              These values define our culture, shape our decisions and inspire
              the way we serve every individual and community.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
            {values.map((value, index) => {
              const Icon = valueIcons[index];

              return (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-[30px] border border-[#D9A441]/15 bg-white p-8 text-center shadow-sm transition-all duration-700 hover:-translate-y-3 hover:border-[#D9A441] hover:shadow-2xl"
                >
                  {/* Background Glow */}

                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#FAF7F2] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

                  <div className="relative">
                    {/* Icon */}

                    <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#844204]/10 transition-all duration-700 group-hover:rotate-6 group-hover:bg-[#844204]">
                      {Icon && (
                        <Icon
                          size={34}
                          className="text-[#844204] transition-all duration-700 group-hover:scale-110 group-hover:text-white"
                        />
                      )}
                    </div>

                    {/* Title */}

                    <h4 className="mt-8 text-xl font-bold leading-7 text-[#1B1815]">
                      {value.title}
                    </h4>

                    {/* Accent */}

                    <div className="mx-auto mt-6 h-[2px] w-10 rounded-full bg-[#D9A441] transition-all duration-700 group-hover:w-16" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
