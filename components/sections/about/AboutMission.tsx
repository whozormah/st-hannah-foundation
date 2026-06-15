export default function AboutMission() {
  return (
    <section className="py-32 bg-white">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Vision, Mission & Values{" "}
          </span>
          ```
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            The Foundation Of Everything We Do
          </h2>
          <p className="mt-6 text-gray-600 text-lg leading-8">
            Our vision, mission and values guide every programme, partnership
            and initiative as we work to restore hope, strengthen communities
            and create opportunities for lasting transformation.
          </p>
        </div>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Vision */}

          <div className="bg-[#FAF7F2] rounded-[32px] p-10 hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#844204] text-white flex items-center justify-center font-bold text-xl">
              V
            </div>

            <h3 className="text-3xl font-bold text-[#844204] mt-8">
              Our Vision
            </h3>

            <p className="mt-6 text-gray-600 leading-8">
              To build a world where every child and family, especially the
              overlooked, underserved and unheard, experiences the fullness of
              their God-given potential. We envision communities restored,
              futures rebuilt and generations empowered through love, structure
              and transformative support.
            </p>
          </div>

          {/* Mission */}

          <div className="bg-[#FAF7F2] rounded-[32px] p-10 hover:-translate-y-2 transition-all duration-300">
            <div className="w-14 h-14 rounded-2xl bg-[#844204] text-white flex items-center justify-center font-bold text-xl">
              M
            </div>

            <h3 className="text-3xl font-bold text-[#844204] mt-8">
              Our Mission
            </h3>

            <p className="mt-6 text-gray-600 leading-8">
              St. Hannah Foundation exists to uplift families and communities
              across Africa through dignified access to resources, education and
              community empowerment, igniting hope and restoring the power of
              possibility.
            </p>
          </div>

          {/* Values */}

          <div className="bg-[#844204] text-white rounded-[32px] p-10 hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-3xl font-bold">Our Values</h3>

            <ul className="mt-8 space-y-4">
              <li>• Compassion</li>
              <li>• Integrity</li>
              <li>• Service</li>
              <li>• Excellence</li>
              <li>• Accountability</li>
              <li>• Community Impact</li>
            </ul>

            <p className="mt-8 text-white/80 leading-7">
              These values shape our culture, guide our decisions and define how
              we serve individuals, families and communities.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
