import Image from "next/image";
import Link from "next/link";

import programs from "@/public/data/programs.json";

export async function generateStaticParams() {
  return programs.map((program) => ({
    slug: program.slug,
  }));
}

interface Program {
  slug: string;
  title: string;
  heroImage: string;
  excerpt: string;
  why: string;
  approach: string;
  impact: string;
  activities: string[];
  beneficiaries: string[];
  ctaTitle: string;
  ctaText: string;
}

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProgramPage({ params }: PageProps) {
  const { slug } = await params;

  const program = (programs as Program[]).find((item) => item.slug === slug);

  if (!program) {
    return (
      <div className="container-custom py-32 text-center">
        {" "}
        <h1 className="text-4xl font-bold">Programme Not Found </h1>
        <Link
          href="/programs"
          className="inline-block mt-8 bg-[#844204] text-white px-8 py-4 rounded-xl"
        >
          Back To Programmes
        </Link>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}

      <section className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <Image
          src={program.heroImage}
          alt={program.title}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex items-center">
          <div className="container-custom text-white">
            <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
              Programme Area
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-6 max-w-4xl">
              {program.title}
            </h1>

            <p className="max-w-3xl mt-8 text-lg md:text-xl text-gray-200 leading-8">
              {program.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Why */}

      <section className="py-28 bg-white">
        <div className="container-custom max-w-5xl">
          <span className="uppercase tracking-[4px] text-[#844204] font-semibold">
            Why This Matters
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            The Need We Are Addressing
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-9">{program.why}</p>
        </div>
      </section>

      {/* Approach */}

      <section className="py-28 bg-[#FAF7F2]">
        <div className="container-custom max-w-5xl">
          <span className="uppercase tracking-[4px] text-[#844204] font-semibold">
            Our Approach
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            How We Respond
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-9">
            {program.approach}
          </p>
        </div>
      </section>

      {/* Activities */}

      <section className="py-28 bg-white">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold">Key Activities</h3>

              <div className="mt-8 space-y-4">
                {program.activities.map((activity) => (
                  <div key={activity} className="bg-[#FAF7F2] rounded-2xl p-5">
                    {activity}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-3xl font-bold">Who We Support</h3>

              <div className="mt-8 space-y-4">
                {program.beneficiaries.map((beneficiary) => (
                  <div
                    key={beneficiary}
                    className="bg-[#FAF7F2] rounded-2xl p-5"
                  >
                    {beneficiary}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact */}

      <section className="py-28 bg-[#FAF7F2]">
        <div className="container-custom max-w-5xl text-center">
          <span className="uppercase tracking-[4px] text-[#844204] font-semibold">
            Expected Impact
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Creating Lasting Change
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-9">
            {program.impact}
          </p>
        </div>
      </section>

      {/* CTA */}

      <section className="py-28 bg-[#844204] text-white">
        <div className="container-custom max-w-4xl text-center">
          <h2 className="text-4xl md:text-6xl font-bold">{program.ctaTitle}</h2>

          <p className="mt-8 text-lg text-gray-200 leading-8">
            {program.ctaText}
          </p>

          <Link
            href="/contact"
            className="inline-block mt-10 bg-white text-[#844204] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Get Involved
          </Link>
        </div>
      </section>
    </>
  );
}
