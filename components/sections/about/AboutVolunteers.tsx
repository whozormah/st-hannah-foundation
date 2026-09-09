import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import volunteersData from "@/public/data/volunteers.json";

interface Volunteer {
  name: string;
  role: string;
  image: string;
}

const volunteers: Volunteer[] = volunteersData;

export default function AboutVolunteers() {
  if (!volunteers.length) return null;

  return (
    <section className="bg-cream py-14 md:py-24">
      <div className="container-custom">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
              Volunteer Leadership
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              The heartbeat of our mission
            </h2>

            <p className="mt-5 text-lg leading-9 text-gray-700">
              Behind every outreach is a team giving their time and skills.
            </p>
          </div>

          <Link
            href="/volunteer"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full border border-brand px-7 py-3 font-semibold text-brand transition-all duration-300 hover:bg-brand hover:text-white"
          >
            Volunteer with us
            <ArrowRight
              size={18}
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {volunteers.map((volunteer) => (
            <li key={volunteer.name}>
              <article className="group h-full overflow-hidden rounded-[24px] border border-accent/15 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
                  <Image
                    src={volunteer.image}
                    alt={volunteer.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                  />
                </div>

                <div className="p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[2px] text-brand">
                    {volunteer.role}
                  </p>

                  <h3 className="mt-2 text-xl font-bold leading-tight text-ink">
                    {volunteer.name}
                  </h3>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
