"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const galleryItems = [
  {
    image: "/gallery/gallery1.jpeg",
    title: "Bringing Hope To Communities",
    category: "Featured Moment",
    href: "/gallery",
  },
  {
    image: "/gallery/gallery2.jpeg",
    title: "Empowering Young Minds",
    category: "Education",
    href: "/gallery",
  },
  {
    image: "/gallery/gallery3.jpg",
    title: "Restoring Health & Hope",
    category: "Healthcare",
    href: "/gallery",
  },
  {
    image: "/gallery/gallery4.jpg",
    title: "Together We Thrive",
    category: "Community",
    href: "/gallery",
  },
  {
    image: "/gallery/gallery5.jpg",
    title: "Changing Lives Daily",
    category: "Empowerment",
    href: "/gallery",
  },
];

export default function GalleryPreview() {
  return (
    <section className="bg-white py-32">
      <div className="container-custom">
        {/* Header */}

        <div className="mx-auto mb-20 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
            Moments Of Impact
          </span>

          <h2 className="mt-4 text-5xl font-bold text-[#1B1815]">
            Moments That Tell Our Story
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Every photograph tells the story of a life touched, a community
            strengthened and a future filled with hope. These moments reflect
            the heart of our mission and the people who inspire it every day.
          </p>
        </div>

        {/* Gallery */}

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          {/* Hero */}

          <Link
            href="/gallery"
            className="group relative block h-[620px] overflow-hidden rounded-[40px]"
          >
            <Image
              src={galleryItems[0].image}
              alt={galleryItems[0].title}
              fill
              className="object-cover transition-all duration-1000 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

            {/* Floating Stats */}

            <div className="absolute right-8 top-8 rounded-2xl border border-white/20 bg-white/10 px-7 py-5 text-white backdrop-blur-xl">
              <h3 className="text-4xl font-bold">12,000+</h3>

              <p className="mt-1 text-xs uppercase tracking-[3px] text-white/80">
                Lives Reached
              </p>
            </div>

            {/* Caption */}

            <div className="absolute bottom-8 left-8 max-w-lg text-white">
              <span className="text-xs uppercase tracking-[4px] text-[#F5D27A]">
                {galleryItems[0].category}
              </span>

              <h3 className="mt-3 text-4xl font-bold leading-tight">
                {galleryItems[0].title}
              </h3>

              <p className="mt-4 leading-8 text-white/90">
                Every outreach represents compassion in action and lives
                transformed through hope.
              </p>
            </div>

            <div className="absolute right-8 bottom-8 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#844204] transition-transform duration-300 group-hover:scale-110">
              <ArrowUpRight size={22} />
            </div>
          </Link>

          {/* Right */}

          <div className="flex flex-col gap-6">
            {galleryItems.slice(1, 3).map((item) => (
              <Link
                key={item.title}
                href="/gallery"
                className="group relative block h-[298px] overflow-hidden rounded-[32px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-all duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                <div className="absolute bottom-6 left-6 text-white">
                  <p className="text-xs uppercase tracking-[3px] text-[#F5D27A]">
                    {item.category}
                  </p>

                  <h4 className="mt-2 text-2xl font-bold">{item.title}</h4>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom */}

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1fr_1.2fr]">
          {galleryItems.slice(3).map((item) => (
            <Link
              key={item.title}
              href="/gallery"
              className="group relative block h-[300px] overflow-hidden rounded-[32px]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover transition-all duration-1000 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs uppercase tracking-[3px] text-[#F5D27A]">
                  {item.category}
                </p>

                <h4 className="mt-2 text-2xl font-bold">{item.title}</h4>
              </div>
            </Link>
          ))}

          {/* Gallery Card */}

          <Link
            href="/gallery"
            className="group relative overflow-hidden rounded-[36px] bg-gradient-to-br from-[#6F3403] via-[#95520F] to-[#C17A1B] p-10 text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
          >
            <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-white/10 blur-3xl" />

            <div className="relative flex h-full flex-col justify-between">
              <div>
                <span className="text-xs font-semibold uppercase tracking-[4px] text-[#F5D27A]">
                  Gallery
                </span>

                <h3 className="mt-4 text-4xl font-bold leading-tight">
                  Every Picture
                  <br />
                  Tells A Story
                </h3>

                <p className="mt-6 leading-8 text-white/90">
                  Discover hundreds of moments capturing hope, resilience,
                  compassion and transformation across our communities.
                </p>
              </div>

              <div className="mt-10 flex items-end justify-between">
                <div>
                  <h2 className="text-6xl font-bold">500+</h2>

                  <p className="mt-2 text-white/80">Moments Captured</p>
                </div>

                <div className="rounded-full bg-white px-6 py-3 font-semibold text-[#844204] transition-transform duration-300 group-hover:translate-x-1">
                  Explore →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
