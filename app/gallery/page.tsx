"use client";

import { useState, useEffect } from "react";

import PageHeader from "@/components/shared/PageHeader";
import FeaturedEvents from "@/components/sections/gallery/FeaturedEvents";
import VideoHighlights from "@/components/sections/gallery/VideoHighlights";
import GalleryCTA from "@/components/sections/gallery/GalleryCTA";
import GalleryStats from "@/components/sections/gallery/GalleryStats";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";
import GalleryLightbox from "@/components/sections/gallery/GalleryLightbox";
import GalleryIntro from "@/components/sections/gallery/GalleryIntro";
import GalleryFilters from "@/components/sections/gallery/GalleryFilters";
import GalleryFeatured from "@/components/sections/gallery/GalleryFeatured";

import galleryData from "@/public/data/gallery.json";
interface GalleryItem {
  image: string;
  category: string;
  title: string;
}

const galleryItems: GalleryItem[] = galleryData;

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const categories = [
    "All",
    ...Array.from(new Set(galleryItems.map((item) => item.category))),
  ];

  const filteredImages =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") {
        setSelectedImage(null);
      }

      if (e.key === "ArrowRight") {
        setSelectedImage(
          selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1,
        );
      }

      if (e.key === "ArrowLeft") {
        setSelectedImage(
          selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1,
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, filteredImages.length]);

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Explore moments of hope, compassion, empowerment and transformation captured through the work of St. Hannah Foundation."
        image="/headers/gallery.jpg"
      />
      <GalleryStats />
      <GalleryIntro />
      <GalleryFeatured />
      <section id="gallery" className="pb-24 bg-white">
        <div className="container-custom">
          <GalleryFilters
            categories={categories}
            activeCategory={activeCategory}
            onSelect={(category) => {
              setActiveCategory(category);
              setSelectedImage(null);
            }}
          />

          <GalleryGrid images={filteredImages} onOpen={setSelectedImage} />
        </div>
      </section>
      <GalleryLightbox
        images={filteredImages}
        current={selectedImage}
        onClose={() => setSelectedImage(null)}
        onNext={() =>
          setSelectedImage(
            selectedImage === filteredImages.length - 1
              ? 0
              : (selectedImage ?? 0) + 1,
          )
        }
        onPrevious={() =>
          setSelectedImage(
            selectedImage === 0
              ? filteredImages.length - 1
              : (selectedImage ?? 0) - 1,
          )
        }
      />

      <FeaturedEvents />
      <VideoHighlights />
      <GalleryCTA />
    </>
  );
}
