export default function ProgramsStats() {
  const stats = [
    {
      number: "10+",
      label: "Years of Compassion",
    },
    {
      number: "1,000+",
      label: "Lives Reached",
    },
    {
      number: "50+",
      label: "Outreach Activities",
    },
    {
      number: "2",
      label: "Countries Represented",
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Program Impact
          </span>

          <h2 className="text-5xl font-bold mt-4">Impact In Numbers</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#FAF7F2] rounded-[32px] p-10 text-center"
            >
              <h3 className="text-5xl font-bold text-[#844204]">
                {stat.number}
              </h3>

              <p className="mt-4 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
