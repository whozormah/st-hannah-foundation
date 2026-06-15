"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import PageHeader from "@/components/shared/PageHeader";
import FeaturedEvents from "@/components/sections/gallery/FeaturedEvents";
import VideoHighlights from "@/components/sections/gallery/VideoHighlights";
import GalleryCTA from "@/components/sections/gallery/GalleryCTA";

interface GalleryItem {
  image: string;
  category: string;
  title: string;
}

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);

  useEffect(() => {
    fetch("/data/gallery.json")
      .then((res) => res.json())
      .then((data) => setGalleryItems(data))
      .catch((err) => console.error(err));
  }, []);

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
      <FeaturedEvents />
      <section className="py-20 bg-white">
        <div className="container-custom text-center max-w-4xl">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Moments That Matter
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            A Visual Journey Of Impact
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            Every image tells a story of compassion, service, empowerment and
            hope. Explore the moments that reflect the lives touched and
            communities strengthened through our programmes and outreach
            initiatives.
          </p>
        </div>
      </section>

      <section className="pb-24 bg-white">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                  setSelectedImage(null);
                }}
                className={`px-6 py-3 rounded-full font-medium transition ${
                  activeCategory === category
                    ? "bg-[#844204] text-white shadow-lg"
                    : "bg-white border border-gray-100 shadow-sm hover:border-[#844204]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredImages.length === 0 && (
              <div className="text-center py-20">
                <h3 className="text-3xl font-bold">No Images Available</h3>

                <p className="mt-4 text-gray-600">
                  Images for this category will appear here.
                </p>
              </div>
            )}
            {filteredImages.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className="bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer"
              >
                <div className="relative h-[320px] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700"
                  />

                  <div className="bg-black/0  transition duration-300 flex items-end">
                    <div className="p-6">
                      <span className="uppercase tracking-[3px] text-[#844204] text-sm font-semibold">
                        {item.category}
                      </span>

                      <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {selectedImage !== null && filteredImages.length > 0 && (
        <div
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          {/* Close */}

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-6 right-6 text-white z-50"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-full p-3">
              <X size={28} />
            </div>
          </button>

          {/* Previous */}

          <button
            onClick={(e) => {
              e.stopPropagation();

              setSelectedImage(
                selectedImage === 0
                  ? filteredImages.length - 1
                  : selectedImage - 1,
              );
            }}
            className="absolute left-4 md:left-10 text-white z-50"
          >
            <ChevronLeft size={55} />
          </button>

          {/* Content */}

          <div
            className="w-full max-w-7xl px-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[75vh]">
              <Image
                src={filteredImages[selectedImage].image}
                alt={filteredImages[selectedImage].title}
                fill
                className="object-contain"
              />
            </div>

            <div className="text-center mt-8">
              <p className="uppercase tracking-[3px] text-sm text-[#D9A441]">
                {filteredImages[selectedImage].category}
              </p>

              <h3 className="text-3xl font-bold mt-3 text-white">
                {filteredImages[selectedImage].title}
              </h3>

              <p className="mt-3 text-gray-400">
                Image {selectedImage + 1} of {filteredImages.length}
              </p>
            </div>
          </div>

          {/* Next */}

          <button
            onClick={(e) => {
              e.stopPropagation();

              setSelectedImage(
                selectedImage === filteredImages.length - 1
                  ? 0
                  : selectedImage + 1,
              );
            }}
            className="absolute right-4 md:right-10 text-white z-50"
          >
            <ChevronRight size={55} />
          </button>
        </div>
      )}

      <VideoHighlights />
      <GalleryCTA />
    </>
  );
}
