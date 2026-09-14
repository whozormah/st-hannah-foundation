import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

import { isPlayableVideo, isSafeLink } from "@/lib/links";

type Props = {
  title: string;
  description: string;
  thumbnail: string;
  thumbnailAlt: string;
  link: string;
};

/* A video as a picture that opens it on YouTube or Vimeo, like the gallery's
   video highlights. Not an embedded player: an embed would let the video
   site track every visitor to the homepage, which the Privacy Policy does
   not cover. The section hides itself without a real video link. */
export default function VideoBlock({ title, description, thumbnail, thumbnailAlt, link }: Props) {
  if (!thumbnail || !isSafeLink(link) || !isPlayableVideo(link)) return null;

  return (
    <section className="bg-cream py-14 md:py-24">
      <div className="container-custom">
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-auto block max-w-4xl overflow-hidden rounded-[32px] bg-white shadow-sm transition hover:shadow-xl"
        >
          <div className="relative aspect-video">
            <Image
              src={thumbnail}
              alt={thumbnailAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <span
              aria-hidden
              className="absolute inset-0 flex items-center justify-center bg-black/30"
            >
              <PlayCircle size={72} className="text-white" />
            </span>
          </div>

          <div className="p-7 md:p-10">
            <h2 className="text-2xl font-bold text-ink md:text-3xl">{title}</h2>

            {description && <p className="mt-4 text-lg leading-9 text-gray-700">{description}</p>}

            <span className="mt-6 inline-block font-semibold text-brand">
              Watch the video
              <span className="sr-only"> (opens in a new tab)</span> →
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
