"use client";

import { useState, useEffect, useMemo } from "react";

import PageHeader from "@/components/shared/PageHeader";
import GalleryFilters from "@/components/sections/gallery/GalleryFilters";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";
import GalleryLightbox from "@/components/sections/gallery/GalleryLightbox";
import FeaturedEvents from "@/components/sections/gallery/FeaturedEvents";
import VideoHighlights from "@/components/sections/gallery/VideoHighlights";
import GalleryCTA from "@/components/sections/gallery/GalleryCTA";

import galleryData from "@/public/data/gallery.json";

interface GalleryItem {
  image: string;
  category: string;
  title: string;
}

const galleryItems: GalleryItem[] = galleryData;

const categories = [
  "All",
  ...Array.from(new Set(galleryItems.map((item) => item.category))),
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = useMemo(
    () =>
      activeCategory === "All"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
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
      <PageHeader
        title="Gallery"
        subtitle="Moments of hope, compassion and transformation captured through the work of St. Hannah Foundation."
        image="/gallery/gallery1.jpeg"
      />

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

      <FeaturedEvents />

      <VideoHighlights />

      <GalleryCTA />
    </>
  );
}
