"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

interface GalleryCardProps {
  image: string;
  title: string;
  category: string;
  onClick: () => void;
}

export default function GalleryCard({
  image,
  title,
  category,
  onClick,
}: GalleryCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative h-full w-full overflow-hidden rounded-[36px] text-left shadow-lg transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-all duration-700 group-hover:scale-110"
      />

      {/* Overlay */}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent opacity-80 transition-all duration-500 group-hover:opacity-100" />

      {/* Category */}

      <div className="absolute left-7 top-7">
        <span className="rounded-full bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[3px] text-brand backdrop-blur-md">
          {category}
        </span>
      </div>

      {/* Bottom */}

      <div className="absolute inset-x-0 bottom-0 translate-y-3 p-8 text-white transition-all duration-500 group-hover:translate-y-0">
        <h3 className="max-w-sm text-3xl font-bold leading-tight">{title}</h3>

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm uppercase tracking-[3px] text-white/80">
            View Story
          </p>

          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-500 group-hover:rotate-45 group-hover:bg-accent">
            <ArrowUpRight size={22} />
          </div>
        </div>
      </div>
    </button>
  );
}
