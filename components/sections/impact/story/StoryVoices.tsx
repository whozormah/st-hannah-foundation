import Image from "next/image";

import PlayableVideo from "@/components/shared/PlayableVideo";
import Rays from "@/components/shared/Rays";
import type { Testimony } from "@/lib/cms";

/* Real testimonies, in the words the Foundation supplied, each only once its
   consent is confirmed: that check happens before they reach this component
   (CR-021). A testimony may be words, a video, a photograph, or a mix. */
export default function StoryVoices({
  testimonies,
  eyebrow = "",
}: {
  testimonies: Testimony[];
  /** The story's own small heading, such as "Hear From the Students". */
  eyebrow?: string;
}) {
  if (!testimonies.length) return null;

  return (
    <section className="bg-cream py-16 md:py-28">
      <div className="container-custom">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-brand">
            <Rays className="h-5 w-8 shrink-0 text-accent" />
            {eyebrow || "Hear From Them"}
          </p>

          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
            Voices of Transformation
          </h2>

          <p className="mt-6 text-lg leading-9 text-gray-700">
            In their own words, shared with their permission.
          </p>
        </div>

        <ul className="mt-12 columns-1 gap-6 md:columns-2 lg:columns-3">
          {testimonies.map((testimony, index) => {
            const who = testimony.name || "Shared anonymously";

            return (
              <li
                key={index}
                className="reveal-rise mb-6 break-inside-avoid overflow-hidden rounded-[28px] border border-accent/20 bg-white shadow-[0_30px_70px_-45px_rgba(132,66,4,0.45)]"
              >
                {testimony.video ? (
                  <PlayableVideo
                    src={testimony.video}
                    poster={testimony.photo?.src}
                    label={`Watch the testimony: ${who}`}
                    className="aspect-[4/5]"
                    radius="rounded-none"
                  />
                ) : testimony.photo ? (
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={testimony.photo.src}
                      alt={testimony.photo.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}

                <figure className="p-7 sm:p-8">
                  {testimony.quote && (
                    <blockquote className="font-display text-xl italic leading-relaxed text-ink">
                      <span aria-hidden className="mr-1 align-[-0.35em] text-5xl leading-none text-accent">
                        &ldquo;
                      </span>
                      {testimony.quote}
                    </blockquote>
                  )}

                  <figcaption className={`${testimony.quote ? "mt-6" : ""} text-sm`}>
                    <span className="block font-semibold text-brand">{who}</span>
                    {testimony.about && <span className="mt-0.5 block text-gray-500">{testimony.about}</span>}
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
