"use client";

import Image from "next/image";
import { Maximize2 } from "lucide-react";

interface GalleryCardProps {
  image: string;
  category: string;
  position: number;
  total: number;
  /** Crop for this tile, set by the grid to build a rhythm. */
  aspect: string;
  priority?: boolean;
  onClick: () => void;
}

export default function GalleryCard({
  image,
  category,
  position,
  total,
  aspect,
  priority,
  onClick,
}: GalleryCardProps) {
  return (
    <button
      onClick={onClick}
      // gallery.json repeats one title across every photograph in a category,
      // so the accessible name is built from category and position instead.
      aria-label={`Open ${category} photograph ${position} of ${total}`}
      className="group relative block w-full overflow-hidden rounded-2xl bg-cream focus-visible:outline-offset-4"
    >
      <div className={`relative w-full ${aspect}`}>
        <Image
          src={image}
          alt=""
          fill
          priority={priority}
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.06]"
        />

        {/* Veil lifts on hover to reveal the caption */}
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100"
        />

        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 flex translate-y-2 items-end justify-between gap-3 p-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
        >
          <span className="text-left">
            <span className="block text-[11px] font-semibold uppercase tracking-[2px] text-accent-soft">
              {category}
            </span>

            <span className="mt-1 block text-sm font-medium text-white/90">
              {position} of {total}
            </span>
          </span>

          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-md">
            <Maximize2 size={15} />
          </span>
        </span>
      </div>
    </button>
  );
}
