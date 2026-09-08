"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import DonationModal from "@/components/shared/DonationModal";

import StoryCard from "@/components/story/StoryCard";
import StoryNavigation from "@/components/story/StoryNavigation";
import StoryProgress from "@/components/story/StoryProgress";

import { useStoryCarousel } from "@/hooks/useStoryCarousel";
import storiesData from "@/public/data/campaigns.json";
import { Story } from "@/types/story";

const stories: Story[] = storiesData;

export default function FeaturedCampaign() {
  const [showDonationModal, setShowDonationModal] = useState(false);

  const { current, currentStory, next, previous } = useStoryCarousel(stories);

  if (!stories.length || !currentStory) return null;

  return (
    <>
      <section className="relative overflow-hidden bg-[#FAF7F2] py-36">
        {/* Decorative Background */}

        <div className="absolute inset-0">
          <div className="absolute -left-48 -top-40 h-[520px] w-[520px] rounded-full bg-white/70 blur-3xl" />

          <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-white/60 blur-3xl" />

          <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#D9A441]/10 blur-3xl" />
        </div>

        <div className="container-custom relative">
          {/* Header */}

          <div className="mx-auto max-w-5xl text-center">
            <div className="inline-flex items-center rounded-full border border-[#D9A441]/30 bg-white px-6 py-3 shadow-sm">
              <span className="uppercase tracking-[4px] text-sm font-semibold text-[#844204]">
                Stories of Hope
              </span>
            </div>

            <h2 className="mt-8 text-5xl font-bold leading-tight text-[#1B1815] md:text-7xl">
              Lives Changed Through Compassion
            </h2>

            <div className="mx-auto mt-8 h-1 w-28 rounded-full bg-[#D9A441]" />

            <p className="mx-auto mt-10 max-w-4xl text-lg leading-9 text-gray-600">
              Behind every programme is a real person, a real family and a real
              journey. Discover inspiring stories of resilience, hope and
              transformation made possible through compassion and collective
              action.
            </p>
          </div>

          {/* Impact Statistics */}

          <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-[28px] border border-[#D9A441]/20 bg-white p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-5xl font-bold text-[#844204]">50+</h3>

              <p className="mt-3 font-semibold text-[#1B1815]">
                Families Supported
              </p>
            </div>

            <div className="rounded-[28px] border border-[#D9A441]/20 bg-white p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-5xl font-bold text-[#844204]">200+</h3>

              <p className="mt-3 font-semibold text-[#1B1815]">
                Lives Impacted
              </p>
            </div>

            <div className="rounded-[28px] border border-[#D9A441]/20 bg-white p-8 text-center shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-5xl font-bold text-[#844204]">12+</h3>

              <p className="mt-3 font-semibold text-[#1B1815]">
                Community Projects
              </p>
            </div>
          </div>

          {/* Navigation */}

          <div className="mt-24">
            <StoryNavigation
              current={current}
              total={stories.length}
              onPrevious={previous}
              onNext={next}
            />

            <StoryProgress current={current} total={stories.length} />
          </div>

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
