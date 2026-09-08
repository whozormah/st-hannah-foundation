"use client";

interface GalleryItem {
  image: string;
  category: string;
  title: string;
}

import GalleryCard from "./GalleryCard";

interface GalleryGridProps {
  images: GalleryItem[];
  onOpen: (index: number) => void;
}

export default function GalleryGrid({ images, onOpen }: GalleryGridProps) {
  if (!images.length) {
    return (
      <div className="rounded-[24px] border border-dashed border-accent/40 py-14 md:py-24 text-center">
        <p className="text-xl font-bold text-ink">
          No photographs in this category yet
        </p>

        <p className="mt-3 text-gray-700">
          Choose another programme area to keep browsing.
        </p>
      </div>
    );
  }

  return (
    // A single aspect ratio across every tile. The previous grid mixed
    // auto-rows-[340px] with children forced to 720px and 500px, so tiles
    // overflowed their rows.
    <ul className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
      {images.map((item, index) => (
        <li key={`${item.image}-${index}`}>
          <GalleryCard
            image={item.image}
            category={item.category}
            position={index + 1}
            total={images.length}
            onClick={() => onOpen(index)}
          />
        </li>
      ))}
    </ul>
  );
}
