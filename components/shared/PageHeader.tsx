import Link from "next/link";
import Image from "next/image";

interface PageHeaderProps {
  title: string;
  subtitle: string;
  image?: string;
  parentTitle?: string;
  parentHref?: string;
}

export default function PageHeader({
  title,
  subtitle,
  image = "/headers/default.jpg",
  parentTitle,
  parentHref,
}: PageHeaderProps) {
  return (
    <section className="relative min-h-[500px] md:min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}

      <Image src={image} alt={title} fill priority className="object-cover" />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />
      {/* Decorative Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
      <div className="container-custom relative z-10 py-32">
        {/* Breadcrumb */}

        <div className="flex flex-wrap items-center text-white/80 text-sm mb-8">
          <Link href="/" className="hover:text-[#D9A441] transition">
            Home
          </Link>

          {parentTitle && parentHref && (
            <>
              <span className="mx-3">/</span>

              <Link
                href={parentHref}
                className="hover:text-[#D9A441] transition"
              >
                {parentTitle}
              </Link>
            </>
          )}

          <span className="mx-3">/</span>

          <span className="text-[#D9A441]">{title}</span>
        </div>

        {/* Label */}

        <span className="uppercase tracking-[6px] text-[#D9A441] font-semibold">
          ST. HANNAH FOUNDATION
        </span>

        {/* Title */}

        <h1 className="text-5xl md:text-7xl font-bold text-white mt-6 max-w-5xl leading-tight">
          {title}
        </h1>

        {/* Divider */}

        <div className="w-24 h-1 bg-[#D9A441] mt-8 rounded-full" />

        {/* Subtitle */}

        <p className="max-w-3xl mt-8 text-lg md:text-xl text-gray-200 leading-8">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
