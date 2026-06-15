"use client";

import Link from "next/link";
import slides from "@/public/data/homepage/hero.json";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  return (
    <section>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative min-h-screen flex items-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Overlay */}{" "}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
              ```
              {/* Content */}
              <div className="relative z-10 container-custom">
                <div className="max-w-3xl text-white">
                  <span className="inline-flex items-center bg-[#D9A441] text-black px-5 py-2 rounded-full font-semibold text-sm shadow-lg">
                    Serving Widows, Children & Families
                  </span>

                  <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl leading-relaxed">
                    {slide.description}
                  </p>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/apply-for-support"
                      className="bg-[#844204] hover:bg-[#A85A12] hover:scale-105 transition-all duration-300 px-8 py-4 rounded-lg text-center font-semibold shadow-lg"
                    >
                      Apply For Aid
                    </Link>

                    <Link
                      href={slide.buttonLink}
                      className="bg-[#D9A441] text-black hover:opacity-90 hover:scale-105 transition-all duration-300 px-8 py-4 rounded-lg text-center font-semibold shadow-lg"
                    >
                      {slide.buttonText}
                    </Link>
                  </div>

                  <div className="mt-10 border-l-4 border-[#D9A441] pl-5">
                    <p className="text-sm md:text-base text-gray-300 italic">
                      Every act of kindness creates hope, restores dignity and
                      transforms lives.
                    </p>
                  </div>
                </div>
              </div>
              {/* Scroll Indicator */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 animate-bounce hidden md:block">
                <span className="text-sm tracking-wider uppercase">
                  Scroll To Explore
                </span>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
