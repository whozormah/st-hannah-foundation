"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DonationModal from "@/components/shared/DonationModal";
import Rays from "@/components/shared/Rays";

import StoryCard from "@/components/story/StoryCard";
import StoryNavigation from "@/components/story/StoryNavigation";
import StoryProgress from "@/components/story/StoryProgress";

import { useStoryCarousel } from "@/hooks/useStoryCarousel";
import { Story } from "@/types/story";
import { SECTION_COPY, type SectionCopy } from "@/lib/section-copy";

export default function FeaturedCampaign({
  stories,
  eyebrow = SECTION_COPY.donationCallToAction.eyebrow,
  description = SECTION_COPY.donationCallToAction.description,
}: { stories: Story[] } & Omit<SectionCopy, "title">) {
  const [showDonationModal, setShowDonationModal] = useState(false);

  const { current, currentStory, next, previous } = useStoryCarousel(stories);

  if (!stories.length || !currentStory) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-cream py-14 md:py-24">
        {/* Decorative Background */}

        <div className="absolute inset-0">
          <div className="absolute -left-48 -top-40 h-[520px] w-[520px] rounded-full bg-white/70 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-white/60 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-3xl" />
        </div>

        <div className="container-custom relative">
          {/* A lean intro: the story's own headline below is the section
              heading, so this no longer stacks a second full-height header. */}
          <div className="max-w-2xl">
            {eyebrow && (
              <span className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-brand">
                <Rays className="h-5 w-8 shrink-0 text-accent" />
                {eyebrow}
              </span>
            )}

            {description && (
              <p className="mt-4 text-lg leading-9 text-gray-700">{description}</p>
            )}
          </div>

          <div className="mt-14" />

          {/* Navigation only earns its place when there is more than one
              story to move between; campaigns.json currently holds one. */}
          {stories.length > 1 && (
            <div className="mt-20">
              <StoryNavigation
                current={current}
                total={stories.length}
                onPrevious={previous}
                onNext={next}
              />

              <StoryProgress current={current} total={stories.length} />
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStory.id}
              initial={{
                opacity: 0,
                y: 60,
                scale: 0.98,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -60,
                scale: 0.98,
              }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
            >
              {" "}
              <StoryCard
                story={currentStory}
                onDonate={() => setShowDonationModal(true)}
              />
            </motion.div>
          </AnimatePresence>

          {/* Final CTA */}
        </div>
      </section>

      <DonationModal
        isOpen={showDonationModal}
        programName={currentStory.name}
        onClose={() => setShowDonationModal(false)}
      />
    </>
  );
}
