import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";
import StoryGallery from "./StoryGallery";

interface ImpactStorySectionProps {
  title: string;
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
    <section className="py-24">
      <div className="container-custom">
        <div
          className={`grid lg:grid-cols-2 gap-16 items-center ${
            reverse ? "lg:[&>*:first-child]:order-2" : ""
          }`}
        >
          <div className="relative h-[550px] rounded-[32px] overflow-hidden shadow-xl">
            <Image src={image} alt={title} fill className="object-cover" />
          </div>

          <div>
            <span className="uppercase tracking-[4px] text-[#844204] font-semibold">
              {date}
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mt-4">{title}</h2>

            <p className="text-[#844204] font-medium mt-4">{location}</p>

            <div className="w-20 h-1 bg-[#D9A441] rounded-full mt-6" />

            <p className="mt-8 text-gray-600 leading-8 whitespace-pre-line">
              {description}
            </p>

            <Link
              href={videoUrl}
              target="_blank"
              className="inline-flex items-center gap-3 mt-8 bg-[#844204] text-white px-6 py-4 rounded-xl font-semibold hover:bg-[#6e3503] transition"
            >
              <PlayCircle size={20} />
              Watch Highlights
            </Link>
          </div>
        </div>

        <StoryGallery images={images} galleryLink={galleryLink} />
      </div>
    </section>
  );
}
