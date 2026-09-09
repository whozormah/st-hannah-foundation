import Image from "next/image";

import teamData from "@/public/data/governance.json";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  /** Optional. Add a bio to governance.json and it appears on the card. */
  bio?: string;
}

const team: TeamMember[] = teamData;

// The first entry leads the page; the rest follow in the grid.
const [lead, ...others] = team;

export default function AboutGovernance() {
  if (!team.length) return null;

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            Governance &amp; Leadership
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-5xl">
            Stewarding the mission
          </h2>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            The people responsible for the Foundation&apos;s direction,
            oversight and accountability.
          </p>
        </div>

        {/* Lead */}

        <article className="mt-12 grid items-center gap-8 overflow-hidden rounded-[28px] border border-accent/20 bg-cream lg:grid-cols-[minmax(0,420px)_1fr] lg:gap-0">
          <div className="relative aspect-[4/5] w-full lg:h-full lg:aspect-auto lg:min-h-[460px]">
            <Image
              src={lead.image}
              alt={lead.name}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 420px"
              className="object-cover object-top"
            />
          </div>

          <div className="p-8 lg:p-12">
            <span className="inline-flex rounded-full bg-brand px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-white">
              {lead.role}
            </span>

            <h3 className="mt-6 text-3xl font-bold leading-tight text-ink md:text-4xl">
              {lead.name}
            </h3>

            <div aria-hidden className="mt-6 h-[3px] w-16 rounded-full bg-accent" />

            {lead.bio && (
              <p className="mt-6 text-lg leading-9 text-gray-700">{lead.bio}</p>
            )}
          </div>
        </article>

        {/* The rest */}

        <ul className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-5">
          {others.map((member) => (
            <li key={member.name}>
              <article className="group h-full overflow-hidden rounded-[22px] border border-accent/15 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 20vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>

                <div className="p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[2px] text-brand">
                    {member.role}
                  </p>

                  <h3 className="mt-2 text-lg font-bold leading-tight text-ink">
                    {member.name}
                  </h3>

                  {/* No filler: the previous version printed the same
                      "strategic leadership and governance" paragraph under
                      all five of them. A bio appears here once the data
                      carries one. */}
                  {member.bio && (
                    <p className="mt-3 text-sm leading-7 text-gray-700">
                      {member.bio}
                    </p>
                  )}
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
