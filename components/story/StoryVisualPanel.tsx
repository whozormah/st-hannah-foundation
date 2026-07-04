"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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
  const galleryPreview = story.gallery?.slice(0, 3) ?? [];

  return (
    <div className="sticky top-28">
      <div className="overflow-hidden rounded-[40px] bg-white shadow-[0_30px_80px_rgba(0,0,0,.08)]">
        {/* HERO IMAGE */}

        <div className="relative overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="relative h-[720px]"
          >
            <Image
              src={story.heroImage}
              alt={story.name}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* CONTENT */}

        <div className="bg-white px-10 py-10">
          <span className="text-xs font-semibold uppercase tracking-[5px] text-[#844204]">
            Story of Hope
          </span>

          <h2 className="mt-4 text-4xl font-bold text-[#1B1815]">
            {story.name}
          </h2>

          <p className="mt-2 text-lg text-[#844204]">{story.tagline}</p>

          <div className="mt-8 h-px w-full bg-[#E8E1D8]" />

          {/* Journey */}

          <button
            onClick={onGalleryOpen}
            className="group mt-10 w-full text-left"
          >
            <span className="text-xs font-semibold uppercase tracking-[4px] text-[#844204]">
              Moments That Matter
            </span>

            <h3 className="mt-3 text-2xl font-bold text-[#1B1815]">
              Explore The Journey
            </h3>

            <p className="mt-4 leading-8 text-gray-600">
              Every photograph captures another chapter of resilience,
              compassion and hope.
            </p>

            {/* Floating Photos */}

            <div className="relative mt-12 h-44">
              {galleryPreview.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -12,
                    rotate: index === 0 ? -8 : index === 1 ? 0 : 8,
                  }}
                  className={`absolute overflow-hidden rounded-[22px]
                  border-4 border-white shadow-2xl

                  ${
                    index === 0
                      ? "left-2 top-8 h-36 w-28 rotate-[-10deg]"
                      : index === 1
                        ? "left-1/2 top-0 h-40 w-32 -translate-x-1/2"
                        : "right-2 top-8 h-36 w-28 rotate-[10deg]"
                  }
                  `}
                >
                  <Image
                    src={image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="text-sm uppercase tracking-[3px] text-[#844204]">
                  {imageCount} Photos
                </p>
              </div>

              <div className="flex items-center gap-3 rounded-full bg-[#844204] px-7 py-4 font-semibold text-white transition-all duration-300 group-hover:translate-x-1">
                Explore
                <ArrowRight size={18} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
