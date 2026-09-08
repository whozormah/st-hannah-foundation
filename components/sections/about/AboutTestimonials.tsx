import { Quote } from "lucide-react";

import testimonialsData from "@/public/data/testimonials.json";

interface Testimonial {
  name: string;
  role: string;
  text: string;
}

const testimonials: Testimonial[] = testimonialsData;

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function Testimonials() {
  if (!testimonials.length) return null;

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#2E1B05] via-brand-dark to-brand py-14 md:py-24">
      {/* Decorative wash */}

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl" />

        <div className="absolute -right-32 bottom-0 h-[380px] w-[380px] rounded-full bg-accent-soft/10 blur-3xl" />
      </div>

      <div className="container-custom relative">
        {/* Heading */}

        <div className="max-w-3xl">
          <span className="font-semibold uppercase tracking-[4px] text-accent-soft">
            In Their Own Words
          </span>

          <h2 className="mt-4 text-4xl font-bold leading-tight text-white md:text-5xl">
            Voices From The Communities We Serve
          </h2>

          <p className="mt-6 text-lg leading-9 text-white/80">
            Beneficiaries, volunteers and community leaders on what the
            Foundation&apos;s work has meant to them.
          </p>
        </div>

        {/* Voices */}

        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex h-full flex-col rounded-[28px] border border-white/10 bg-white/[0.07] p-9 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2 hover:border-accent/40 hover:bg-white/[0.11]"
            >
              <Quote
                aria-hidden
                size={34}
                className="shrink-0 text-accent"
                strokeWidth={1.5}
              />

              <blockquote className="mt-6 flex-1 text-lg leading-9 text-white/90">
                {testimonial.text}
              </blockquote>

              <figcaption className="mt-8 flex items-center gap-4 border-t border-white/10 pt-7">
                <span
                  aria-hidden
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent font-bold text-[#2E1B05]"
                >
                  {initials(testimonial.name)}
                </span>

                <span>
                  <span className="block font-bold text-white">
                    {testimonial.name}
                  </span>

                  <span className="mt-1 block text-sm font-medium text-accent-soft">
                    {testimonial.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
