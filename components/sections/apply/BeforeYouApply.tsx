"use client";

import { useEffect, useState } from "react";
import { AlertCircle, FileText } from "lucide-react";

interface ApplyInfo {
  title: string;
  intro: string;
  importantNotes: string[];
  requiredInformation: string[];
}

export default function BeforeYouApply() {
  const [data, setData] = useState<ApplyInfo | null>(null);

  useEffect(() => {
    fetch("/data/apply-info.json")
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error(err));
  }, []);

  if (!data) return null;

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Application Guidance
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">{data.title}</h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">{data.intro}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Important Notes */}

          <div className="bg-[#FAF7F2] rounded-[32px] p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#844204]/10 flex items-center justify-center">
                <AlertCircle className="text-[#844204]" size={28} />
              </div>

              <h3 className="text-2xl font-bold">Important Information</h3>
            </div>

            <div className="space-y-5">
              {data.importantNotes.map((note) => (
                <div key={note} className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#D9A441] mt-3" />

                  <p className="text-gray-600 leading-7">{note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Required Information */}

          <div className="bg-[#FAF7F2] rounded-[32px] p-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-2xl bg-[#844204]/10 flex items-center justify-center">
                <FileText className="text-[#844204]" size={28} />
              </div>

              <h3 className="text-2xl font-bold">Required Information</h3>
            </div>

            <div className="space-y-5">
              {data.requiredInformation.map((item) => (
                <div key={item} className="flex gap-3 items-start">
                  <div className="w-2 h-2 rounded-full bg-[#D9A441] mt-3" />

                  <p className="text-gray-600 leading-7">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 bg-[#844204] text-white rounded-[32px] p-10 text-center">
          <h3 className="text-3xl font-bold">Every Application Matters</h3>

          <p className="mt-4 max-w-3xl mx-auto leading-8 text-white/90">
            We understand that reaching out for support can be difficult. Our
            team is committed to reviewing every application with care, dignity,
            fairness and compassion.
          </p>
        </div>
      </div>
    </section>
  );
}
