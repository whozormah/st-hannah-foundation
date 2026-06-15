export default function PartnershipImpact() {
  const stats = [
    {
      number: "500+",
      label: "Widows Supported",
    },
    {
      number: "100+",
      label: "Families Reached",
    },
    {
      number: "15+",
      label: "Students Sponsored",
    },
    {
      number: "Multiple",
      label: "Communities Impacted",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Impact Created
          </span>

          <h2 className="text-5xl font-bold mt-4">
            What We Can Achieve Together
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#FAF7F2] rounded-[28px] p-8 text-center"
            >
              <h3 className="text-5xl font-bold text-[#844204]">
                {stat.number}
              </h3>

              <p className="mt-3 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
