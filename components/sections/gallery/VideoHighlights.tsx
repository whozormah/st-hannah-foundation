import Image from "next/image";
import Link from "next/link";
import { PlayCircle } from "lucide-react";

import PlayableVideo from "@/components/shared/PlayableVideo";
import { getVideoHighlights } from "@/lib/cms";
import { isPlayableVideo } from "@/lib/links";

// A highlight shows when it has the Foundation's own video file, which plays
// here on the page (CR-023), or a real YouTube or Vimeo address, which opens
// there. The old placeholders all point at "https://youtube.com": they still
// show nothing, and the section hides itself when no highlight qualifies.
export default async function VideoHighlights() {
  const videos = (await getVideoHighlights()).filter(
    (video) => video.video || isPlayableVideo(video.link),
  );

  if (!videos.length) return null;

  return (
    <section className="bg-cream py-14 md:py-24">
      <div className="container-custom">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            Stories In Motion
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            Experience the impact
          </h2>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            Watch the work through the lives of the people and communities we
            serve.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) =>
            video.video ? (
              <div
                key={video.title}
                className="overflow-hidden rounded-[24px] bg-white shadow-sm transition hover:shadow-xl"
              >
                <PlayableVideo
                  src={video.video}
                  poster={video.thumbnail}
                  label={`Play ${video.title}`}
                  className="aspect-[16/10]"
                  radius="rounded-none"
                />

                <div className="p-7">
                  <span className="text-sm font-semibold uppercase tracking-[3px] text-brand">
                    {video.category}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-ink">{video.title}</h3>

                  <p className="mt-3 leading-8 text-gray-700">{video.description}</p>
                </div>
              </div>
            ) : (
              <Link
                key={video.title}
                href={video.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group overflow-hidden rounded-[24px] bg-white shadow-sm transition hover:shadow-xl"
              >
                <div className="relative aspect-[16/10]">
                  <Image
                    src={video.thumbnail}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />

                  <span
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center bg-black/30"
                  >
                    <PlayCircle size={62} className="text-white" />
                  </span>
                </div>

                <div className="p-7">
                  <span className="text-sm font-semibold uppercase tracking-[3px] text-brand">
                    {video.category}
                  </span>

                  <h3 className="mt-3 text-xl font-bold text-ink">
                    {video.title}
                  </h3>

                  <p className="mt-3 leading-8 text-gray-700">
                    {video.description}
                  </p>

                  <span className="mt-5 inline-block font-semibold text-brand">
                    Watch story →
                  </span>
                </div>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
