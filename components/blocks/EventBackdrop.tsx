"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  poster: { src: string; alt: string };
  loop: string;
  caption: string;
};

/* The section's picture, full-bleed behind the appeal on large screens and a
   band across the top on phones. It drifts slowly closer, and a short silent
   loop plays over it when there is one — both only for visitors who have not
   asked for less motion. */
export default function EventBackdrop({ poster, loop, caption }: Props) {
  const [moving, setMoving] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMoving(!reduce.matches);

    update();
    reduce.addEventListener("change", update);

    return () => reduce.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative -z-10 h-[46vh] min-h-[300px] overflow-hidden lg:absolute lg:inset-0 lg:h-auto">
      <Image
        src={poster.src}
        alt={poster.alt}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center animate-[event-drift_28s_ease-in-out_infinite_alternate] motion-reduce:animate-none lg:object-[70%_center]"
      />

      {loop && moving && (
        <video
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover lg:object-[70%_center]"
          src={loop}
          poster={poster.src}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      )}

      {/* Phones: fade the band into the section below. */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#140c05] to-transparent lg:hidden" />

      {caption && (
        <span className="absolute bottom-5 right-5 rounded-full bg-black/45 px-3 py-1 text-[11px] font-semibold uppercase tracking-[2px] text-white/90 backdrop-blur lg:bottom-8 lg:right-8">
          {caption}
        </span>
      )}
    </div>
  );
}
