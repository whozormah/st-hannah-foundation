import Image from "next/image";

import type { Picture } from "@/lib/cms";

/* The story itself, with its pictures placed between the paragraphs: one after
   every second paragraph, and any left over at the end. A short line, such as
   "And it is only the beginning.", is set larger as a pause (CR-021). */
export default function StoryNarrative({
  paragraphs,
  pictures,
}: {
  paragraphs: string[];
  pictures: Picture[];
}) {
  if (!paragraphs.length && !pictures.length) return null;

  const nodes: React.ReactNode[] = [];
  let next = 0;

  const figure = (picture: Picture, key: string) => (
    <figure key={key} className="reveal-rise relative aspect-[16/10] overflow-hidden rounded-[28px]">
      <Image
        src={picture.src}
        alt={picture.alt}
        fill
        sizes="(min-width: 1024px) 64rem, 100vw"
        className="object-cover"
      />
    </figure>
  );

  paragraphs.forEach((paragraph, index) => {
    const short = paragraph.trim().length < 60;

    nodes.push(
      <p
        key={`p${index}`}
        className={
          short
            ? "font-display text-2xl italic leading-relaxed text-brand md:text-3xl"
            : "text-lg leading-9 text-gray-700"
        }
      >
        {paragraph}
      </p>,
    );

    if ((index + 1) % 2 === 0 && index < paragraphs.length - 1 && next < pictures.length) {
      nodes.push(figure(pictures[next], `f${next}`));
      next += 1;
    }
  });

  while (next < pictures.length) {
    nodes.push(figure(pictures[next], `f${next}`));
    next += 1;
  }

  return <div className="space-y-8">{nodes}</div>;
}
