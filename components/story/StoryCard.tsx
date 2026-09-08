"use client";

import { useState } from "react";

import { Story } from "@/types/story";

import StoryVisualPanel from "./StoryVisualPanel";
import StoryGalleryModal from "./StoryGalleryModal";

interface StoryCardProps {
  story: Story;
  onDonate: () => void;
}

export default function StoryCard({ story, onDonate }: StoryCardProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const galleryImages = [story.heroImage, ...(story.gallery ?? [])];

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );
  };

  const previousImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );
  };

  return (
    <>
      <div className="grid items-start gap-24 xl:grid-cols-[560px_1fr]">
        {/* LEFT */}

        <StoryVisualPanel
          story={story}
          imageCount={galleryImages.length}
          onGalleryOpen={() => {
            setCurrentImage(0);
            setGalleryOpen(true);
          }}
        />

        {/* RIGHT */}

        <div className="pt-6">
          <span className="inline-flex rounded-full border border-[#D9A441]/20 bg-[#844204]/10 px-6 py-3 text-sm font-semibold text-[#844204]">
            {story.tagline}
          </span>

          <h2 className="mt-8 max-w-4xl text-6xl font-bold leading-tight text-[#1B1815]">
            {story.headline}
          </h2>

          <div className="mt-8 h-1 w-24 rounded-full bg-[#D9A441]" />

          <div className="mt-14 space-y-10 text-[20px] leading-10 text-gray-700">
            {story.description.map((paragraph, index) => (
              <p key={index} className="max-w-4xl">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Editorial Quote */}

          {/* Why Story Matters + Donation */}

          <div className="mt-20 grid gap-10 xl:grid-cols-[1.2fr_420px] items-start">
            {/* Quote */}

            <div className="relative">
              <div className="absolute -left-6 -top-16 text-[180px] font-serif leading-none text-[#D9A441]/10">
                &quot;
              </div>

              <div className="relative border-l-4 border-[#D9A441] pl-8">
                <span className="text-sm font-semibold uppercase tracking-[4px] text-[#844204]">
                  Why This Story Matters
                </span>

                <h3 className="mt-6 text-4xl font-bold leading-tight text-[#1B1815]">
                  {story.whyStoryMattersTitle}
                </h3>

                <p className="mt-8 text-xl leading-10 text-gray-600">
                  {story.whyStoryMatters}
                </p>
              </div>
            </div>

            {/* Donation Card */}

            <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#844204] via-[#95520F] to-[#B8741C] p-9 text-white shadow-[0_30px_70px_rgba(0,0,0,.18)]">
              <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[4px] backdrop-blur">
                Hope Begins With You
              </span>

              <h3 className="mt-6 text-3xl font-bold leading-tight">
                Help Rewrite Esther&apos;s Story
              </h3>

              <p className="mt-5 leading-8 text-white/90">
                Every gift helps provide education, healthcare, protection and
                renewed hope for vulnerable children and families like Esther&apos;s.
              </p>

              <div className="mt-8 space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[#F5D27A]">✓</span>
                  <span>100% Secure Donation</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#F5D27A]">✓</span>
                  <span>Instant Donation Receipt</span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="text-[#F5D27A]">✓</span>
                  <span>Every Gift Makes A Difference</span>
                </div>
              </div>

              <button
                onClick={onDonate}
                className="mt-10 w-full rounded-2xl bg-white px-6 py-4 text-lg font-bold text-[#844204] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Support Esther&apos;s Story
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}

      {/* Gallery */}

      <StoryGalleryModal
        isOpen={galleryOpen}
        images={galleryImages}
        storyName={story.name}
        currentImage={currentImage}
        onClose={() => setGalleryOpen(false)}
        onNext={nextImage}
        onPrevious={previousImage}
        onSelect={setCurrentImage}
      />
    </>
  );
}
