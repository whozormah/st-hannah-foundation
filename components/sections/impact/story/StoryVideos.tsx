import PlayableVideo from "@/components/shared/PlayableVideo";
import Rays from "@/components/shared/Rays";
import type { StoryVideo } from "@/lib/cms";

/* The story's own videos, on a dark ground so they lead the eye; the first is
   shown full width when there are several (CR-021). */
export default function StoryVideos({ videos }: { videos: StoryVideo[] }) {
  if (!videos.length) return null;

  return (
    <section className="bg-[#1B0E02] py-16 text-white md:py-28">
      <div className="container-custom">
        <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-accent-soft">
          <Rays className="h-5 w-8 shrink-0 text-accent" />
          Watch
        </p>

        <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl">
          Watch The Story
        </h2>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {videos.map((video, index) => (
            <div key={`${video.src}-${index}`} className={index === 0 && videos.length > 1 ? "md:col-span-2" : ""}>
              <PlayableVideo
                src={video.src}
                poster={video.poster}
                title={video.title}
                label={`Play ${video.title || `video ${index + 1}`}`}
                className="aspect-video"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
