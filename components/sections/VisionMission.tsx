"use client";

import { useEffect, useState } from "react";
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

interface FoundationData {
  badge: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
}

interface Value {
  title: string;
  description: string;
}

export default function VisionMission() {
  const [foundation, setFoundation] = useState<FoundationData | null>(null);
  const [values, setValues] = useState<Value[]>([]);

  useEffect(() => {
    fetch("/data/homepage/foundation.json")
      .then((res) => res.json())
      .then((data) => setFoundation(data))
      .catch((err) => console.error(err));

    fetch("/data/homepage/core-values.json")
      .then((res) => res.json())
      .then((data) => setValues(data))
      .catch((err) => console.error(err));
  }, []);

  const valueIcons = [
    HeartHandshake,
    ShieldCheck,
    Award,
    Sparkles,
    Scale,
    Users,
  ];

  return (
    <section className="py-28 bg-white">
      {" "}
      <div className="container-custom">
        {/* About Foundation */}
        ```
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-[#844204] font-semibold uppercase tracking-[4px]">
            {foundation?.badge}
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-5 text-[#1B1815]">
            {foundation?.title}
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            {foundation?.description}
          </p>
        </div>
        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="bg-[#FAF7F2] p-10 rounded-3xl border border-[#D9A441]/20 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
              <Eye className="text-[#844204]" size={30} />
            </div>

            <h3 className="text-3xl font-bold mb-5 text-[#1B1815]">
              Our Vision
            </h3>

            <p className="text-gray-600 leading-8">{foundation?.vision}</p>
          </div>

          <div className="bg-[#FAF7F2] p-10 rounded-3xl border border-[#D9A441]/20 hover:shadow-xl transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
              <Target className="text-[#844204]" size={30} />
            </div>

            <h3 className="text-3xl font-bold mb-5 text-[#1B1815]">
              Our Mission
            </h3>

            <p className="text-gray-600 leading-8">{foundation?.mission}</p>
          </div>
        </div>
        {/* Core Values */}
        <div>
          <div className="text-center mb-12">
            <span className="text-[#844204] font-semibold uppercase tracking-[4px]">
              What Guides Us
            </span>

            <h3 className="text-4xl font-bold mt-4 text-[#1B1815]">
              Our Core Values
            </h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = valueIcons[index];

              return (
                <div
                  key={index}
                  className="bg-white p-8 rounded-2xl border border-[#D9A441]/20 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#844204]/10 flex items-center justify-center mb-5">
                    {Icon && <Icon size={26} className="text-[#844204]" />}
                  </div>

                  <h4 className="text-xl font-semibold mb-3 text-[#1B1815]">
                    {value.title}
                  </h4>

                  <p className="text-gray-600 leading-7">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
