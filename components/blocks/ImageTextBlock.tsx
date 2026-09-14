import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import TitleLines from "@/components/shared/TitleLines";
import { isSafeLink } from "@/lib/links";

type Props = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
  imageAlt: string;
  imagePosition: "left" | "right";
  buttonLabel: string;
  buttonLink: string;
};

/* A photograph beside a heading and text, in the layout the About page uses. */
export default function ImageTextBlock({
  eyebrow,
  title,
  text,
  image,
  imageAlt,
  imagePosition,
  buttonLabel,
  buttonLink,
}: Props) {
  if (!title || !image) return null;

  const showButton = buttonLabel && buttonLink && isSafeLink(buttonLink);

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <div className="grid items-center gap-10 md:gap-20 lg:grid-cols-2">
          <div
            className={`relative h-[320px] overflow-hidden rounded-[40px] sm:h-[440px] ${
              imagePosition === "right" ? "lg:order-last" : ""
            }`}
          >
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>

          <div>
            {eyebrow && (
              <span className="font-semibold uppercase tracking-[5px] text-brand">{eyebrow}</span>
            )}

            <h2 className="mt-5 text-3xl font-bold leading-tight text-ink md:text-4xl">
              <TitleLines text={title} />
            </h2>

            {text.split(/\n{2,}/).map((paragraph, index) => (
              <p key={index} className="mt-6 text-lg leading-9 text-gray-700">
                {paragraph}
              </p>
            ))}

            {showButton && (
              <Link
                href={buttonLink}
                className="group mt-10 inline-flex items-center gap-3 rounded-full border border-brand px-7 py-3 font-semibold text-brand transition-all duration-300 hover:bg-brand hover:text-white"
              >
                {buttonLabel}
                <ArrowRight
                  size={18}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
