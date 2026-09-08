import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";

import allStories from "@/public/data/impact-stories/stories.json";

interface Story {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  beneficiaries: string;
  date: string;
  featured: boolean;
}

// Every story except the one already featured above it, so no story appears
// twice on the page. The previous grid filtered on `featured` and then sliced
// to four, so medical-aid-outreach (featured: false) had a published page, a
// sitemap entry and no link anywhere on the site.
const all = allStories as Story[];
const lead = all.find((item) => item.featured) ?? all[0];

const stories = all
  .filter((item) => item.slug !== lead?.slug)
  .sort((a, b) => Number(b.featured) - Number(a.featured));

export default function ImpactStoryIndex() {
  if (!stories.length) return null;

  return (
    <section className="bg-white py-20">
      <div className="container-custom">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
              More Stories
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              Behind every number is a person
            </h2>
          </div>

          <p className="shrink-0 text-gray-500">
            {all.length} stories in total
          </p>
        </div>

        <ul className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {stories.map((story) => (
            <li key={story.slug} className="h-full">
              <Link
                href={`/impact-stories/${story.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-accent/15 bg-white shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={story.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />

                  <span className="absolute bottom-4 left-4 rounded-full bg-white/95 px-4 py-2 text-xs font-bold uppercase tracking-[2px] text-brand">
                    {story.category}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h3 className="text-xl font-bold leading-tight text-ink transition-colors group-hover:text-brand">
                    {story.title}
                  </h3>

                  <p className="mt-4 flex-1 leading-8 text-gray-700">
                    {story.excerpt}
                  </p>

                  <div className="mt-6 flex items-center justify-between gap-4 border-t border-accent/15 pt-5">
                    <span className="inline-flex items-center gap-2 text-sm text-gray-600">
                      <Users size={16} className="text-brand" aria-hidden />
                      {story.beneficiaries} reached
                    </span>

                    <span className="inline-flex items-center gap-2 font-semibold text-brand">
                      Read
                      <ArrowRight
                        size={16}
                        aria-hidden
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
