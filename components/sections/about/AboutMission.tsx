export default function AboutMission() {
  return (
    <section className="bg-white py-32">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto mb-24 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-[#844204]">
            Our Story
          </span>

          <h2 className="mt-5 text-5xl font-bold text-[#1B1815] md:text-6xl">
            Built On Compassion.
            <br />
            Driven By Purpose.
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[#D9A441]" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            To build a future where every child, family, and community,
            especially those who are overlooked, underserved, and vulnerable,
            has the opportunity to thrive, fulfill their God given potential,
            and create a legacy of hope, dignity, and lasting transformation for
            generations to come.
          </p>
        </div>

        {/* Story */}

        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left */}

          <div className="relative">
            <div className="overflow-hidden rounded-[40px]">
              <img
                src="/about/story.jpg"
                alt="About St. Hannah Foundation"
                className="h-[650px] w-full object-cover"
              />
            </div>

            {/* Floating Card */}

            <div className="absolute -bottom-10 -right-10 rounded-[28px] border border-[#D9A441]/20 bg-white p-8 shadow-2xl">
              <h3 className="text-5xl font-bold text-[#844204]">10+</h3>

              <p className="mt-2 uppercase tracking-[3px] text-sm text-gray-500">
                Years of Service
              </p>
            </div>
          </div>

          {/* Right */}

          <div>
            <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
              Who We Are
            </span>

            <h3 className="mt-5 text-4xl font-bold text-[#1B1815]">
              Serving Communities Through Faith, Compassion & Action
            </h3>

            <p className="mt-8 text-lg leading-9 text-gray-600">
              We believe every individual deserves dignity, opportunity and the
              support needed to thrive. Through education, healthcare,
              empowerment initiatives and humanitarian outreach, we work
              alongside communities to create sustainable impact that lasts for
              generations.
            </p>

            <div className="mt-12 grid gap-8">
              {/* Vision */}

              <div className="rounded-[28px] border border-[#D9A441]/20 bg-[#FAF7F2] p-8">
                <h4 className="text-2xl font-bold text-[#844204]">
                  Our Vision
                </h4>

                <p className="mt-4 leading-8 text-gray-600">
                  To build a world where every child and family, especially the
                  overlooked, underserved and unheard, experiences the fullness
                  of their God-given potential.
                </p>
              </div>

              {/* Mission */}

              <div className="rounded-[28px] border border-[#D9A441]/20 bg-white p-8 shadow-lg">
                <h4 className="text-2xl font-bold text-[#844204]">
                  Our Mission
                </h4>

                <p className="mt-4 leading-8 text-gray-600">
                  St. Hannah Foundation exists to uplift families and
                  communities across Africa through dignified access to
                  resources, education and community empowerment, igniting hope
                  and restoring the power of possibility.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}

        <div className="mt-24 rounded-[40px] bg-[#844204] p-14 text-white">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <span className="uppercase tracking-[5px] text-[#D9A441]">
                Our Values
              </span>

              <h3 className="mt-5 text-4xl font-bold">
                The Principles That Guide Every Decision
              </h3>

              <p className="mt-8 text-lg leading-9 text-white/80">
                Everything we do is rooted in values that inspire trust, build
                relationships and create lasting impact within the communities
                we serve.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-5">
              {[
                "Compassion",
                "Integrity",
                "Service",
                "Excellence",
                "Accountability",
                "Community Impact",
              ].map((value) => (
                <div
                  key={value}
                  className="rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm"
                >
                  <p className="font-semibold">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
