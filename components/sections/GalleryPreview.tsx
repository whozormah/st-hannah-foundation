import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Camera } from "lucide-react";

import galleryData from "@/public/data/gallery.json";

interface GalleryItem {
  image: string;
  category: string;
  title: string;
}

const items: GalleryItem[] = galleryData;

// One tile per programme area, largest collection first. Built from the
// gallery data itself so new photographs appear here without a code change.
const areas = Array.from(new Set(items.map((item) => item.category)))
  .map((category) => {
    const photographs = items.filter((item) => item.category === category);

    return {
      category,
      count: photographs.length,
      cover: photographs[0].image,
      title: photographs[0].title,
    };
  })
  .sort((a, b) => b.count - a.count);

const [lead, ...supporting] = areas;

function photographLabel(count: number) {
  return `${count} ${count === 1 ? "photograph" : "photographs"}`;
}

export default function GalleryPreview() {
  return (
    <section className="bg-white py-28">
      <div className="container-custom">
        {/* Header */}

        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="font-semibold uppercase tracking-[4px] text-brand">
              Moments Of Impact
            </span>

            <h2 className="mt-4 text-4xl font-bold text-ink md:text-5xl">
              Moments That Tell Our Story
            </h2>

            <p className="mt-6 text-lg leading-9 text-gray-700">
              Every photograph records a life touched and a community
              strengthened. Browse the work by programme area, or open the full
              gallery.
            </p>
          </div>

          <Link
            href="/gallery"
            className="inline-flex shrink-0 items-center gap-3 rounded-full bg-brand px-8 py-4 font-semibold text-white transition-all duration-300 hover:gap-5 hover:bg-brand-dark"
          >
            View Full Gallery
            <ArrowUpRight size={20} />
          </Link>
        </div>

        {/* Lead area + two supporting areas */}

        <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
          <Link
            href="/gallery"
            className="group relative block h-[420px] overflow-hidden rounded-[36px] lg:h-[560px]"
          >
            <Image
              src={lead.cover}
              alt={lead.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

            <div className="absolute inset-x-8 bottom-8 text-white">
              <span className="text-sm font-semibold uppercase tracking-[3px] text-accent-soft">
                {photographLabel(lead.count)}
              </span>

              <h3 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                {lead.category}
              </h3>
            </div>

            <div className="absolute right-8 top-8 flex h-14 w-14 items-center justify-center rounded-full bg-white/95 text-brand transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight size={22} />
            </div>
          </Link>

          <div className="flex flex-col gap-6">
            {supporting.slice(0, 2).map((area) => (
              <Link
                key={area.category}
                href="/gallery"
                className="group relative block h-[240px] overflow-hidden rounded-[28px] lg:h-[268px]"
              >
                <Image
                  src={area.cover}
                  alt={area.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 35vw"
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

                <div className="absolute inset-x-6 bottom-6 text-white">
                  <span className="text-sm font-semibold uppercase tracking-[3px] text-accent-soft">
                    {photographLabel(area.count)}
                  </span>

                  <h3 className="mt-2 text-2xl font-bold">{area.category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Remaining areas + gallery card */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          {supporting.slice(2, 3).map((area) => (
            <Link
              key={area.category}
              href="/gallery"
              className="group relative block h-[260px] overflow-hidden rounded-[28px]"
            >
              <Image
                src={area.cover}
                alt={area.title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute inset-x-6 bottom-6 text-white">
                <span className="text-sm font-semibold uppercase tracking-[3px] text-accent-soft">
                  {photographLabel(area.count)}
                </span>

                <h3 className="mt-2 text-2xl font-bold">{area.category}</h3>
              </div>
            </Link>
          ))}

          <Link
            href="/gallery"
            className="group relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[28px] bg-gradient-to-br from-[#6F3403] via-[#95520F] to-[#C17A1B] p-10 text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="relative">
              <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[3px] text-accent-soft">
                <Camera size={16} />
                The Full Gallery
              </span>

              <h3 className="mt-4 text-3xl font-bold leading-tight md:text-4xl">
                Every Picture Tells A Story
              </h3>
            </div>

            <div className="relative mt-8 flex items-end justify-between gap-6">
              <div>
                <p className="text-5xl font-bold">{items.length}</p>

                <p className="mt-2 text-white/80">
                  Photographs across {areas.length} programme areas
                </p>
              </div>

              <span className="shrink-0 rounded-full bg-white px-6 py-3 font-semibold text-brand transition-transform duration-300 group-hover:translate-x-1">
                Explore
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
