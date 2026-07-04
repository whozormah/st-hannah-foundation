"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface StoryImageViewerProps {
  image: string;
  alt: string;
}

export default function StoryImageViewer({
  image,
  alt,
}: StoryImageViewerProps) {
  return (
    <div className="relative w-full">
      <motion.div
        key={image}
        initial={{
          opacity: 0,
          scale: 0.96,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          scale: 0.96,
        }}
        transition={{
          duration: 0.45,
        }}
        className="group relative mx-auto aspect-[16/10] w-full max-w-6xl overflow-hidden rounded-[36px] bg-[#111]"
      >
        <Image
          src={image}
          alt={alt}
          fill
          priority
          className="object-cover transition-transform duration-[6000ms] group-hover:scale-105"
        />

        {/* Gradient */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}
