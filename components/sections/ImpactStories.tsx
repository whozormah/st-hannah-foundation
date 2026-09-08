import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import storiesData from "@/public/data/impact-stories/stories.json";

interface Story {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
}

const stories: Story[] = storiesData;

export default function ImpactStories() {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        {/* Header */}

        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-brand font-semibold">
            Stories Of Transformation
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-ink">
            Lives Changed Through Compassion
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-700 text-lg leading-8">
            Behind every program is a story of resilience, hope and lives being
            transformed through compassion and support.
          </p>
        </div>

        {/* Stories */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div
              key={story.slug}
              className="group bg-white rounded-[28px] overflow-hidden border border-accent/20 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-6">
                <span className="text-brand text-sm font-semibold uppercase tracking-[2px]">
                  {story.category}
                </span>

                <h3 className="text-2xl font-bold mt-3 text-ink">
                  {story.title}
                </h3>

                <p className="mt-4 text-gray-700 leading-7">{story.excerpt}</p>

                <Link
                  href={`/impact-stories/${story.slug}`}
                  className="inline-flex items-center gap-2 mt-6 text-brand font-semibold hover:gap-3 transition-all"
                >
                  Read Full Story
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}

        <div className="text-center mt-16">
          <Link
            href="/impact-stories"
            className="inline-flex items-center gap-3 bg-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-dark transition"
          >
            View All Impact Stories
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
