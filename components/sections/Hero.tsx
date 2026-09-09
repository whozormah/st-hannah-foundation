"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import slides from "@/public/data/homepage/hero.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  // Content that moves on its own for more than five seconds has to be
  // stoppable, and some people have asked their system not to animate at all.
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(query.matches);

    update();
    query.addEventListener("change", update);

    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <section>
      <h1 className="sr-only">
        St. Hannah Foundation — Restoring Hope, Empowering Lives and
        Transforming Communities
      </h1>

      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={
          reduceMotion ? false : { delay: 6000, disableOnInteraction: true }
        }
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.title}>
            {/* svh rather than vh: on phones 100vh includes the browser bar,
                so the slide ran taller than the visible screen. */}
            <div className="relative flex min-h-[100svh] items-center">
              {/* Served through next/image. These are 2MB PNGs and were set as
                  CSS background-image, which skips optimisation entirely, so
                  all three downloaded at full size on every visit. */}
              <Image
                src={slide.image}
                alt=""
                fill
                priority={index === 0}
                loading={index === 0 ? undefined : "lazy"}
                sizes="100vw"
                quality={70}
                className="object-cover"
              />

              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40"
              />

              <div className="container-custom relative z-10">
                <div className="max-w-3xl text-white">
                  <span className="inline-flex items-center rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black shadow-lg">
                    Serving Widows, Children &amp; Families
                  </span>

                  <h2 className="mt-6 text-4xl font-bold leading-tight md:text-6xl lg:text-7xl">
                    {slide.title}
                  </h2>

                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-200 md:text-xl">
                    {slide.description}
                  </p>

                  <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                    <Link
                      href={slide.buttonLink}
                      className="rounded-lg bg-accent px-8 py-4 text-center font-semibold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:opacity-90"
                    >
                      {slide.buttonText}
                    </Link>

                    <Link
                      href="/apply-for-support"
                      className="rounded-lg border border-white/40 px-8 py-4 text-center font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-ink"
                    >
                      Apply For Aid
                    </Link>
                  </div>
                </div>
              </div>

              {index === 0 && (
                <div
                  aria-hidden
                  className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-white/60 md:block"
                >
                  <span className="text-xs uppercase tracking-[3px]">
                    Scroll to explore
                  </span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
