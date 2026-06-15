"use client";

import { useEffect, useState } from "react";

import PageHeader from "@/components/shared/PageHeader";
import ImpactStorySection from "@/components/shared/ImpactStorySection";
import ImpactArchive from "@/components/sections/impact/ImpactArchive";
import ImpactCTA from "@/components/sections/impact/ImpactCTA";
import FeaturedStoriesGrid from "@/components/sections/impact/FeaturedStoriesGrid";

interface Story {
  slug: string;
  category: string;
  title: string;
  date: string;
  location: string;
  image: string;
  images: string[];
  videoUrl: string;
  galleryLink: string;
  description: string;
}

interface ImpactStats {
  widowsSupported: string;
  childrenReached: string;
  communityOutreachEvents: string;
  livesImpacted: string;
}

export default function ImpactStoriesPage() {
  const [visibleStories, setVisibleStories] = useState(3);
  const [stories, setStories] = useState<Story[]>([]);

  const [stats, setStats] = useState<ImpactStats>({
    widowsSupported: "0",
    childrenReached: "0",
    communityOutreachEvents: "0",
    livesImpacted: "0",
  });

  useEffect(() => {
    fetch("/data/impact-stories/stories.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load stories");
        }

        return res.json();
      })
      .then((data) => setStories(data))
      .catch((err) => console.error(err));
    fetch("/data/stats.json")
      .then((res) => res.json())
      .then((data) => {
        if (data.impact) {
          setStats(data.impact);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {" "}
      <PageHeader
        title="Impact Stories"
        subtitle="Explore the lives transformed, communities empowered and stories of hope made possible through the work of St. Hannah Foundation and the generosity of our supporters."
      />
      {/* Impact Statistics */}
      <section className="py-20 bg-[#FAF7F2]">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-3xl text-center shadow-sm">
              <h3 className="text-5xl font-bold text-[#844204]">
                {stats.widowsSupported}
              </h3>

              <p className="mt-3 text-gray-600">Widows Supported</p>
            </div>

            <div className="bg-white p-8 rounded-3xl text-center shadow-sm">
              <h3 className="text-5xl font-bold text-[#844204]">
                {stats.childrenReached}
              </h3>

              <p className="mt-3 text-gray-600">Children Reached</p>
            </div>

            <div className="bg-white p-8 rounded-3xl text-center shadow-sm">
              <h3 className="text-5xl font-bold text-[#844204]">
                {stats.communityOutreachEvents}
              </h3>

              <p className="mt-3 text-gray-600">Community Outreach Events</p>
            </div>

            <div className="bg-white p-8 rounded-3xl text-center shadow-sm">
              <h3 className="text-5xl font-bold text-[#844204]">
                {stats.livesImpacted}
              </h3>

              <p className="mt-3 text-gray-600">Lives Impacted</p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Stories */}
      <FeaturedStoriesGrid />
      {/* Impact Stories */}
      {stories.slice(0, visibleStories).map((story, index) => (
        <ImpactStorySection
          key={story.slug}
          category={story.category}
          title={story.title}
          date={story.date}
          location={story.location}
          image={story.image}
          images={story.images}
          videoUrl={story.videoUrl}
          galleryLink={story.galleryLink}
          description={story.description}
          reverse={index % 2 !== 0}
        />
      ))}
      {/* Load More */}
      {visibleStories < stories.length && (
        <div className="text-center py-10">
          <button
            onClick={() => setVisibleStories((prev) => prev + 3)}
            className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6e3503] transition"
          >
            View More Stories Of Impact
          </button>
        </div>
      )}
      {/* Archive */}
      <ImpactArchive />
      <ImpactCTA />
    </>
  );
}
