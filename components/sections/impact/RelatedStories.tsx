import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import allStories from "@/public/data/impact-stories/stories.json";

interface Story {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
}

export default function RelatedStories({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const stories: Story[] = (allStories as Story[])
    .filter((story) => story.slug !== currentSlug)
    .slice(0, 3);

  if (!stories.length) return null;

  return (
    <section className="bg-cream py-32">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto mb-20 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-brand">
            Continue Reading
          </span>

          <h2 className="mt-5 text-5xl font-bold text-ink md:text-6xl">
            More Stories
            <br />
            That Inspire Hope
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-accent" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-700">
            Every story reflects lives transformed through compassion,
            generosity and sustainable community impact.
          </p>
        </div>

        {/* Stories */}

        <div className="grid gap-8 lg:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/impact-stories/${story.slug}`}
              className="group overflow-hidden rounded-[36px] border border-gray-100 bg-white shadow-xl transition-all duration-500 hover:-translate-y-3 hover:border-accent/40 hover:shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                <div className="absolute left-5 top-5">
                  <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-brand">
                    {story.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold leading-tight text-ink">
                  {story.title}
                </h3>

                <div className="mt-5 h-[3px] w-14 rounded-full bg-accent" />

                <p className="mt-6 leading-8 text-gray-700">{story.excerpt}</p>

                <div className="mt-8 inline-flex items-center gap-2 font-semibold text-brand">
                  Read Story
                  <ArrowRight
                    size={18}
                    className="transition duration-300 group-hover:translate-x-2"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom */}

        <div className="mx-auto mt-24 max-w-5xl rounded-[40px] bg-white p-14 text-center shadow-xl">
          <span className="uppercase tracking-[5px] text-brand">
            More Than Stories
          </span>

          <h3 className="mt-5 text-4xl font-bold text-ink">
            Every Story Is A Reminder That Hope Is Possible
          </h3>

          <div className="mx-auto mt-6 h-[3px] w-20 rounded-full bg-accent" />

          <p className="mt-8 text-lg leading-9 text-gray-700">
            These stories celebrate courage, resilience and transformation. They
            remind us that when communities come together with compassion,
            extraordinary change becomes possible.
          </p>
        </div>
      </div>
    </section>
  );
}
