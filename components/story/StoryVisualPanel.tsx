"use client";

import Image from "next/image";
import { ArrowRight, Images } from "lucide-react";

import { Story } from "@/types/story";

interface StoryVisualPanelProps {
  story: Story;
  imageCount: number;
  onGalleryOpen: () => void;
}

export default function StoryVisualPanel({
  story,
  imageCount,
  onGalleryOpen,
}: StoryVisualPanelProps) {
  const preview = story.gallery?.slice(0, 3) ?? [];

  return (
    <div className="lg:sticky lg:top-28">
      <figure className="overflow-hidden rounded-[32px] bg-white shadow-[0_24px_60px_rgba(0,0,0,.10)]">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src={story.heroImage}
            alt={`${story.name}, photographed for her story`}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 440px"
            className="object-cover"
          />

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 pt-16">
            <p className="text-2xl font-bold text-white">
              {story.name}
              {story.age ? (
                <span className="ml-2 text-lg font-medium text-white/70">
                  {story.age}
                </span>
              ) : null}
            </p>

            <p className="mt-1 text-sm font-semibold uppercase tracking-[3px] text-accent-soft">
              {story.tagline}
            </p>
          </div>
        </div>

        {preview.length > 0 && (
          <figcaption>
            <button
              onClick={onGalleryOpen}
              className="group w-full px-7 py-7 text-left"
            >
              <span className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[3px] text-brand">
                <Images size={16} aria-hidden />
                {imageCount} photographs
              </span>

              <span className="mt-5 flex gap-3">
                {preview.map((image, index) => (
                  <span
                    key={image}
                    className="relative h-20 flex-1 overflow-hidden rounded-xl"
                  >
                    <Image
                      src={image}
                      alt=""
                      fill
                      sizes="140px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {index === preview.length - 1 &&
                      imageCount > preview.length && (
                        <span className="absolute inset-0 flex items-center justify-center bg-black/55 text-sm font-bold text-white">
                          +{imageCount - preview.length}
                        </span>
                      )}
                  </span>
                ))}
              </span>

              <span className="mt-6 flex items-center gap-2 font-semibold text-brand transition-all group-hover:gap-4">
                See the full story in pictures
                <ArrowRight size={18} aria-hidden />
              </span>
            </button>
          </figcaption>
        )}
      </figure>
    </div>
  );
}
