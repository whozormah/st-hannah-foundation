import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Crown } from "lucide-react";

import governance from "@/public/data/governance.json";

interface Leader {
  name: string;
  role: string;
  image: string;
  // Not yet supplied for every board member in governance.json.
  bio?: string;
}

const leaders: Leader[] = governance;

interface LeadershipPreviewProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  showButton?: boolean;
}

export default function LeadershipPreview({
  eyebrow = "Governance & Leadership",
  title = "Meet The Leaders Behind The Mission",
  description = "Behind every initiative is a dedicated team committed to advancing our mission, strengthening communities and ensuring every programme delivers meaningful, measurable and lasting impact.",
  showButton = true,
}: LeadershipPreviewProps) {
  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Decorative Background */}

      <div className="absolute inset-0">
        <div className="absolute -top-48 left-0 h-[520px] w-[520px] rounded-full bg-cream" />

        <div className="absolute right-0 bottom-0 h-[420px] w-[420px] rounded-full bg-cream/70" />
      </div>

      <div className="container-custom relative">
        {/* Heading */}

        <div className="mx-auto mb-24 max-w-4xl text-center">
          <span className="uppercase tracking-[6px] text-brand font-semibold">
            {eyebrow}
          </span>

          <h2 className="mt-5 text-5xl md:text-6xl font-bold leading-tight text-ink">
            {title}
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-700">
            {description}
          </p>
        </div>

        {/* Cards */}

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => {
            const isFounder = leader.role === "President";

            return (
              <div
                key={leader.name}
                className={`group relative overflow-hidden rounded-[34px] bg-white transition-all duration-700 hover:-translate-y-3 ${
                  isFounder
                    ? "border-2 border-accent shadow-[0_25px_70px_rgba(217,164,65,0.18)]"
                    : "border border-gray-100 shadow-lg hover:shadow-2xl"
                }`}
              >
                {/* Premium Badge */}
                {isFounder && (
                  <div className="absolute right-6 top-6 z-30">
                    <div className="flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-[#2E1B05] shadow-lg">
                      <Crown size={14} />
                      Founder
                    </div>
                  </div>
                )}
                {/* Image Area */}
                <div
                  className={`relative overflow-hidden ${
                    isFounder
                      ? "bg-gradient-to-b from-[#F8F1E5] via-cream to-white"
                      : "bg-cream"
                  }`}
                >
                  {/* Decorative Glow */}

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#F8E6C8_0%,transparent_70%)]" />

                  <div className="relative h-[380px]">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className={`object-contain object-bottom p-6 transition-all duration-1000 ease-out ${
                        isFounder
                          ? "grayscale group-hover:grayscale-0 group-hover:scale-[1.05]"
                          : "group-hover:scale-[1.04]"
                      }`}
                    />
                  </div>

                  {/* Gold Divider */}

                  <div
                    className={`h-[2px] w-full ${
                      isFounder ? "bg-accent" : "bg-gray-100"
                    }`}
                  />
                </div>{" "}
                {/* Content */}
                <div className="flex h-[330px] flex-col p-8">
                  {isFounder && (
                    <span className="inline-flex w-fit items-center rounded-full bg-[#FFF7E8] px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-brand">
                      Founder & President
                    </span>
                  )}

                  <h3 className="mt-6 text-3xl font-bold leading-tight text-ink">
                    {leader.name}
                  </h3>

                  <p
                    className={`mt-2 font-semibold ${
                      isFounder ? "text-brand" : "text-[#9A6A17]"
                    }`}
                  >
                    {leader.role}
                  </p>

                  {/* Founder Card */}

                  {isFounder ? (
                    <>
                      <div className="mt-6">
                        <div className="mb-6 h-[2px] w-16 rounded-full bg-accent" />

                        <blockquote className="relative pl-6 italic leading-8 text-gray-700">
                          <span className="absolute -left-1 -top-6 text-6xl font-serif text-accent/20">
                            &quot;
                          </span>
                          Transforming lives begins with compassion, commitment
                          and collective action.
                        </blockquote>
                      </div>

                      <div className="mt-auto pt-8">
                        <div className="rounded-2xl border border-accent/20 bg-[#FFF9F0] p-5">
                          <p className="text-sm leading-7 text-gray-700">
                            Providing visionary leadership and strategic
                            direction while inspiring sustainable impact across
                            communities.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      {leader.bio && (
                        <p className="mt-6 leading-8 text-gray-700">
                          {leader.bio}
                        </p>
                      )}

                      <div className="mt-auto pt-8">
                        <div className="h-px w-14 bg-accent/50" />
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}

        {showButton && (
          <div className="mt-20 text-center">
            <Link
              href="/team"
              className="group inline-flex items-center gap-3 rounded-full bg-brand px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-brand-dark hover:shadow-xl"
            >
              View Full Leadership Team
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
