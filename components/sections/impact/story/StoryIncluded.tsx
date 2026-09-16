import { Check } from "lucide-react";

/* What the support included, as a short list after the story (CR-022). */
export default function StoryIncluded({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="story-included"
      className="rounded-[32px] border border-accent/20 bg-cream-warm/60 p-7 sm:p-10"
    >
      <h2 id="story-included" className="font-display text-2xl font-bold text-ink md:text-3xl">
        What the Support Included
      </h2>

      <ul className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-lg leading-8 text-gray-800">
            <span
              aria-hidden
              className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand text-white"
            >
              <Check size={14} strokeWidth={3} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
