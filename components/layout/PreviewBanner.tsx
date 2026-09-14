import { Eye } from "lucide-react";

import { isPreviewing } from "@/lib/preview";

/* Shown only while a content editor previews unpublished changes, so a draft
   is never mistaken for the live website. Visitors never see it. */
export default async function PreviewBanner() {
  if (!(await isPreviewing())) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-0 bottom-0 z-[100] flex flex-wrap items-center justify-center gap-x-4 gap-y-2 bg-ink px-4 py-3 text-center text-white shadow-2xl"
    >
      <span className="inline-flex items-center gap-2 font-semibold">
        <Eye size={18} aria-hidden className="text-accent" />
        Preview: you are seeing unpublished changes
      </span>

      {/* A route handler, not a page. <Link> would prefetch it — and
          prefetching this address turns preview off — so a plain anchor. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a
        href="/api/draft-preview/exit"
        className="rounded-full border border-white/40 px-4 py-1.5 text-sm font-semibold transition-colors hover:border-white hover:bg-white hover:text-ink"
      >
        Exit preview
      </a>
    </div>
  );
}
