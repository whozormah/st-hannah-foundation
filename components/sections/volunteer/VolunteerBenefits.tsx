return (
  <section className="py-28 bg-white">
    <div className="container-custom">
      <div className="mx-auto mb-20 max-w-4xl text-center">
        <span className="font-semibold uppercase tracking-[5px] text-[#844204]">
          Why Volunteer With Us
        </span>

        <h2 className="mt-4 text-5xl font-bold">
          More Than Service.
          <br />A Journey Of Growth & Impact.
        </h2>

        <p className="mt-6 text-lg leading-8 text-gray-600">
          Volunteering with St. Hannah Foundation offers an opportunity to make
          a difference while developing valuable skills, building meaningful
          relationships and contributing to sustainable community
          transformation.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="rounded-[28px] border border-gray-100 bg-[#FAF7F2] p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <h3 className="text-2xl font-bold text-[#1B1815]">
              {benefit.title}
            </h3>

            <div className="mt-4 h-[3px] w-14 rounded-full bg-[#D9A441]" />

            <p className="mt-6 leading-8 text-gray-600">
              {benefit.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);
