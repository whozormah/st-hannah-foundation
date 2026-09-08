"use client";

import { useState } from "react";
import { Check, ShieldCheck } from "lucide-react";

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

  // First name only, so the appeal reads naturally for whichever story is
  // featured rather than being written for one person.
  const firstName = story.name.split(" ")[0];

  const nextImage = () =>
    setCurrentImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1,
    );

  const previousImage = () =>
    setCurrentImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1,
    );

  return (
    <>
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,440px)_1fr] xl:gap-16">
        <StoryVisualPanel
          story={story}
          imageCount={galleryImages.length}
          onGalleryOpen={() => {
            setCurrentImage(0);
            setGalleryOpen(true);
          }}
        />

        <div>
          {/* The one heading for this section; the panel and cards below it
              sit underneath in the outline rather than competing with it. */}
          <h2 className="text-4xl font-bold leading-tight text-ink md:text-5xl">
            {story.headline}
          </h2>

          <div className="mt-6 h-1 w-20 rounded-full bg-accent" />

          <div className="mt-8 space-y-6 text-lg leading-9 text-gray-700">
            {story.description.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          {story.needs?.length > 0 && (
            <div className="mt-10 rounded-[24px] border border-accent/25 bg-white p-7">
              <h3 className="text-sm font-semibold uppercase tracking-[3px] text-brand">
                What {firstName} needs
              </h3>

              <ul className="mt-5 flex flex-wrap gap-3">
                {story.needs.map((need) => (
                  <li
                    key={need}
                    className="inline-flex items-center gap-2 rounded-full bg-cream px-4 py-2 font-medium text-ink"
                  >
                    <Check size={16} className="text-brand" aria-hidden />
                    {need}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Why this story matters */}

          <blockquote className="mt-12 border-l-4 border-accent pl-7">
            <p className="text-sm font-semibold uppercase tracking-[3px] text-brand">
              Why this story matters
            </p>

            <h3 className="mt-4 text-2xl font-bold leading-tight text-ink md:text-3xl">
              {story.whyStoryMattersTitle}
            </h3>

            <p className="mt-5 text-lg leading-9 text-gray-700">
              {story.whyStoryMatters}
            </p>
          </blockquote>

          {/* Appeal */}

          <div className="mt-12 overflow-hidden rounded-[28px] bg-gradient-to-br from-brand via-[#95520F] to-[#B8741C] p-8 text-white shadow-[0_24px_60px_rgba(0,0,0,.16)] md:p-10">
            <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <h3 className="text-2xl font-bold leading-tight md:text-3xl">
                  Help rewrite {firstName}&apos;s story
                </h3>

                <p className="mt-4 max-w-xl leading-9 text-white/90">
                  Every gift helps provide education, healthcare, protection and
                  renewed hope for families in the same circumstances.
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/90">
                  <li className="inline-flex items-center gap-2">
                    <ShieldCheck size={16} aria-hidden />
                    Secure payment
                  </li>

                  <li className="inline-flex items-center gap-2">
                    <Check size={16} aria-hidden />
                    Instant receipt
                  </li>
                </ul>
              </div>

              <button
                onClick={onDonate}
                className="w-full rounded-2xl bg-white px-8 py-4 text-lg font-bold text-brand transition-all duration-300 hover:-translate-y-1 hover:shadow-xl md:w-auto"
              >
                Donate
              </button>
            </div>
          </div>
        </div>
      </div>

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
