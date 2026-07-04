"use client";

import { motion } from "framer-motion";

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

export default function GalleryGrid({ images, onOpen }: GalleryGridProps) {
  if (!images.length) {
    return (
      <div className="py-32 text-center">
        <h3 className="text-3xl font-bold text-[#1B1815]">
          No Images Available
        </h3>

        <p className="mt-4 text-gray-600">
          Images for this category will appear here.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      layout
      className="grid auto-rows-[340px] gap-8 md:grid-cols-2 xl:grid-cols-3"
    >
      {images.map((item, index) => (
        <motion.div
          key={`${item.title}-${index}`}
          layout
          className={
            index === 0
              ? "h-[720px] md:col-span-2 md:row-span-2"
              : index % 5 === 0
                ? "h-[500px]"
                : "h-[340px]"
          }
          initial={{
            opacity: 0,
            y: 40,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.45,
            delay: index * 0.04,
          }}
        >
          <GalleryCard
            image={item.image}
            title={item.title}
            category={item.category}
            onClick={() => onOpen(index)}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
