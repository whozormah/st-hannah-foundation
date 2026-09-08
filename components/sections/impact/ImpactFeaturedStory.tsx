import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Users, CalendarDays } from "lucide-react";

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

// Reads the lead story from stories.json. It previously featured the campaign
// from campaigns.json, which is the same story the homepage leads with, so the
// same person headlined both pages.
const stories = allStories as Story[];
const story = stories.find((item) => item.featured) ?? stories[0];

export default function ImpactFeaturedStory() {
  if (!story) return null;

  return (
    <section className="bg-white py-20">
      <div className="container-custom">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            Featured Story
          </span>
        </div>

        <article className="mt-8 grid items-stretch gap-0 overflow-hidden rounded-[32px] border border-accent/15 bg-cream shadow-sm lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[520px]">
            <Image
              src={story.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center p-8 lg:p-12">
            <span className="inline-flex w-fit rounded-full bg-brand/10 px-4 py-2 text-sm font-semibold text-brand">
              {story.category}
            </span>

            <h2 className="mt-6 text-3xl font-bold leading-tight text-ink md:text-4xl">
              {story.title}
            </h2>

            <p className="mt-5 text-lg leading-9 text-gray-700">
              {story.excerpt}
            </p>

            <dl className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
              <div className="flex items-center gap-3">
                <Users size={20} className="text-brand" aria-hidden />

                <div>
                  <dt className="sr-only">Beneficiaries</dt>

                  <dd className="font-bold text-ink">
                    {story.beneficiaries}
                    <span className="ml-1 font-normal text-gray-600">
                      reached
                    </span>
                  </dd>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays size={20} className="text-brand" aria-hidden />

                <div>
                  <dt className="sr-only">Date</dt>

                  <dd className="font-bold text-ink">{story.date}</dd>
                </div>
              </div>
            </dl>

            <Link
              href={`/impact-stories/${story.slug}`}
              className="group mt-10 inline-flex w-fit items-center gap-3 rounded-full bg-brand px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-brand-dark"
            >
              Read the full story
              <ArrowRight
                size={18}
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}
