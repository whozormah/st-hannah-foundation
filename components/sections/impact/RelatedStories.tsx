"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
  const [stories, setStories] = useState<Story[]>([]);

  useEffect(() => {
    fetch("/data/impact-stories/stories.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load stories");
        }

        return res.json();
      })
      .then((data) => {
        const filtered = data
          .filter((story: Story) => story.slug !== currentSlug)
          .slice(0, 3);

        setStories(filtered);
      })
      .catch(console.error);
  }, [currentSlug]);

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            More Stories
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Continue Exploring Our Impact
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {stories.map((story) => (
            <Link
              key={story.slug}
              href={`/impact-stories/${story.slug}`}
              className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition"
            >
              <div className="relative h-72">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
              </div>

              <div className="p-8">
                <span className="uppercase tracking-[3px] text-sm text-[#844204]">
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
