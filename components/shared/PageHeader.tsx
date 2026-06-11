import Link from "next/link";

interface PageHeaderProps {
  title: string;
  subtitle: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-white to-white">
      {/* Decorative Background */}

      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#D9A441]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#844204]/10 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative py-28 md:py-36">
        {/* Breadcrumb */}

        <div className="flex justify-center items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-[#844204] transition">
            Home
          </Link>

          <span className="mx-3">/</span>

          <span className="text-[#844204] font-medium">{title}</span>
        </div>

        {/* Content */}

        <div className="max-w-5xl mx-auto text-center">
          <span className="uppercase tracking-[8px] text-[#844204] font-semibold">
            ST. HANNAH FOUNDATION
          </span>

          <h1 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
            {title}
          </h1>

          <div className="w-24 h-1 bg-[#D9A441] mx-auto mt-8 rounded-full" />

          <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-gray-600 leading-8">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
