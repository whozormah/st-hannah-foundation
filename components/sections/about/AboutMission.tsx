export default function AboutMission() {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Vision & Mission
          </span>

          <h2 className="text-5xl font-bold mt-4">Why We Exist</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#FAF7F2] rounded-[32px] p-10">
            <h3 className="text-3xl font-bold text-[#844204]">Our Vision</h3>

            <p className="mt-6 text-gray-600 leading-8">
              To build a world where every child and family, especially the
              overlooked, underserved and unheard, experiences the fullness of
              their God-given potential. We envision communities restored,
              futures rebuilt and generations empowered through love, structure
              and transformative support.
            </p>
          </div>

          <div className="bg-[#FAF7F2] rounded-[32px] p-10">
            <h3 className="text-3xl font-bold text-[#844204]">Our Mission</h3>

            <p className="mt-6 text-gray-600 leading-8">
              St. Hannah Foundation exists to uplift families and communities
              across Africa through dignified access to resources, education and
              community empowerment, igniting hope and restoring the power of
              possibility.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
