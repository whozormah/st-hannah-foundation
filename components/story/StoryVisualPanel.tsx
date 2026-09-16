"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight, Images, Volume2 } from "lucide-react";

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
  const player = useRef<HTMLVideoElement>(null);
  const [withSound, setWithSound] = useState(false);
  const [moving, setMoving] = useState(false);

  // Plays silently on its own only for visitors who have not asked for less
  // motion; everyone else sees the picture until they choose to play.
  useEffect(() => {
    if (!story.video) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMoving(!reduce.matches);

    update();
    reduce.addEventListener("change", update);

    return () => reduce.removeEventListener("change", update);
  }, [story.video]);

  useEffect(() => {
    const video = player.current;

    if (!video || withSound) return;
    if (moving) video.play().catch(() => {});
    else video.pause();
  }, [moving, withSound]);

  const playWithSound = () => {
    const video = player.current;

    if (!video) return;

    setWithSound(true);
    video.muted = false;
    video.volume = 1;
    video.loop = false;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  return (
    <div className="relative lg:sticky lg:top-28">
      {/* A thin gold frame, like a treasured photograph (CR-025). */}
      <span aria-hidden className="pointer-events-none absolute -inset-2.5 rounded-[40px] border border-accent/40" />
      <figure className="relative overflow-hidden rounded-[32px] bg-white shadow-[0_40px_90px_-40px_rgba(46,27,5,0.55)]">
        {/* A video keeps its own tall shape: filling the 4:5 picture frame
            would crop the top and bottom, and with them the subtitles
            recorded in it — how visitors follow her story with the sound
            off, and how deaf visitors follow it at all. */}
        <div className={`relative w-full bg-black ${story.video ? "aspect-[9/16]" : "aspect-[4/5]"}`}>
          {story.video ? (
            /* Her own video in place of the picture: silent on a loop until a
               visitor taps for sound, then from the start with controls. */
            <video
              ref={player}
              src={story.video}
              poster={story.heroImage}
              aria-label={`${story.name} tells her story`}
              muted={!withSound}
              loop={!withSound}
              controls={withSound}
              // Tapping the video itself turns the sound on too: that is where
              // people tap. Once it has sound, the controls take over.
              onClick={withSound ? undefined : playWithSound}
              playsInline
              preload="metadata"
              className={`absolute inset-0 h-full w-full object-cover ${withSound ? "" : "cursor-pointer"}`}
            />
          ) : (
            <Image
              src={story.heroImage}
              alt={`${story.name}, photographed for her story`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 440px"
              className="object-cover"
            />
          )}

          <div
            className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-7 pt-16 transition-opacity ${
              withSound ? "opacity-0" : ""
            }`}
          >
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

            {/* Beneath her name, never over the subtitles at the top. */}
            {story.video && !withSound && (
              <button
                type="button"
                onClick={playWithSound}
                className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink shadow-lg transition hover:bg-cream"
              >
                <Volume2 aria-hidden size={16} className="text-brand" />
                {moving ? "Tap for sound" : "Play with sound"}
              </button>
            )}
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
                Photographs
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
