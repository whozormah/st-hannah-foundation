"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Leader {
  name: string;
  role: string;
  image: string;
  bio: string;
}

export default function LeadershipPreview() {
  const [leaders, setLeaders] = useState<Leader[]>([]);

  useEffect(() => {
    fetch("/data/governance.json")
      .then((res) => res.json())
      .then((data) => setLeaders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-32 bg-white">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Governance & Leadership{" "}
          </span>
          ```
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Meet The Leaders Behind The Mission
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg leading-8">
            Behind every initiative is a dedicated team committed to advancing
            our mission, strengthening communities and ensuring every programme
            delivers meaningful and lasting impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className={`rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                leader.role === "President"
                  ? "bg-gradient-to-br from-[#844204] to-[#A85A12] text-white"
                  : "bg-white border border-gray-100"
              }`}
            >
              {/* Image */}

              <div
                className={`relative h-[320px] flex items-end justify-center ${
                  leader.role === "President" ? "bg-white" : "bg-[#FAF7F2]"
                }`}
              >
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-contain p-6"
                />
              </div>

              {/* Content */}

              <div
                className={`p-8 ${
                  leader.role === "President"
                    ? "bg-gradient-to-br from-[#844204] to-[#A85A12] text-white"
                    : ""
                }`}
              >
                {leader.role === "President" && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#D9A441] text-[#140B02] text-xs font-bold mb-5">
                    Founder & President
                  </span>
                )}

                <h3 className="text-2xl font-bold leading-tight">
                  {leader.name}
                </h3>

                <p
                  className={`mt-3 font-medium ${
                    leader.role === "President"
                      ? "text-[#F5D27A]"
                      : "text-[#844204]"
                  }`}
                >
                  {leader.role}
                </p>

                {leader.role === "President" ? (
                  <div className="mt-6 border-l-4 border-[#D9A441] pl-4">
                    <p className="italic text-gray-100 leading-7">
                      "Transforming lives begins with compassion, commitment and
                      collective action."
                    </p>
                  </div>
                ) : (
                  <p className="mt-5 text-gray-600 text-sm leading-7">
                    Providing leadership, governance and strategic oversight
                    that strengthens the Foundation's impact and long-term
                    sustainability.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#A85A12] transition-all duration-300"
          >
            Meet Our Leadership Team →
          </Link>
        </div>
      </div>
    </section>
  );
}
