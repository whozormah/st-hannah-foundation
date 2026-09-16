import Link from "next/link";
import { ArrowRight } from "lucide-react";

import PlayableVideo from "@/components/shared/PlayableVideo";
import Rays from "@/components/shared/Rays";
import TitleLines from "@/components/shared/TitleLines";
import { getVideoHighlights, type VideoHighlight } from "@/lib/cms";
import { SECTION_COPY, type SectionCopy } from "@/lib/section-copy";

/* Stories in Motion on the homepage (CR-026): the first three video
   highlights with the Foundation's own video files, on a dark band, the first
   one large, and a link to every video on the gallery page. It hides itself
   until there is a video to play. */

function Tile({ video, className }: { video: VideoHighlight; className: string }) {
  return (
    <PlayableVideo
      src={video.video}
      poster={video.thumbnail}
      title={video.title}
      label={`Play ${video.title}`}
      className={className}
      radius="rounded-[24px]"
    />
  );
}

export default async function StoriesInMotion({
  eyebrow = SECTION_COPY.storiesInMotion.eyebrow,
  title = SECTION_COPY.storiesInMotion.title,
  description = SECTION_COPY.storiesInMotion.description,
}: SectionCopy = {}) {
  const videos = (await getVideoHighlights()).filter((video) => video.video).slice(0, 3);

  if (!videos.length) return null;

  const [lead, ...rest] = videos;

  return (
    <section className="relative overflow-hidden bg-[#1B0E02] py-16 text-white md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.16),transparent_65%)]"
      />

      <div className="container-custom relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            {eyebrow && (
              <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-accent-soft">
                <Rays className="h-5 w-8 shrink-0 text-accent" />
                {eyebrow}
              </p>
            )}

            <h2 className="mt-5 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
              <TitleLines text={title} />
            </h2>

            {description && <p className="mt-5 text-lg leading-9 text-white/75">{description}</p>}
          </div>

          <Link
            href="/gallery#videos"
            className="group inline-flex w-fit shrink-0 items-center gap-3 rounded-full border border-white/25 px-7 py-3.5 font-semibold transition hover:border-accent hover:bg-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
          >
            See all videos
            <ArrowRight aria-hidden size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className={`mt-12 grid gap-5 ${rest.length ? "lg:grid-cols-[1.6fr_1fr]" : ""}`}>
          <div className="h-full">
            <Tile video={lead} className={rest.length ? "aspect-video lg:aspect-auto lg:h-full" : "aspect-video"} />
          </div>

          {rest.length > 0 && (
            <div className="grid gap-5">
              {rest.map((video) => (
                <Tile key={video.title} video={video} className="aspect-video" />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
