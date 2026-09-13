import { getStats } from "@/lib/cms";

export default async function PartnershipImpact() {
  const { partnerships } = await getStats();

  // The figures come from Statistics, like every figure on the site
  // (CR-010). "Multiple" is not a figure; whether this should show the
  // stored communities figure (50+) instead is the Foundation's call.
  const stats = [
    {
      number: partnerships.widowsSupported,
      label: "Widows Supported",
    },
    {
      number: partnerships.familiesReached,
      label: "Families Reached",
    },
    {
      number: partnerships.studentsSponsored,
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
          <span className="uppercase tracking-[5px] text-brand font-semibold">
            Impact Created
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-4">
            What We Can Achieve Together
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-cream rounded-[28px] p-8 text-center"
            >
              <h3 className="text-3xl md:text-5xl font-bold text-brand">
                {stat.number}
              </h3>

              <p className="mt-3 text-gray-700">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
