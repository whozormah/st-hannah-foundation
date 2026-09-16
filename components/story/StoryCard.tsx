"use client";

import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
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
  /** The section's small heading and introduction, from the homepage block. */
  eyebrow?: string;
  description?: string;
  onDonate: () => void;
}

/* The Stories of Hope experience (CR-025), fitted to one screen on desktop:
   her video beside her story, the opening and first paragraph shown, the rest
   of her story and why it matters behind "Read her full story" (still in the
   page, so nothing is lost to search or to people who open it), what she
   needs as a row of pills, and a slim appeal. Every word comes from the
   campaign story in the CMS. */

// An icon for each need, matched on the words editors use.
function iconFor(need: string): LucideIcon {
  const words = need.toLowerCase();

  if (/food|feed|meal|nutrition/.test(words)) return UtensilsCrossed;
  if (/medic|health|hospital|care/.test(words)) return HeartPulse;
  if (/educat|school|learn|tuition/.test(words)) return GraduationCap;
  if (/accommodat|home|house|shelter|rent|housing/.test(words)) return House;

  return HandHeart;
}

export default function StoryCard({ story, eyebrow, description, onDonate }: StoryCardProps) {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [expanded, setExpanded] = useState(false);

  const galleryImages = [story.heroImage, ...(story.gallery ?? [])];
  const [opening, first, ...more] = story.description;
  const hasMore = more.length > 0 || Boolean(story.whyStoryMattersTitle || story.whyStoryMatters);

  // First name only, so the appeal reads naturally for whichever story is
  // featured rather than being written for one person.
  const firstName = story.name.split(" ")[0];

  const nextImage = () =>
    setCurrentImage((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));

  const previousImage = () =>
    setCurrentImage((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));

  return (
    <>
      <div className="grid items-center gap-10 lg:grid-cols-[auto_1fr] xl:gap-16">
        <StoryVisualPanel
          story={story}
          imageCount={galleryImages.length}
          onGalleryOpen={() => {
            setCurrentImage(0);
            setGalleryOpen(true);
          }}
        />

        <article>
          {eyebrow && (
            <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-brand">
              <Rays className="h-5 w-8 shrink-0 text-accent" />
              {eyebrow}
            </p>
          )}

          {description && <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{description}</p>}

          {/* The one heading for this section. */}
          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-ink lg:text-[2.1rem] xl:text-[2.4rem]">
            {story.headline}
          </h2>

          {opening && (
            <p className="mt-5 font-display text-xl leading-relaxed text-ink/90 md:text-2xl">{opening}</p>
          )}

          {first && <p className="mt-3 leading-8 text-gray-700">{first}</p>}

          {hasMore && (
            <>
              <div id="story-more" hidden={!expanded} className="mt-3 space-y-3 leading-8 text-gray-700">
                {more.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)}>{paragraph}</p>
                ))}

                {(story.whyStoryMattersTitle || story.whyStoryMatters) && (
                  <figure className="pt-3">
                    {story.whyStoryMattersTitle && (
                      <p className="font-display text-2xl italic leading-snug text-brand">
                        <span aria-hidden className="mr-1 text-accent">
                          &ldquo;
                        </span>
                        {story.whyStoryMattersTitle}
                      </p>
                    )}
                    {story.whyStoryMatters && (
                      <figcaption className="mt-2 leading-8 text-gray-700">{story.whyStoryMatters}</figcaption>
                    )}
                  </figure>
                )}
              </div>

              <button
                type="button"
                aria-expanded={expanded}
                aria-controls="story-more"
                onClick={() => setExpanded((open) => !open)}
                className="mt-3 inline-flex items-center gap-2 font-semibold text-brand underline-offset-4 hover:underline"
              >
                {expanded ? "Show less" : "Read her full story"}
                <ChevronDown aria-hidden size={18} className={`transition-transform ${expanded ? "rotate-180" : ""}`} />
              </button>
            </>
          )}

          {story.needs?.length > 0 && (
            <section aria-labelledby="story-needs" className="mt-6">
              <h3 id="story-needs" className="text-xs font-semibold uppercase tracking-[3px] text-brand">
                What {firstName} needs
              </h3>

              <ul className="mt-3 flex flex-wrap gap-2.5">
                {story.needs.map((need) => {
                  const Icon = iconFor(need);

                  return (
                    <li
                      key={need}
                      className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-white py-1.5 pl-1.5 pr-4 shadow-[0_12px_30px_-22px_rgba(132,66,4,0.5)]"
                    >
                      <span
                        aria-hidden
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-brand to-[#B8741C] text-white"
                      >
                        <Icon size={16} />
                      </span>
                      <span className="font-semibold text-ink">{need}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {/* Appeal */}
          <div className="relative mt-7 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#2A1703] via-brand-dark to-brand px-6 py-5 text-white shadow-[0_30px_70px_-40px_rgba(46,27,5,0.8)] md:px-7">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(245,210,122,0.25),transparent_65%)]"
            />

            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-2xl font-bold leading-tight">Stand with {firstName}</h3>

                <ul className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/80">
                  <li className="inline-flex items-center gap-1.5">
                    <ShieldCheck size={15} aria-hidden className="text-accent-soft" />
                    Secure payment
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Check size={15} aria-hidden className="text-accent-soft" />
                    Instant receipt
                  </li>
                </ul>
              </div>

              <button
                type="button"
                onClick={onDonate}
                className="group inline-flex shrink-0 items-center justify-center gap-3 rounded-full bg-accent px-7 py-3.5 font-bold text-ink transition hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
              >
                Help {firstName} Rebuild
                <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-1" />
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
