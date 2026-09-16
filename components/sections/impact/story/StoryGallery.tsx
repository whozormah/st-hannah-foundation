"use client";

import { useState } from "react";
import Image from "next/image";

import GalleryLightbox from "@/components/sections/gallery/GalleryLightbox";
import type { Picture } from "@/lib/cms";

/* Every photograph of the story, the first one large, opening in the site's
   gallery viewer (CR-021). */
export default function StoryGallery({ title, pictures }: { title: string; pictures: Picture[] }) {
  const [current, setCurrent] = useState<number | null>(null);

  if (!pictures.length) return null;

  const items = pictures.map((picture) => ({ image: picture.src, category: title, title: picture.alt }));
  const count = items.length;

  return (
    <>
      <ul className="grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[220px] md:grid-cols-4 md:gap-4">
        {pictures.map((picture, index) => (
          <li
            key={`${picture.src}-${index}`}
            // One or two photographs share the width equally; from three, the
            // first leads, large.
            className={
              count <= 2 || index === 0 ? "col-span-2 row-span-2" : index % 5 === 3 ? "md:col-span-2" : ""
            }
          >
            <button
              type="button"
              onClick={() => setCurrent(index)}
              aria-label={`Open photograph ${index + 1} of ${count}${picture.alt ? `: ${picture.alt}` : ""}`}
              className="group relative block h-full w-full overflow-hidden rounded-[20px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            >
              <Image
                src={picture.src}
                alt=""
                fill
                sizes={index === 0 ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 768px) 25vw, 50vw"}
                className="object-cover transition duration-700 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      <GalleryLightbox
        images={items}
        current={current}
        onClose={() => setCurrent(null)}
        onNext={() => setCurrent((index) => (index === null ? index : (index + 1) % count))}
        onPrevious={() => setCurrent((index) => (index === null ? index : (index - 1 + count) % count))}
        onSelect={setCurrent}
      />
    </>
  );
}
