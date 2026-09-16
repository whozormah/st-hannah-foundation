"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  GraduationCap,
  HandHeart,
  HeartPulse,
  House,
  ShieldCheck,
  UtensilsCrossed,
  type LucideIcon,
} from "lucide-react";

import Rays from "@/components/shared/Rays";
import { Story } from "@/types/story";

import StoryVisualPanel from "./StoryVisualPanel";
import StoryGalleryModal from "./StoryGalleryModal";

interface StoryCardProps {
  story: Story;
  onDonate: () => void;
}

/* The Stories of Hope experience (CR-025): her video beside her story, set
   like a personal letter rather than a report. The opening paragraph leads,
   large; the areas of her life the Foundation supports are shown as four
   warm cards; why it matters is a quotation; the appeal closes it. Every word
   comes from the campaign story in the CMS. */

// An icon for each area of support, matched on the words editors use.
function iconFor(area: string): LucideIcon {
  const words = area.toLowerCase();

  if (/food|feed|meal|nutrition/.test(words)) return UtensilsCrossed;
  if (/medic|health|hospital|care/.test(words)) return HeartPulse;
  if (/educat|school|learn|tuition/.test(words)) return GraduationCap;
  if (/accommodat|home|house|shelter|rent|housing/.test(words)) return House;

  return HandHeart;
}

export default function StoryCard({ story, onDonate }: StoryCardProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  const galleryImages = [story.heroImage, ...(story.gallery ?? [])];
  const [opening, ...rest] = story.description;

  // First name only, so the appeal reads naturally for whichever story is
  // featured rather than being written for one person.
  const firstName = story.name.split(" ")[0];

  const nextImage = () =>
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  const previousImage = () =>
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  return (
    <>
      <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,440px)_1fr] xl:gap-20">
        <StoryVisualPanel
          story={story}
          imageCount={galleryImages.length}
          onGalleryOpen={() => {
            setCurrentImage(0);
            setGalleryOpen(true);
          }}
        />

        <article>
          <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-brand">
            <Rays className="h-5 w-8 shrink-0 text-accent" />
            {firstName}&apos;s Story
          </p>

          {/* The one heading for this section. */}
          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl">
            {story.headline}
          </h2>

          {opening && (
            <p className="mt-8 font-display text-2xl leading-relaxed text-ink/90 md:text-[1.7rem]">
              {opening}
            </p>
          )}

          {rest.length > 0 && (
            <div className="mt-6 space-y-5 text-lg leading-9 text-gray-700">
              {rest.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
            </div>
          )}

          {story.needs?.length > 0 && (
            <section aria-labelledby="story-support" className="mt-12">
              <h3
                id="story-support"
                className="text-sm font-semibold uppercase tracking-[3px] text-brand"
              >
                How we&apos;re standing with {firstName}
              </h3>

              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {story.needs.map((area) => {
                  const Icon = iconFor(area);

                  return (
                    <li
                      key={area}
                      className="reveal-rise flex items-center gap-4 rounded-[22px] border border-accent/20 bg-white/80 p-5 shadow-[0_20px_50px_-35px_rgba(132,66,4,0.45)]"
                    >
                      <span
                        aria-hidden
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-[#B8741C] text-white"
                      >
                        <Icon size={22} />
                      </span>
                      <span className="font-display text-xl font-bold text-ink">{area}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Why this story matters, as a quotation */}
          {(story.whyStoryMattersTitle || story.whyStoryMatters) && (
            <figure className="mt-14">
              <span aria-hidden className="block font-display text-7xl leading-none text-accent">
                &ldquo;
              </span>

              {story.whyStoryMattersTitle && (
                <p className="-mt-6 font-display text-3xl italic leading-snug text-brand md:text-4xl">
                  {story.whyStoryMattersTitle}
                </p>
              )}

              {story.whyStoryMatters && (
                <figcaption className="mt-5 text-lg leading-9 text-gray-700">
                  {story.whyStoryMatters}
                </figcaption>
              )}
            </figure>
          )}

          {/* Appeal */}
          <div className="relative mt-14 overflow-hidden rounded-[32px] bg-gradient-to-br from-[#2A1703] via-brand-dark to-brand p-8 text-white shadow-[0_40px_90px_-40px_rgba(46,27,5,0.8)] md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(245,210,122,0.25),transparent_65%)]"
            />

            <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[3px] text-accent-soft">
                  Be part of what happens next
                </p>

                <h3 className="mt-3 font-display text-3xl font-bold leading-tight md:text-4xl">
                  Stand with {firstName}
                </h3>

                <p className="mt-4 max-w-xl leading-8 text-white/85">
                  Every gift helps provide education, healthcare, protection and
                  renewed hope for families in the same circumstances.
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-7 gap-y-3 text-sm text-white/85">
                  <li className="inline-flex items-center gap-2">
                    <ShieldCheck size={16} aria-hidden className="text-accent-soft" />
                    Secure payment
                  </li>

                  <li className="inline-flex items-center gap-2">
                    <Check size={16} aria-hidden className="text-accent-soft" />
                    Instant receipt
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={onDonate}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-full bg-accent px-8 py-4 text-lg font-bold text-ink transition hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft md:w-auto"
              >
                Help {firstName} Rebuild
                <ArrowRight aria-hidden size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </article>
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
