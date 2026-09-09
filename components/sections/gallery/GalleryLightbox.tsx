"use client";

import { useEffect, useRef } from "react";
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
  onSelect: (index: number) => void;
}

export default function GalleryLightbox({
  images,
  current,
  onClose,
  onNext,
  onPrevious,
  onSelect,
}: GalleryLightboxProps) {
  const open = current !== null && images.length > 0;
  const touchStartX = useRef<number | null>(null);
  const activeThumb = useRef<HTMLButtonElement>(null);

  // The page behind a full-screen viewer should not scroll with it.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Keep the current thumbnail in view as you move through the set.
  useEffect(() => {
    if (!open) return;

    activeThumb.current?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [current, open]);

  if (!open || current === null) return null;

  const item = images[current];

  // Swiping is how people move through photographs on a phone.
  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;

    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(delta) < 50) return;

    if (delta < 0) onNext();
    else onPrevious();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${item.category} photograph ${current + 1} of ${images.length}`}
      className="fixed inset-0 z-[9999] flex flex-col bg-[#0B0805]/97 backdrop-blur-xl"
    >
      {/* Bar */}

      <div className="flex items-center justify-between gap-4 px-5 py-4 text-white sm:px-8 sm:py-6">
        <div className="min-w-0">
          <p className="truncate text-xs font-semibold uppercase tracking-[3px] text-accent">
            {item.category}
          </p>

          <p className="mt-1 text-sm text-white/50">
            {current + 1} / {images.length}
          </p>
        </div>

        <button
          aria-label="Close"
          onClick={onClose}
          className="shrink-0 rounded-full bg-white/10 p-3 transition hover:bg-white/20"
        >
          <X size={22} />
        </button>
      </div>

      {/* Stage */}

      <div
        className="relative min-h-0 flex-1"
        onTouchStart={(event) => {
          touchStartX.current = event.changedTouches[0].clientX;
        }}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          key={item.image}
          src={item.image}
          alt={`${item.category} photograph ${current + 1} of ${images.length}`}
          fill
          sizes="100vw"
          priority
          className="object-contain px-4 pb-2 sm:px-10"
        />

        {/* Desktop arrows sit clear of the picture */}
        <button
          aria-label="Previous"
          onClick={onPrevious}
          className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 lg:block"
        >
          <ChevronLeft size={26} />
        </button>

        <button
          aria-label="Next"
          onClick={onNext}
          className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20 lg:block"
        >
          <ChevronRight size={26} />
        </button>
      </div>

      {/* Filmstrip */}

      <div className="shrink-0 px-4 pb-5 pt-3 sm:px-8">
        <div className="flex items-center justify-center gap-3 lg:hidden">
          <button
            aria-label="Previous"
            onClick={onPrevious}
            className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            aria-label="Next"
            onClick={onNext}
            className="rounded-full bg-white/10 p-3 text-white transition hover:bg-white/20"
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <ul className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {images.map((thumb, index) => (
            <li key={`${thumb.image}-${index}`}>
              <button
                ref={index === current ? activeThumb : undefined}
                onClick={() => onSelect(index)}
                aria-label={`Photograph ${index + 1}`}
                aria-current={index === current ? "true" : undefined}
                className={`relative block h-12 w-16 shrink-0 overflow-hidden rounded-lg transition sm:h-14 sm:w-20 ${
                  index === current
                    ? "ring-2 ring-accent"
                    : "opacity-45 hover:opacity-90"
                }`}
              >
                <Image
                  src={thumb.image}
                  alt=""
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
