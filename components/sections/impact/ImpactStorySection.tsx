import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

interface ImpactStorySectionProps {
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
  videoLink?: string;
  reverse?: boolean;
}

export default function ImpactStorySection({
  title,
  date,
  location,
  image,
  description,
  videoLink,
  reverse = false,
}: ImpactStorySectionProps) {
  return (
    <section className="py-24">
      <div
        className={`container-custom grid lg:grid-cols-2 gap-16 items-center ${
          reverse ? "lg:[&>*:first-child]:order-2" : ""
        }`}
      >
        <div className="relative h-[500px] rounded-[32px] overflow-hidden shadow-lg">
          <Image src={image} alt={title} fill className="object-cover" />
        </div>

        <div>
          <span className="text-[#844204] font-semibold uppercase tracking-[4px]">
            {date}
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">{title}</h2>

          <p className="mt-4 text-[#844204] font-medium">{location}</p>

          <p className="mt-8 text-gray-600 leading-8 whitespace-pre-line">
            {description}
          </p>

          {videoLink && (
            <Link
              href={videoLink}
              target="_blank"
              className="inline-flex items-center gap-3 mt-8 bg-[#844204] text-white px-6 py-4 rounded-xl font-semibold"
            >
              <PlayCircle size={20} />
              Watch Highlights
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
