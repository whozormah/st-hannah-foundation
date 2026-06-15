import fs from "fs";
import path from "path";
import Image from "next/image";

import RelatedStories from "@/components/sections/impact/RelatedStories";
import StoryDonationCTA from "@/components/sections/impact/StoryDonationCTA";
import { notFound } from "next/navigation";

interface StoryData {
  slug: string;
  category: string;
  title: string;
  beneficiaries: string;
  donationProgram: string;
  summary: string;
  date: string;
  location: string;
  image: string;
  images: string[];
  challenge: string;
  response: string;
  impact: string;
  story: string[];
  quote?: {
    text: string;
    author: string;
  };
}

export async function generateStaticParams() {
  const storiesDir = path.join(
    process.cwd(),
    "public",
    "data",
    "impact-stories",
  );

  const files = fs.readdirSync(storiesDir);

  return files
    .filter((file) => file.endsWith(".json") && file !== "stories.json")
    .map((file) => ({
      slug: file.replace(".json", ""),
    }));
}

async function getStory(slug: string): Promise<StoryData | null> {
  try {
    const filePath = path.join(
      process.cwd(),
      "public",
      "data",
      "impact-stories",
      `${slug}.json`,
    );
    const fileContents = fs.readFileSync(filePath, "utf8");

    return JSON.parse(fileContents);
  } catch (error) {
    console.error("Story loading error:", error);

    return null;
  }
}

export default async function StoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const story = await getStory(slug);

  if (!story) {
    notFound();
  }

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
            <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
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

      <section className="py-20 bg-white">
        <div className="container-custom max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#FAF7F2] p-8 rounded-[24px]">
              <p className="text-gray-500 mb-2">Date</p>

              <h3 className="font-bold text-xl">{story.date}</h3>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[24px]">
              <p className="text-gray-500 mb-2">Location</p>

              <h3 className="font-bold text-xl">{story.location}</h3>
            </div>

            <div className="bg-[#FAF7F2] p-8 rounded-[24px]">
              <p className="text-gray-500 mb-2">Beneficiaries</p>

              <h3 className="font-bold text-xl">{story.beneficiaries}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Main Story */}

      <section className="pb-24 bg-white">
        <div className="container-custom max-w-5xl">
          <div className="space-y-16">
            <div>
              <h2 className="text-4xl font-bold mb-6">The Challenge</h2>

              <p className="text-gray-600 leading-9 text-lg">
                {story.challenge}
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">Our Response</h2>

              <p className="text-gray-600 leading-9 text-lg">
                {story.response}
              </p>
            </div>

            <div>
              <h2 className="text-4xl font-bold mb-6">Impact Created</h2>

              <p className="text-gray-600 leading-9 text-lg">{story.impact}</p>
            </div>
          </div>

          {/* Story Narrative */}

          <div className="mt-24 space-y-8">
            {story.story?.map((paragraph, index) => (
              <p key={index} className="text-lg leading-9 text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Story Gallery */}

          {story.images && story.images.length > 0 && (
            <section className="mt-24">
              <div className="mb-10">
                <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
                  Impact Gallery
                </span>

                <h2 className="text-4xl font-bold mt-4">
                  Moments From The Programme
                </h2>

                <p className="text-gray-600 mt-4 max-w-3xl leading-8">
                  Explore photographs captured during the programme and witness
                  the lives touched through this initiative.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {story.images?.map((image, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-[24px] shadow-sm hover:shadow-xl transition duration-300"
                  >
                    <Image
                      src={image}
                      alt={`${story.title} ${index + 1}`}
                      width={800}
                      height={600}
                      className="w-full h-[280px] object-cover hover:scale-105 transition duration-500"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}
          {/* Quote */}

          {story.quote && (
            <div className="mt-24 bg-[#FAF7F2] p-10 md:p-14 rounded-[32px] border-l-4 border-[#844204]">
              <p className="text-2xl italic leading-10 text-gray-700">
                "{story.quote.text}"
              </p>

              <p className="mt-8 font-bold text-[#844204] text-lg">
                {story.quote.author}
              </p>
            </div>
          )}
        </div>
      </section>

      <RelatedStories currentSlug={story.slug} />

      <StoryDonationCTA program={story.donationProgram || "This Programme"} />
    </>
  );
}
