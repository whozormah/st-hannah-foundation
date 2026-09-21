import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import TitleLines from "@/components/shared/TitleLines";
import { getLeadership } from "@/lib/cms";
import { SECTION_COPY } from "@/lib/section-copy";

interface Leader {
  name: string;
  role: string;
  image: string;
  /** Optional. An editor adds a bio in the CMS and it appears here. */
  bio?: string;
}

interface LeadershipPreviewProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  showButton?: boolean;
}

/* The homepage's leadership section (CR-031). At the Foundation's request the
   President stands alone, in her own feature, and the rest of the team sit in
   a separate row beneath her: never grouped with her in one cluster. The
   first leader in the CMS order leads; the others follow in that order. */
export default async function LeadershipPreview({
  eyebrow = SECTION_COPY.leadershipPreview.eyebrow,
  title = SECTION_COPY.leadershipPreview.title,
  description = SECTION_COPY.leadershipPreview.description,
  showButton = true,
}: LeadershipPreviewProps) {
  const [lead, ...team]: Leader[] = await getLeadership();

  if (!lead) return null;

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
                {eyebrow}
              </span>
            )}

            <h2 className={`${eyebrow ? "mt-4 " : ""}text-3xl font-bold leading-tight text-ink md:text-4xl`}>
              <TitleLines text={title} />
            </h2>

            {description && <p className="mt-5 text-lg leading-9 text-gray-700">{description}</p>}
          </div>

          {showButton && (
            <Link
              href="/team"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-brand px-7 py-3 font-semibold text-brand transition-all duration-300 hover:bg-brand hover:text-white"
            >
              Meet the whole team
              <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          )}
        </div>

        {/* The President, on her own */}
        <article className="mt-12 grid items-center overflow-hidden rounded-[28px] border border-accent/20 bg-cream lg:grid-cols-[minmax(0,400px)_1fr]">
          <div className="relative aspect-[4/5] w-full lg:h-full lg:min-h-[440px] lg:aspect-auto">
            <Image
              src={lead.image}
              alt={lead.name}
              fill
              sizes="(max-width: 1024px) 100vw, 400px"
              className="object-cover object-top"
            />
          </div>

          <div className="p-8 lg:p-12">
            <span className="inline-flex rounded-full bg-brand px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-white">
              {lead.role}
            </span>

            <h3 className="mt-6 font-display text-3xl font-bold leading-tight text-ink md:text-4xl">
              {lead.name}
            </h3>

            <div aria-hidden className="mt-6 h-[3px] w-16 rounded-full bg-accent" />

            {/* Nothing invented: a bio appears once the CMS carries one. */}
            {lead.bio && <p className="mt-6 text-lg leading-9 text-gray-700">{lead.bio}</p>}
          </div>
        </article>

        {/* The team, beneath her */}
        {team.length > 0 && (
          <ul className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {team.map((member) => (
              <li key={member.name}>
                <article className="group h-full overflow-hidden rounded-[22px] border border-accent/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[2px] text-brand">
                      {member.role}
                    </p>

                    <h3 className="mt-1.5 text-base font-bold leading-snug text-ink">{member.name}</h3>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
