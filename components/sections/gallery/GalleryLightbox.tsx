"use client";

import { useEffect } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

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
  const open = current !== null && images.length > 0;

  // The page behind a full-screen viewer should not scroll with it.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  if (!open || current === null) return null;

  const item = images[current];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.category} photograph ${current + 1} of ${images.length}`}
      className="fixed inset-0 z-[9999] flex flex-col bg-black/95 backdrop-blur-xl"
      onClick={onClose}
    >
      {/* Bar */}

      <div
        className="flex items-center justify-between gap-4 px-5 py-5 text-white sm:px-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold uppercase tracking-[3px] text-accent">
            {item.category}
          </p>

          <p className="mt-1 text-sm text-white/60">
            {current + 1} of {images.length}
          </p>
        </div>

        <button
          aria-label="Close"
          onClick={onClose}
          className="shrink-0 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
        >
          <X size={24} />
        </button>
      </div>

      {/* Image */}

      <div
        className="relative flex-1 px-4 pb-6 sm:px-8"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          key={item.image}
          src={item.image}
          alt={`${item.category} photograph ${current + 1} of ${images.length}`}
          fill
          sizes="100vw"
          className="object-contain p-2"
          priority
        />
      </div>

      {/* Controls sit below the image rather than over it, so they never
          cover the photograph on narrow screens. */}
      <div
        className="flex items-center justify-center gap-4 pb-8 text-white"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          aria-label="Previous"
          onClick={onPrevious}
          className="rounded-full bg-white/10 p-4 transition hover:bg-white/20"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          aria-label="Next"
          onClick={onNext}
          className="rounded-full bg-white/10 p-4 transition hover:bg-white/20"
        >
          <ChevronRight size={26} />
        </button>
      </div>
    </div>
  );
}
