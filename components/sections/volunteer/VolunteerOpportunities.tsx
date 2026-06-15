"use client";

import { useEffect, useState } from "react";

interface Opportunity {
  title: string;
  description: string;
}

export default function VolunteerOpportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);

  useEffect(() => {
    fetch("/data/volunteer-opportunities.json")
      .then((res) => res.json())
      .then((data) => setOpportunities(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-28 bg-[#FAF7F2]">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Volunteer Opportunities{" "}
          </span>
          ```
          <h2 className="text-5xl font-bold mt-4">
            Find A Place To Make An Impact
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            Whether you are passionate about community development, education,
            communications, fundraising or professional service, there are many
            ways to contribute your skills and make a meaningful difference.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.title}
              className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="w-12 h-1 bg-[#D9A441] rounded-full mb-6" />

              <h3 className="text-xl font-bold">{opportunity.title}</h3>

              <p className="mt-4 text-gray-600 leading-7">
                {opportunity.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
