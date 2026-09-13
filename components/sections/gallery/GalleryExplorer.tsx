"use client";

import { useState, useEffect, useMemo } from "react";

import GalleryFilters from "@/components/sections/gallery/GalleryFilters";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";
import GalleryLightbox from "@/components/sections/gallery/GalleryLightbox";

interface GalleryItem {
  image: string;
  category: string;
  title: string;
}

/* The interactive part of the gallery: the category filter, the grid and the
   full-screen viewer. The page around it reads the photographs from the CMS
   and passes them in. */
export default function GalleryExplorer({ items: galleryItems }: { items: GalleryItem[] }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(galleryItems.map((item) => item.category)))],
    [galleryItems],
  );

  const filteredImages = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory, galleryItems],
  );

  const total = filteredImages.length;

  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedImage(null);

      if (event.key === "ArrowRight") {
        setSelectedImage((prev) => ((prev ?? 0) + 1) % total);
      }

      if (event.key === "ArrowLeft") {
        setSelectedImage((prev) => ((prev ?? 0) - 1 + total) % total);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, total]);

  return (
    <>
      {/* The photographs are the page, so they come straight after the header
          rather than behind an intro and a second hero image. */}
      <section id="gallery" className="bg-white py-20">
        <div className="container-custom">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
                Moments That Matter
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-5xl">
                A visual journey of impact
              </h2>

              <p className="mt-5 text-lg leading-9 text-gray-700">
                Moments from the field. Tap any photograph to open it full
                screen.
              </p>
            </div>

          </div>

          <div className="mt-10">
            <GalleryFilters
              categories={categories}
              activeCategory={activeCategory}
              onSelect={(category) => {
                setActiveCategory(category);
                setSelectedImage(null);
              }}
            />
          </div>

          <div>
            <GalleryGrid images={filteredImages} onOpen={setSelectedImage} />
          </div>
        </div>
      </section>

      <GalleryLightbox
        images={filteredImages}
        current={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNext={() => setSelectedImage((prev) => ((prev ?? 0) + 1) % total)}
        onPrevious={() =>
          setSelectedImage((prev) => ((prev ?? 0) - 1 + total) % total)
        }
        onSelect={setSelectedImage}
      />
    </>
  );
}
