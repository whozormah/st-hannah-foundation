"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

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
      .then((data) => setStories(data.filter((story: Story) => story.featured)))
      .catch(console.error);
  }, []);

  return (
    <section className="py-24 bg-white">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center mb-16">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Featured Stories{" "}
          </span>
          <h2 className="text-5xl font-bold mt-4">
            Lives Transformed Through Compassion
          </h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {stories.slice(0, 3).map((story) => (
            <Link
              key={story.slug}
              href={`/impact-stories/${story.slug}`}
              className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-8">
                <span className="text-sm uppercase tracking-[3px] text-[#844204]">
                  {story.category}
                </span>

                <h3 className="text-2xl font-bold mt-3">{story.title}</h3>

                <p className="mt-4 text-gray-600 leading-7">{story.excerpt}</p>

                <div className="mt-6 text-[#844204] font-semibold">
                  Read Story →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
