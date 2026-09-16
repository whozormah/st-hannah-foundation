import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import Rays from "@/components/shared/Rays";
import type { HeartOfFoundationBlock } from "@/lib/cms";
import { isSafeLink } from "@/lib/links";

/* The woman the Foundation is named after (CR-024): her portrait, framed like
   a treasured family photograph, beside a short caption from her story on the
   About page and a link to read it in full. Until a photograph is chosen, the
   drawing of her from the logo stands in; the same drawing rests faintly
   behind the words. */
export default function HeartOfFoundation({
  eyebrow,
  title,
  text,
  closing,
  image,
  buttonLabel,
  buttonLink,
}: HeartOfFoundationBlock) {
  return (
    <section className="relative overflow-hidden bg-[#2A1703] py-16 text-white md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 hidden h-[600px] w-[560px] -translate-y-1/2 opacity-[0.035] lg:block"
      >
        <Image src="/logo.png" alt="" fill sizes="560px" className="object-contain" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.18),transparent_65%)]"
      />

      <div className="container-custom relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <figure className="reveal-rise relative mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-none">
            <span aria-hidden className="absolute -inset-2.5 rounded-[38px] border border-accent/40 sm:-inset-3" />

            <span className="relative block aspect-[4/5] overflow-hidden rounded-[32px] bg-cream shadow-[0_40px_90px_-30px_rgba(0,0,0,0.65)]">
              {image ? (
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 24rem"
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/logo.png"
                  alt="A drawing of Prophetess Hannah Okoh, from the Foundation's logo."
                  fill
                  sizes="(min-width: 1024px) 40vw, 24rem"
                  className="object-contain p-10"
                />
              )}
            </span>
          </figure>

          <div className="lg:col-span-7">
            {eyebrow && (
              <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-accent-soft">
                <Rays className="h-5 w-8 shrink-0 text-accent" />
                {eyebrow}
              </p>
            )}

            <h2 className="mt-6 font-display text-4xl font-bold leading-[1.05] tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h2>

            <p className="mt-8 max-w-2xl text-lg leading-9 text-white/85">{text}</p>

            {closing && (
              <p className="mt-6 max-w-2xl font-display text-2xl italic leading-relaxed text-accent-soft">
                {closing}
              </p>
            )}

            {/* Checked when published, and again here (CNT-04). */}
            {buttonLabel && isSafeLink(buttonLink) && (
              <Link
                href={buttonLink}
                className="group mt-10 inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-semibold text-ink transition hover:bg-accent-soft focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-soft"
              >
                {buttonLabel}
                <ArrowRight aria-hidden size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
