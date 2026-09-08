import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function GalleryFeatured() {
  return (
    <section className="bg-white pb-24">
      <div className="container-custom">
        <div className="group relative overflow-hidden rounded-[40px] shadow-2xl">
          <div className="relative h-[650px]">
            <Image
              src="/gallery/gallery1.jpeg"
              alt="Community Outreach"
              fill
              priority
              className="object-cover transition duration-1000 group-hover:scale-105"
            />

            {/* Overlay */}

            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/10" />

            {/* Content */}

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-3xl px-12 lg:px-20 text-white">
                <span className="rounded-full bg-accent/20 px-5 py-2 text-xs font-semibold uppercase tracking-[4px] text-accent-soft backdrop-blur-md">
                  Featured Collection
                </span>

                <h2 className="mt-8 text-5xl font-bold leading-tight lg:text-6xl">
                  Community Outreach
                  <br />
                  2026
                </h2>

                <p className="mt-8 max-w-2xl text-lg leading-9 text-white/90">
                  Every outreach reminds us that compassion is most powerful
                  when it becomes action. Explore moments of hope, restoration
                  and transformation from our recent community programmes.
                </p>

                <div className="mt-10 flex flex-wrap gap-8 text-sm uppercase tracking-[3px] text-white/80">
                  <span>124 Photos</span>
                  <span>Lagos, Nigeria</span>
                  <span>June 2026</span>
                </div>

                <Link
                  href="#gallery"
                  className="mt-12 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-semibold text-brand transition hover:gap-5"
                >
                  Explore Collection
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
