"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface StoryCTAProps {
  name: string;
  videoLink?: string;
  onDonate: () => void;
}

export default function StoryCTA({ name, videoLink, onDonate }: StoryCTAProps) {
  return (
    <div className="mt-16 overflow-hidden rounded-[36px] bg-gradient-to-br from-brand via-[#915111] to-[#A86A1F] p-6 sm:p-10 text-white shadow-2xl">
      <span className="uppercase tracking-[4px] text-sm font-semibold text-white/80">
        Every Gift Creates Impact
      </span>

      <h3 className="mt-4 text-4xl font-bold leading-tight">
        Help Rewrite This Story
      </h3>

      <p className="mt-6 max-w-xl leading-8 text-white/90">
        Every contribution helps provide hope, protection, healthcare, education
        and a brighter future for vulnerable children and families.
      </p>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <button
          onClick={onDonate}
          className="rounded-2xl bg-white px-8 py-4 font-semibold text-brand transition-all duration-300 hover:scale-[1.03]"
        >
          Support {name}
        </button>

        {videoLink && videoLink !== "#" && (
          <Link
            href={videoLink}
            target="_blank"
            className="group flex items-center justify-center gap-2 rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-brand"
          >
            Watch Story
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        )}
      </div>
    </div>
  );
}
