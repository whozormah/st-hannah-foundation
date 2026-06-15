"use client";

import { useEffect, useState } from "react";

interface Benefit {
  title: string;
  description: string;
}

export default function VolunteerBenefits() {
  const [benefits, setBenefits] = useState<Benefit[]>([]);

  useEffect(() => {
    fetch("/data/volunteer-benefits.json")
      .then((res) => res.json())
      .then((data) => setBenefits(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-28 bg-white">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Why Volunteer With Us{" "}
          </span>
          ```
          <h2 className="text-5xl font-bold mt-4">
            More Than Service.
            <br />A Journey Of Growth & Impact.
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            Volunteering with St. Hannah Foundation offers an opportunity to
            make a difference while developing valuable skills, building
            meaningful relationships and contributing to sustainable community
            transformation.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {benefits.map((benefit) => (
            <div
              key={benefit.title}
              className="bg-[#FAF7F2] rounded-[32px] p-8 hover:shadow-lg transition"
            >
              <div className="w-14 h-1 bg-[#D9A441] rounded-full mb-6" />

              <h3 className="text-2xl font-bold">{benefit.title}</h3>

              <p className="mt-4 text-gray-600 leading-7">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
