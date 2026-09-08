"use client";

import Image from "next/image";
import { Expand } from "lucide-react";

interface GalleryCardProps {
  image: string;
  category: string;
  position: number;
  total: number;
  onClick: () => void;
}

export default function GalleryCard({
  image,
  category,
  position,
  total,
  onClick,
}: GalleryCardProps) {
  return (
    <button
      onClick={onClick}
      // The titles in gallery.json repeat for every photograph in a category
      // ("Widow Empowerment Program" twenty times), so the card is labelled by
      // category and position instead of stacking the same caption over and
      // over. The full label is what assistive tech announces.
      aria-label={`Open ${category} photograph ${position} of ${total}`}
      className="group relative block aspect-[4/3] w-full overflow-hidden rounded-[20px] bg-cream shadow-sm transition-all duration-500 hover:-translate-y-1 hover:shadow-xl"
    >
      <Image
        src={image}
        alt=""
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />

      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <span
        aria-hidden
        className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-3 opacity-0 transition-all duration-500 group-hover:opacity-100"
      >
        <span className="text-left text-sm font-semibold uppercase tracking-[2px] text-white">
          {category}
        </span>

        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md">
          <Expand size={16} />
        </span>
      </span>
    </button>
  );
}
