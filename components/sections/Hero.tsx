"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    image: "/hero/hero-1.jpg",
    title: "Empowering Communities Through Love and Service",
    description:
      "Supporting widows, families and vulnerable communities through sustainable programs and life-changing interventions.",
    button2: "Donate Now",
    button2Link: "/donate",
  },

  {
    image: "/hero/hero-2.jpg",
    title: "Restoring Hope Through Education And Empowerment",
    description:
      "Providing educational support, empowerment opportunities and practical assistance to those who need it most.",
    button2: "Become A Volunteer",
    button2Link: "/volunteer",
  },

  {
    image: "/hero/hero-3.jpg",
    title: "Building Stronger Families And Communities",
    description:
      "Together we are creating opportunities, strengthening families and transforming lives across communities.",
    button2: "View Programs",
    button2Link: "/programs",
  },
];

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
              className="relative min-h-[90vh] flex items-center"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/30" />

              <div className="relative z-10 container-custom">
                <div className="max-w-4xl text-white">
                  <span className="inline-block bg-[#D9A441] text-black px-4 py-2 rounded-full font-medium">
                    St. Hannah Foundation
                  </span>

                  <h1 className="mt-6 text-5xl md:text-7xl font-bold leading-tight">
                    {slide.title}
                  </h1>

                  <p className="mt-6 text-lg md:text-xl max-w-2xl text-gray-200">
                    {slide.description}
                  </p>

                  <div className="mt-10 flex flex-col sm:flex-row gap-4">
                    <Link
                      href="/apply-for-support"
                      className="bg-[#844204] hover:bg-[#A85A12] px-8 py-4 rounded-lg text-center font-semibold transition"
                    >
                      Apply For Aid
                    </Link>

                    <Link
                      href={slide.button2Link}
                      className="bg-[#D9A441] text-black hover:opacity-90 px-8 py-4 rounded-lg text-center font-semibold transition"
                    >
                      {slide.button2}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
