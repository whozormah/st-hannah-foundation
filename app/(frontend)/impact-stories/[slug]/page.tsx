import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import RelatedStories from "@/components/sections/impact/RelatedStories";
import StoryDonationCTA from "@/components/sections/impact/StoryDonationCTA";
import ShareStory from "@/components/sections/impact/story/ShareStory";
import StoryFigures from "@/components/sections/impact/story/StoryFigures";
import StoryGallery from "@/components/sections/impact/story/StoryGallery";
import StoryIncluded from "@/components/sections/impact/story/StoryIncluded";
import StoryNarrative from "@/components/sections/impact/story/StoryNarrative";
import StoryVideos from "@/components/sections/impact/story/StoryVideos";
import StoryVoices from "@/components/sections/impact/story/StoryVoices";
import { getStory } from "@/lib/cms";
import { followRedirect } from "@/lib/redirects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://sthannahfoundation.org";

// The facts band holds two to four cards; each count has its own layout.
const FACT_COLUMNS: Record<number, string> = {
  1: "",
  2: "sm:grid-cols-2",
  3: "md:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const story = await getStory(slug);

  if (!story) {
    return { title: "Story Not Found" };
  }

  return {
    title: story.title,
    description: story.summary,
    alternates: { canonical: `/impact-stories/${slug}` },
    openGraph: {
      type: "article",
      title: `${story.title} | St. Hannah Foundation`,
      description: story.summary,
      url: `/impact-stories/${slug}`,
      images: [{ url: story.image }],
    },
  };
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const story = await getStory(slug);

  if (!story) {
    // An address that changed keeps working (PUB-01, CNT-07).
    await followRedirect(`/impact-stories/${slug}`);
    notFound();
  }

  // With confirmed figures shown in their own band, the count of
  // beneficiaries is not repeated among the facts (CR-021).
  const facts = [
    story.date && { label: "Date", value: <>{story.date}</> },
    story.location && { label: "Location", value: <>{story.location}</> },
    !story.stats.length && story.beneficiaries && { label: "Beneficiaries", value: <>{story.beneficiaries}</> },
    story.programme && {
      label: "Programme",
      value: (
        <Link
          href={`/programs/${story.programme.slug}`}
          className="underline decoration-accent/50 underline-offset-4 transition hover:text-brand hover:decoration-brand"
        >
          {story.programme.title}
        </Link>
      ),
    },
  ].filter(Boolean) as { label: string; value: React.ReactNode }[];

  return (
    <>
      {/* Hero */}

      <section className="relative h-[75vh] overflow-hidden">
        <Image
          src={story.image}
          alt={story.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-custom text-white max-w-5xl">
            <span className="uppercase tracking-[5px] text-accent font-semibold">
              {story.category}
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
              {story.title}
            </h1>

            <p className="text-xl mt-8 max-w-3xl text-gray-200 leading-8">
              {story.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Story Information */}

      {facts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container-custom max-w-6xl">
            <div className={`grid gap-8 ${FACT_COLUMNS[facts.length]}`}>
              {facts.map((fact) => (
                <div key={fact.label} className="bg-cream p-8 rounded-[24px]">
                  <p className="text-gray-500 mb-2">{fact.label}</p>

                  <h3 className="font-bold text-xl">{fact.value}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <StoryFigures stats={story.stats} />

      {/* Main Story */}

      <section className="pb-24 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="space-y-16">
            {story.challenge && (
              <div>
                <h2 className="text-4xl font-bold mb-6">The Challenge</h2>

                <p className="text-gray-700 leading-9 text-lg">
                  {story.challenge}
                </p>
              </div>
            )}

            {story.response && (
              <div>
                <h2 className="text-4xl font-bold mb-6">Our Response</h2>

                <p className="text-gray-700 leading-9 text-lg">
                  {story.response}
                </p>
              </div>
            )}

            {story.impact && (
              <div>
                <h2 className="text-4xl font-bold mb-6">Impact Created</h2>

                <p className="text-gray-700 leading-9 text-lg">{story.impact}</p>
              </div>
            )}
          </div>

          {/* Story Narrative */}

          <div className={story.challenge || story.response || story.impact ? "mt-24" : ""}>
            <StoryNarrative paragraphs={story.story} pictures={story.supportingImages} />
          </div>

          {story.included.length > 0 && (
            <div className="mt-16">
              <StoryIncluded items={story.included} />
            </div>
          )}

          <div className="mt-16">
            <ShareStory title={story.title} url={`${siteUrl}/impact-stories/${story.slug}`} />
          </div>
        </div>
      </section>

      {/* The people the story is about, straight after it (CR-022) */}

      <StoryVoices testimonies={story.testimonies} eyebrow={story.testimoniesHeading} />

      {/* Story Gallery, full width so the photographs lead (CR-021) */}

      {story.gallery.length > 0 && (
        <section className="bg-cream py-16 md:py-24">
          <div className="container-custom">
            <div className="mb-10">
              <span className="uppercase tracking-[5px] text-brand font-semibold">
                Impact Gallery
              </span>

              <h2 className="text-4xl font-bold mt-4">
                Moments From The Programme
              </h2>

              <p className="text-gray-700 mt-4 max-w-3xl leading-8">
                Explore photographs captured during the programme and witness
                the lives touched through this initiative.
              </p>
            </div>

            <StoryGallery title={story.title} pictures={story.gallery} />
          </div>
        </section>
      )}

      <StoryVideos videos={story.videos} />

      {/* Quote */}

      {story.quote && (
        <section className="bg-white py-20">
          <div className="container-custom max-w-5xl">
            <div className="bg-cream p-6 sm:p-10 md:p-14 rounded-[32px] border-l-4 border-brand">
              <p className="text-2xl italic leading-10 text-gray-700">
                &quot;{story.quote.text}&quot;
              </p>

              <p className="mt-8 font-bold text-brand text-lg">
                {story.quote.author}
              </p>
            </div>
          </div>
        </section>
      )}

      <RelatedStories currentSlug={story.slug} />

      <StoryDonationCTA program={story.donationProgram || story.programme?.title || "This Programme"} />
    </>
  );
}
