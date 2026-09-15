import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Rays from "@/components/shared/Rays";
import TitleLines from "@/components/shared/TitleLines";
import { getStories } from "@/lib/cms";
import { SECTION_COPY, type SectionCopy } from "@/lib/section-copy";

/* The homepage's three impact stories (CR-018), set like a magazine: the
   first story fills a tall cover with its words over the photograph, the
   other two sit beside it as slim cards. Every word, and the link to the
   full index, are the site's own; the stories come from the CMS. */

interface Story {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
}

function Category({ children, onDark = false }: { children: string; onDark?: boolean }) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-[4px] ${
        onDark ? "text-accent-soft" : "text-brand"
      }`}
    >
      {children}
    </span>
  );
}

function ReadLink({ onDark = false }: { onDark?: boolean }) {
  return (
    <span
      className={`mt-5 inline-flex items-center gap-2 font-semibold ${
        onDark ? "text-accent-soft" : "text-brand"
      }`}
    >
      Read Full Story
      <ArrowRight
        aria-hidden
        size={18}
        className="transition-transform duration-300 group-hover:translate-x-1.5"
      />
    </span>
  );
}

export default async function ImpactStories({
  eyebrow = SECTION_COPY.storyCards.eyebrow,
  title = SECTION_COPY.storyCards.title,
  description = SECTION_COPY.storyCards.description,
}: SectionCopy = {}) {
  const allStories: Story[] = await getStories();

  // Teaser; /impact-stories carries the full index.
  const [lead, ...rest] = allStories.slice(0, 3);

  return (
    <section className="relative overflow-hidden bg-white py-16 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-52 top-24 h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.16),transparent_65%)]"
      />

      <div className="container-custom relative">
        {/* Header */}
        <div className="max-w-3xl">
          {eyebrow && (
            <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-brand">
              <Rays className="h-5 w-8 shrink-0 text-accent" />
              {eyebrow}
            </p>
          )}

          <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl">
            <TitleLines text={title} />
          </h2>

          {description && (
            <p className="mt-6 text-lg leading-9 text-gray-700">{description}</p>
          )}
        </div>

        {lead && (
          <div className="mt-14 grid gap-6 lg:grid-cols-12">
            {/* The lead story, told over its photograph */}
            <Link
              href={`/impact-stories/${lead.slug}`}
              className="reveal-rise group relative flex min-h-[26rem] overflow-hidden rounded-[36px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand lg:col-span-7 lg:min-h-[34rem]"
            >
              <Image
                src={lead.image}
                alt={lead.title}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition duration-700 group-hover:scale-[1.04]"
              />

              <span
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-[#1B0E02] via-[#1B0E02]/70 to-transparent"
              />

              <span className="relative mt-auto block p-7 text-white sm:p-10">
                <Category onDark>{lead.category}</Category>

                <span className="mt-3 block font-display text-3xl font-bold leading-tight sm:text-4xl">
                  {lead.title}
                </span>

                <span className="mt-4 block max-w-xl leading-8 text-white/80">
                  {lead.excerpt}
                </span>

                <ReadLink onDark />
              </span>
            </Link>

            {/* The other two, side by side with the cover */}
            <div className="grid content-start gap-6 lg:col-span-5">
              {rest.map((story) => (
                <Link
                  key={story.slug}
                  href={`/impact-stories/${story.slug}`}
                  className="reveal-rise group flex flex-col gap-5 rounded-[28px] border border-accent/20 bg-cream-warm/60 p-5 transition-colors duration-500 hover:border-accent/60 hover:bg-cream-warm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand sm:flex-row sm:p-6"
                >
                  {/* On phones the picture sits above the words, so the title has the full width. */}
                  <span className="relative block h-44 w-full shrink-0 overflow-hidden rounded-2xl sm:h-32 sm:w-32">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(min-width: 640px) 128px, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-[1.06]"
                    />
                  </span>

                  <span className="block flex-1">
                    <Category>{story.category}</Category>

                    <span className="mt-2 block font-display text-2xl font-bold leading-tight text-ink">
                      {story.title}
                    </span>

                    <span className="mt-3 block leading-7 text-gray-700">
                      {story.excerpt}
                    </span>

                    <ReadLink />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* The full index */}
        <div className="mt-12 flex justify-center border-t border-accent/20 pt-10">
          <Link
            href="/impact-stories"
            className="inline-flex items-center gap-3 rounded-xl bg-brand px-8 py-4 font-semibold text-white transition hover:bg-brand-dark"
          >
            View All Impact Stories
            <ArrowRight aria-hidden size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
