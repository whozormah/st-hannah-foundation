"use client";

import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import testimonialsData from "@/public/data/testimonials.json";

import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

const testimonials: Testimonial[] = testimonialsData;

export default function Testimonials() {

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2);

  return (
    <section className="relative overflow-hidden bg-white py-32">
      {/* Decorative Background */}

      <div className="absolute inset-0">
        <div className="absolute -top-44 left-0 h-[420px] w-[420px] rounded-full bg-[#FAF7F2]" />

        <div className="absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-[#FAF7F2]/70" />
      </div>

      <div className="container-custom relative">
        {/* Heading */}

        <div className="mx-auto mb-24 max-w-4xl text-center">
          <span className="uppercase tracking-[6px] font-semibold text-[#844204]">
            Voices Of Impact
          </span>

          <h2 className="mt-5 text-5xl md:text-6xl font-bold leading-tight text-[#1B1815]">
            Stories That Inspire Hope
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            Behind every programme is a story of resilience, compassion and
            transformed lives. These voices remind us why our mission matters.
          </p>
        </div>

        {/* Testimonials */}

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={32}
          loop
          autoplay={{
            delay: 4500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            900: {
              slidesPerView: 2,
            },
          }}
          className="pb-16"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="h-auto">
              <article className="group flex h-full flex-col rounded-[34px] border border-[#D9A441]/15 bg-white p-10 shadow-lg transition-all duration-700 hover:-translate-y-3 hover:shadow-2xl">
                {/* Quote */}

                <div className="text-[80px] leading-none text-[#D9A441]/15 font-serif">
                  “
                </div>

                <p className="-mt-8 flex-1 text-[17px] italic leading-9 text-gray-600">
                  {testimonial.text}
                </p>

                {/* Divider */}

                <div className="mt-10 h-px w-20 bg-[#D9A441]" />

                {/* Profile */}

                <div className="mt-8 flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#844204] to-[#A86A1F] text-lg font-bold text-white shadow-lg">
                    {getInitials(testimonial.name)}
                  </div>

                  <div>
                    <h4 className="text-xl font-bold text-[#1B1815]">
                      {testimonial.name}
                    </h4>

                    <p className="mt-1 text-sm font-medium text-[#844204]">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
