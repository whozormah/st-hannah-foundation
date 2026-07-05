"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export default function AboutGovernance() {
  const [team, setTeam] = useState<TeamMember[]>([]);

  useEffect(() => {
    fetch("/data/governance.json")
      .then((res) => res.json())
      .then((data) => setTeam(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-32 bg-white">
      {" "}
      <div className="container-custom">
        {/* Header */}
        ```
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Governance & Leadership
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Stewarding The Mission
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg leading-8">
            The Governance and Leadership Team provides strategic direction,
            oversight and stewardship for the Foundation, ensuring
            accountability, sustainability and meaningful impact across all
            programmes and initiatives.
          </p>
        </div>
        {/* Message Banner */}
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#844204] to-[#A85A12] rounded-[32px] p-10 md:p-14 mb-20 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold">
            Leadership Rooted In Service
          </h3>

          <p className="mt-6 text-white/90 text-lg leading-8 max-w-3xl mx-auto">
            Our leadership team is committed to guiding the Foundation with
            integrity, transparency and a shared vision of empowering lives,
            strengthening communities and creating sustainable impact.
          </p>
        </div>
        {/* Leadership Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div
              key={member.name}
              className={`rounded-[32px] overflow-hidden transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl ${
                member.role === "President"
                  ? "bg-white border border-[#D9A441] shadow-xl"
                  : "bg-white border border-gray-100"
              }`}
            >
              {/* Image */}

              <div
                className={`relative h-[350px] flex items-end justify-center ${
                  member.role === "President" ? "bg-white" : "bg-[#FAF7F2]"
                }`}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain p-6"
                />
              </div>

              {/* Content */}

              <div
                className={`p-8 ${
                  member.role === "President"
                    ? "bg-gradient-to-br from-[#844204] to-[#A85A12] text-white"
                    : ""
                }`}
              >
                {member.role === "President" && (
                  <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#D9A441] text-[#140B02] text-xs font-bold mb-5">
                    Founder & President
                  </span>
                )}

                <p
                  className={`uppercase tracking-[3px] text-xs font-semibold ${
                    member.role === "President"
                      ? "text-[#F5D27A]"
                      : "text-[#844204]"
                  }`}
                >
                  {member.role}
                </p>

                <h3 className="text-2xl font-bold mt-3 leading-tight">
                  {member.name}
                </h3>

                {member.role === "President" ? (
                  <div className="mt-6 border-l-4 border-[#D9A441] pl-4">
                    <p className="italic text-white/90 leading-7">
                      "Transforming lives begins with compassion, commitment and
                      collective action."
                    </p>
                  </div>
                ) : (
                  <p className="mt-5 text-gray-600 text-sm leading-7">
                    Helping provide strategic leadership, governance and
                    oversight that strengthens the Foundation's mission and
                    long-term impact.
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
