import Link from "next/link";
import { ArrowRight } from "lucide-react";

import LeadershipCards, { type Leader } from "@/components/shared/LeadershipCards";
import TitleLines from "@/components/shared/TitleLines";
import { getLeadership } from "@/lib/cms";
import { SECTION_COPY } from "@/lib/section-copy";

interface LeadershipPreviewProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  showButton?: boolean;
}

/* The homepage's leadership section (CR-031): the President alone on the
   first row, the team beneath her, every leader in the same card
   (LeadershipCards). The first leader in the CMS order leads. */
export default async function LeadershipPreview({
  eyebrow = SECTION_COPY.leadershipPreview.eyebrow,
  title = SECTION_COPY.leadershipPreview.title,
  description = SECTION_COPY.leadershipPreview.description,
  showButton = true,
}: LeadershipPreviewProps) {
  const leaders: Leader[] = await getLeadership();

  if (!leaders.length) return null;

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

        <LeadershipCards leaders={leaders} />
      </div>
    </section>
  );
}
