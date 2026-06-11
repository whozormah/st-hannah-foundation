"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

import PageHeader from "@/components/shared/PageHeader";

import VideoHighlights from "@/components/sections/gallery/VideoHighlights";
import GalleryCTA from "@/components/sections/gallery/GalleryCTA";

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const categories = [
    "All",
    "Widow Empowerment",
    "Education Support",
    "Widower Support",
    "Family Support",
    "Community Outreach",
    "Business Empowerment",
  ];

  const widowEmpowerment = Array.from({ length: 30 }, (_, i) => ({
    image: `/gallery/widow-empowerment/${i + 1}.jpg`,
    category: "Widow Empowerment",
    title: "Widow Empowerment Program",
  }));

  const educationSupport = Array.from({ length: 20 }, (_, i) => ({
    image: `/gallery/education-support/${i + 1}.jpeg`,
    category: "Education Support",
    title: "Education Support Program",
  }));

  const familySupport = Array.from({ length: 5 }, (_, i) => ({
    image: `/gallery/family-support/${i + 1}.jpg`,
    category: "Family Support",
    title: "Family Support Initiative",
  }));

  const communityOutreach = Array.from({ length: 5 }, (_, i) => ({
    image: `/gallery/community-outreach/${i + 1}.jpg`,
    category: "Community Outreach",
    title: "Community Outreach Program",
  }));

  const businessEmpowerment = Array.from({ length: 5 }, (_, i) => ({
    image: `/gallery/business-empowerment/${i + 1}.jpg`,
    category: "Business Empowerment",
    title: "Business Empowerment Program",
  }));

  const widowerSupport = Array.from({ length: 5 }, (_, i) => ({
    image: `/gallery/widower-support/${i + 1}.jpg`,
    category: "Widower Support",
    title: "Widower Support Program",
  }));

  const galleryItems = [
    ...widowEmpowerment,
    ...educationSupport,
    ...familySupport,
    ...communityOutreach,
    ...businessEmpowerment,
    ...widowerSupport,
  ];

  const filteredImages =
    activeCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <>
      <PageHeader
        title="Gallery"
        subtitle="Capturing moments of hope, compassion and transformation through our outreach programs, educational initiatives and community impact activities."
      />

      <section className="pb-24 bg-white">
        <div className="container-custom">
          {/* Category Filters */}

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
                    ? "bg-[#844204] text-white"
                    : "bg-white border border-gray-200 hover:border-[#844204]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}

          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredImages.map((item, index) => (
              <div
                key={index}
                onClick={() => setSelectedImage(index)}
                className="break-inside-avoid overflow-hidden rounded-[24px] shadow-sm hover:shadow-xl transition duration-300 group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full group-hover:scale-105 transition duration-500"
                  />

                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition duration-300 flex items-end">
                    <div className="p-6 text-white opacity-0 group-hover:opacity-100 transition duration-300">
                      <p className="uppercase tracking-[3px] text-sm">
                        {item.category}
                      </p>

                      <h3 className="text-xl font-bold mt-2">{item.title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}

      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center">
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 text-white hover:scale-110 transition"
          >
            <X size={40} />
          </button>

          <button
            onClick={() =>
              setSelectedImage(
                selectedImage === 0
                  ? filteredImages.length - 1
                  : selectedImage - 1,
              )
            }
            className="absolute left-4 md:left-10 text-white hover:scale-110 transition"
          >
            <ChevronLeft size={55} />
          </button>

          <div className="px-16">
            <img
              src={filteredImages[selectedImage].image}
              alt={filteredImages[selectedImage].title}
              className="max-h-[85vh] max-w-[90vw] rounded-[24px]"
            />

            <div className="text-center mt-6 text-white">
              <p className="uppercase tracking-[3px] text-sm opacity-80">
                {filteredImages[selectedImage].category}
              </p>

              <h3 className="text-2xl font-bold mt-2">
                {filteredImages[selectedImage].title}
              </h3>
            </div>
          </div>

          <button
            onClick={() =>
              setSelectedImage(
                selectedImage === filteredImages.length - 1
                  ? 0
                  : selectedImage + 1,
              )
            }
            className="absolute right-4 md:right-10 text-white hover:scale-110 transition"
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
