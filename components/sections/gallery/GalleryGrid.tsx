"use client";

import GalleryCard from "./GalleryCard";

interface GalleryItem {
  image: string;
  category: string;
  title: string;
}

interface GalleryGridProps {
  images: GalleryItem[];
  onOpen: (index: number) => void;
}

/* Almost every photograph is landscape, so a plain masonry would come out
   nearly uniform. The rhythm comes from the crops instead: a repeating
   sequence of ratios that keeps the columns uneven and the wall alive. */
const CROPS = [
  "aspect-[4/5]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[3/4]",
  "aspect-[16/10]",
  "aspect-[4/3]",
  "aspect-[1/1]",
  "aspect-[4/5]",
];

export default function GalleryGrid({ images, onOpen }: GalleryGridProps) {
  if (!images.length) {
    return (
      <div className="rounded-3xl border border-dashed border-accent/40 py-24 text-center">
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
    // CSS columns rather than a row grid: tiles of different heights stack
    // without leaving gaps, and there are no fixed pixel heights to break.
    <div className="columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
      {images.map((item, index) => (
        <div
          key={`${item.image}-${index}`}
          className="mb-3 break-inside-avoid md:mb-4"
        >
          <GalleryCard
            image={item.image}
            category={item.category}
            position={index + 1}
            total={images.length}
            aspect={CROPS[index % CROPS.length]}
            priority={index < 4}
            onClick={() => onOpen(index)}
          />
        </div>
      ))}
    </div>
  );
}
