export default function GalleryIntro() {
  return (
    <section className="py-24 bg-white">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="max-w-5xl mx-auto text-center">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Capturing Impact{" "}
          </span>
          ```
          <h2 className="text-5xl md:text-6xl font-bold mt-4 leading-tight">
            Stories Of Hope,
            <br />
            Compassion & Transformation
          </h2>
          <p className="mt-8 text-lg text-gray-600 leading-8 max-w-4xl mx-auto">
            Behind every photograph is a story of resilience, empowerment and
            restored hope. Explore moments from our outreach programmes,
            educational initiatives, widow empowerment projects, medical
            interventions, community engagements and humanitarian efforts across
            the communities we serve.
          </p>
          <div className="flex flex-wrap justify-center gap-8 mt-12 text-center">
            <div>
              <h3 className="text-3xl font-bold text-[#844204]">1000+</h3>
              <p className="text-gray-600 mt-2">Lives Impacted</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#844204]">50+</h3>
              <p className="text-gray-600 mt-2">Outreach Events</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-[#844204]">100+</h3>
              <p className="text-gray-600 mt-2">Communities Reached</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
