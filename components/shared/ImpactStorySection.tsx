import Image from "next/image";
import Link from "next/link";
import { PlayCircle, MapPin, Calendar } from "lucide-react";

import StoryGallery from "./StoryGallery";

interface ImpactStorySectionProps {
  title: string;
  category?: string;
  date: string;
  location: string;
  description: string;
  image: string;
  images: string[];
  videoUrl: string;
  galleryLink: string;
  reverse?: boolean;
}

export default function ImpactStorySection({
  title,
  category,
  date,
  location,
  description,
  image,
  images,
  videoUrl,
  galleryLink,
  reverse = false,
}: ImpactStorySectionProps) {
  return (
    <section className="py-32 bg-white">
      {" "}
      <div className="container-custom">
        <div
          className={`grid lg:grid-cols-2 gap-16 items-center ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          {/* Image */}
          ```
          <div className="relative">
            <div className="relative h-[600px] rounded-[36px] overflow-hidden shadow-xl">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition duration-700 hover:scale-105"
              />
            </div>
          </div>
          {/* Content */}
          <div>
            {category && (
              <span className="inline-flex items-center bg-[#FAF7F2] px-4 py-2 rounded-full text-sm font-semibold text-[#844204]">
                {category}
              </span>
            )}

            <h2 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
              {title}
            </h2>

            <div className="flex flex-wrap gap-6 mt-6 text-gray-500">
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                {date}
              </div>

              <div className="flex items-center gap-2">
                <MapPin size={18} />
                {location}
              </div>
            </div>

            <div className="w-20 h-1 bg-[#D9A441] rounded-full mt-8" />

            <p className="mt-8 text-gray-600 text-lg leading-9 whitespace-pre-line">
              {description}
            </p>

            {videoUrl && (
              <Link
                href={videoUrl}
                target="_blank"
                className="inline-flex items-center gap-3 mt-10 bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6e3503] transition-all duration-300"
              >
                <PlayCircle size={22} />
                Watch Highlights
              </Link>
            )}
          </div>
        </div>

        <div className="mt-16">
          <StoryGallery images={images} galleryLink={galleryLink} />
        </div>
      </div>
    </section>
  );
}
