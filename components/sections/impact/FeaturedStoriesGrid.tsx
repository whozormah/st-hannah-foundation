"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Story {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  image: string;
  featured: boolean;
}

export default function FeaturedStoriesGrid() {
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetch("/data/impact-stories/stories.json")
      .then((res) => res.json())
      .then((data: Story[]) =>
        setStories(data.filter((story) => story.featured)),
      )
      .catch(console.error);
  }, []);

  return (
    <section className="bg-white py-28">
      <div className="container-custom">
        <div className="mx-auto mb-20 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-[#844204]">
            Featured Stories
          </span>

          <h2 className="mt-5 text-5xl font-bold leading-tight text-[#1B1815] md:text-6xl">
            Behind Every Number
            <br />
            Is A Human Story
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[#D9A441]" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            Every child supported, every widow empowered and every family
            strengthened represents more than a statistic. These stories capture
            the courage, resilience and hope that continue to inspire our
            mission every day.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {stories.slice(0, 4).map((story) => (
            <Link
              key={story.slug}
              href={`/impact-stories/${story.slug}`}
              className="group overflow-hidden rounded-[34px] border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5">
                  <span className="rounded-full bg-[#D9A441] px-4 py-2 text-xs font-bold uppercase tracking-[3px] text-[#2E1B05]">
                    {story.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold leading-tight text-[#1B1815] transition-colors group-hover:text-[#844204]">
                  {story.title}
                </h3>

                <p className="mt-5 leading-8 text-gray-600">{story.excerpt}</p>

                <div className="mt-8 inline-flex items-center gap-2 font-semibold text-[#844204]">
                  Read Full Story
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
