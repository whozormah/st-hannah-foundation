import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import governance from "@/public/data/governance.json";

interface Leader {
  name: string;
  role: string;
  image: string;
  /** Optional. Add a bio to governance.json and it appears here. */
  bio?: string;
}

const allLeaders: Leader[] = governance;

// A preview with a link to /team, which lists everyone. Rendering all six here
// cost six phone screens on the homepage.
const leaders = allLeaders.slice(0, 3);

interface LeadershipPreviewProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  showButton?: boolean;
}

export default function LeadershipPreview({
  eyebrow = "Governance & Leadership",
  title = "Meet the leaders behind the mission",
  description = "The people responsible for the Foundation's direction, oversight and accountability.",
  showButton = true,
}: LeadershipPreviewProps) {
  if (!leaders.length) return null;

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
              {eyebrow}
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              {title}
            </h2>

            <p className="mt-5 text-lg leading-9 text-gray-700">{description}</p>
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

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {leaders.map((leader) => (
            <li key={leader.name}>
              <article className="group h-full overflow-hidden rounded-[24px] border border-accent/15 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>

                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[2px] text-brand">
                    {leader.role}
                  </p>

                  <h3 className="mt-2 text-xl font-bold leading-tight text-ink">
                    {leader.name}
                  </h3>

                  {/* Nothing invented here. The previous version printed a
                      quotation attributed to the President that appears
                      nowhere in the data, and a generic paragraph under the
                      others. */}
                  {leader.bio && (
                    <p className="mt-3 leading-8 text-gray-700">{leader.bio}</p>
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
