import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  /** Optional. Without one the header falls back to a designed brand panel. */
  image?: string;
  /** Small label above the heading. Defaults to the Foundation's name. */
  eyebrow?: string;
  /** Shown in the breadcrumb when the heading itself is a full sentence. */
  breadcrumbLabel?: string;
  parentTitle?: string;
  parentHref?: string;
}

export default function PageHeader({
  title,
  subtitle,
  image,
  eyebrow,
  breadcrumbLabel,
  parentTitle,
  parentHref,
}: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[340px] items-end overflow-hidden sm:min-h-[420px] lg:min-h-[520px]">
      {image ? (
        <>
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />

          {/* One gradient, weighted to the bottom where the words sit, so the
              photograph still reads. It used to carry a flat black/60 wash
              with a second black gradient on top, which buried the image. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-t from-[#1B1815]/95 via-[#1B1815]/55 to-[#1B1815]/25"
          />

          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-r from-[#2E1B05]/60 to-transparent"
          />
        </>
      ) : (
        // No photograph: a deliberate brand panel rather than a broken image.
        // The previous default pointed at /headers/default.jpg, which does not
        // exist, so every page without an image rendered a flat black block.
        <>
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-br from-[#2E1B05] via-brand-dark to-brand"
          />

          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
          >
            <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-accent/15 blur-3xl" />

            <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent-soft/10 blur-3xl" />
          </div>
        </>
      )}

      <div className="container-custom relative z-10 py-12 md:py-16">
        <nav aria-label="Breadcrumb">
          <ol className="mb-7 flex flex-wrap items-center gap-2 text-sm text-white/70">
            <li>
              <Link href="/" className="transition hover:text-accent">
                Home
              </Link>
            </li>

            {parentTitle && parentHref && (
              <>
                <li aria-hidden>/</li>

                <li>
                  <Link
                    href={parentHref}
                    className="transition hover:text-accent"
                  >
                    {parentTitle}
                  </Link>
                </li>
              </>
            )}

            <li aria-hidden>/</li>

            <li className="text-accent" aria-current="page">
              {breadcrumbLabel ?? title}
            </li>
          </ol>
        </nav>

        <span className="text-xs font-semibold uppercase tracking-[5px] text-accent">
          {eyebrow ?? "St. Hannah Foundation"}
        </span>

        <h1 className="mt-5 max-w-4xl text-4xl font-bold leading-[1.08] text-white md:text-6xl">
          {title}
        </h1>

        <div aria-hidden className="mt-7 h-1 w-16 rounded-full bg-accent" />

        <p className="mt-7 max-w-2xl text-lg leading-9 text-white/85">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
