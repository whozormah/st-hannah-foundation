"use client";

import { useEffect, useState } from "react";
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch("/data/testimonials.json")
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        {/* Header */}

        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Voices Of Impact
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4 text-[#1B1815]">
            Stories That Inspire Us
          </h2>

          <p className="mt-6 text-gray-600 leading-8">
            Every story reflects lives touched, hope restored and communities
            strengthened through compassion and service.
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 3500,
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
            768: {
              slidesPerView: 1,
            },
            1200: {
              slidesPerView: 2,
            },
          }}
          className="pb-14"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-[#FAF7F2] rounded-[28px] p-8 border border-[#D9A441]/10 h-full hover:shadow-xl transition-all duration-300">
                <div className="text-[#D9A441] text-xl mb-5">★★★★★</div>

                <p className="text-gray-600 leading-8 italic">
                  "{testimonial.text}"
                </p>

                <div className="mt-8 pt-6 border-t border-[#D9A441]/20">
                  <h4 className="font-bold text-lg text-[#1B1815]">
                    {testimonial.name}
                  </h4>

                  <p className="text-[#844204] text-sm mt-1">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
