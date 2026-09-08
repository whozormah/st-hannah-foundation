"use client";

import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

interface GalleryItem {
  image: string;
  category: string;
  title: string;
}

interface GalleryLightboxProps {
  images: GalleryItem[];
  current: number | null;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export default function GalleryLightbox({
  images,
  current,
  onClose,
  onNext,
  onPrevious,
}: GalleryLightboxProps) {
  if (current === null || !images.length) return null;

  const image = images[current];

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        {/* Close */}

        <button aria-label="Close"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="absolute right-8 top-8 z-50 rounded-full bg-white/10 p-3 text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <X size={28} />
        </button>

        {/* Previous */}

        <button aria-label="Previous"
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          className="absolute left-8 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <ChevronLeft size={34} />
        </button>

        {/* Next */}

        <button aria-label="Next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-8 rounded-full bg-white/10 p-4 text-white backdrop-blur-md transition hover:bg-white/20"
        >
          <ChevronRight size={34} />
        </button>

        {/* Content */}

        <motion.div
          layoutId={image.image}
          className="w-full max-w-7xl px-8"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative h-[75vh] overflow-hidden rounded-[32px]">
            <Image
              src={image.image}
              alt={image.title}
              fill
              className="object-contain"
            />
          </div>

          <div className="mt-8 text-center">
            <span className="rounded-full bg-[#D9A441]/20 px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#D9A441]">
              {image.category}
            </span>

            <h2 className="mt-6 text-4xl font-bold text-white">
              {image.title}
            </h2>

            <p className="mt-4 text-gray-400">
              Image {current + 1} of {images.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
