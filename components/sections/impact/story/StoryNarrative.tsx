import Image from "next/image";

import type { Picture, StoryParagraph } from "@/lib/cms";

/* The story itself (CR-021, CR-022). A paragraph may open a new part with its
   own heading, or be a highlighted key line, set larger in the display type.
   Pictures sit between the paragraphs: one after every second paragraph, and
   any left over at the end. */
export default function StoryNarrative({
  paragraphs,
  pictures,
}: {
  paragraphs: StoryParagraph[];
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
    if (paragraph.heading) {
      nodes.push(
        <h2
          key={`h${index}`}
          className={`font-display text-3xl font-bold leading-tight text-ink md:text-4xl ${index > 0 ? "pt-8" : ""}`}
        >
          {paragraph.heading}
        </h2>,
      );
    }

    nodes.push(
      <p
        key={`p${index}`}
        className={
          paragraph.highlight
            ? "font-display text-2xl italic leading-relaxed text-brand md:text-3xl"
            : "text-lg leading-9 text-gray-700"
        }
      >
        {paragraph.text}
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
