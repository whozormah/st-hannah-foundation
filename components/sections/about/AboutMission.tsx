import Image from "next/image";

import foundation from "@/public/data/homepage/foundation.json";

export default function AboutMission() {
  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto mb-16 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-brand">
            Our Story
          </span>

          <h2 className="mt-5 text-3xl font-bold text-ink md:text-5xl">
            Built On Compassion.{" "}
            <br />
            Driven By Purpose.
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-accent" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-700">
            {foundation.description}
          </p>
        </div>

        {/* Story */}

        <div className="grid items-center gap-10 md:gap-20 lg:grid-cols-2">
          {/* Left */}

          <div className="relative">
            <div className="relative h-[380px] sm:h-[500px] lg:h-[650px] overflow-hidden rounded-[40px]">
              <Image
                src="/about/story.jpg"
                alt="About St. Hannah Foundation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-6 right-4 rounded-[28px] border border-accent/20 bg-white p-6 shadow-2xl sm:p-8 lg:-bottom-10 lg:-right-10">
              <h3 className="text-3xl md:text-5xl font-bold text-brand">10+</h3>

              <p className="mt-2 uppercase tracking-[3px] text-sm text-gray-500">
                Years of Service
              </p>
            </div>
          </div>

          {/* Right */}

          <div>
            <span className="font-semibold uppercase tracking-[5px] text-brand">
              Who We Are
            </span>

            <h3 className="mt-5 text-4xl font-bold text-ink">
              Serving Communities Through Faith, Compassion & Action
            </h3>

            <p className="mt-8 text-lg leading-9 text-gray-700">
              We believe every individual deserves dignity, opportunity and the
              support needed to thrive. Through education, healthcare,
              empowerment initiatives and humanitarian outreach, we work
              alongside communities to create sustainable impact that lasts for
              generations.
            </p>

            <div className="mt-12 grid gap-8">
              {/* Vision */}

              <div className="rounded-[28px] border border-accent/20 bg-cream p-8">
                <h4 className="text-2xl font-bold text-brand">
                  Our Vision
                </h4>

                <p className="mt-4 leading-8 text-gray-700">
                  {foundation.vision}
                </p>
              </div>

              {/* Mission */}

              <div className="rounded-[28px] border border-accent/20 bg-white p-8 shadow-lg">
                <h4 className="text-2xl font-bold text-brand">
                  Our Mission
                </h4>

                <p className="mt-4 leading-8 text-gray-700">
                  {foundation.mission}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
