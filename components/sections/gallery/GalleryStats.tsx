export default function GalleryStats() {
  const stats = [
    {
      number: "500+",
      label: "Photos",
    },
    {
      number: "120+",
      label: "Outreach Events",
    },
    {
      number: "25+",
      label: "Communities",
    },
    {
      number: "10+",
      label: "Years of Impact",
    },
  ];

  return (
    <section className="bg-cream py-20">
      <div className="container-custom">
        <div className="grid gap-8 rounded-[36px] border border-accent/10 bg-white p-12 shadow-xl md:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <h3 className="text-5xl font-bold text-brand">
                {stat.number}
              </h3>

              <div className="mx-auto my-5 h-px w-12 bg-accent" />

              <p className="text-sm font-semibold uppercase tracking-[3px] text-gray-500">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
