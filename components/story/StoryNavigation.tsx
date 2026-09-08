"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface StoryNavigationProps {
  current: number;
  total: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function StoryNavigation({
  current,
  total,
  onPrevious,
  onNext,
}: StoryNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-10">
      <button
        onClick={onPrevious}
        className="group flex items-center gap-2 rounded-full border border-accent/20 bg-white px-5 py-3 font-medium text-brand transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
      >
        <ChevronLeft
          size={18}
          className="transition-transform group-hover:-translate-x-1"
        />
        Previous
      </button>

      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-[4px] text-brand">
          Story
        </p>

        <h3 className="mt-2 text-2xl font-bold text-ink">
          {String(current + 1).padStart(2, "0")}
          <span className="mx-2 text-accent">/</span>
          {String(total).padStart(2, "0")}
        </h3>
      </div>

      <button
        onClick={onNext}
        className="group flex items-center gap-2 rounded-full border border-accent/20 bg-white px-5 py-3 font-medium text-brand transition-all duration-300 hover:border-brand hover:bg-brand hover:text-white"
      >
        Next
        <ChevronRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>
    </div>
  );
}
