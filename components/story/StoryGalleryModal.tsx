"use client";

import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import StoryImageViewer from "./StoryImageViewer";

interface StoryGalleryModalProps {
  isOpen: boolean;
  images: string[];
  storyName: string;
  currentImage: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSelect: (index: number) => void;
}

export default function StoryGalleryModal({
  isOpen,
  images,
  storyName,
  currentImage,
  onClose,
  onNext,
  onPrevious,
  onSelect,
}: StoryGalleryModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md">
      {/* Close */}

      <button aria-label="Close"
        onClick={onClose}
        className="absolute right-8 top-8 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white hover:text-brand"
      >
        <X size={24} />
      </button>

      {/* Previous */}

      <button aria-label="Previous"
        onClick={onPrevious}
        className="absolute left-6 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white transition hover:bg-white hover:text-brand"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Next */}

      <button aria-label="Next"
        onClick={onNext}
        className="absolute right-6 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-4 text-white transition hover:bg-white hover:text-brand"
      >
        <ChevronRight size={28} />
      </button>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-6">
        {/* Heading */}

        <div className="mb-10 text-center">
          <span className="uppercase tracking-[5px] text-accent">
            Journey Through Images
          </span>

          <h2 className="mt-3 text-4xl font-bold text-white">{storyName}</h2>

          <p className="mt-3 text-white/70">
            {currentImage + 1} of {images.length}
          </p>
        </div>

        {/* Viewer */}

        <StoryImageViewer image={images[currentImage]} alt={storyName} />

        {/* Thumbnails */}

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onSelect(index)}
              className={`overflow-hidden rounded-xl border-2 transition ${
                currentImage === index
                  ? "border-accent"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${storyName}-${index}`}
                width={112}
                height={80}
                className="h-20 w-28 object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
