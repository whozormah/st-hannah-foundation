export default function DonationImpact() {
  const stats = [
    {
      number: "500+",
      label: "Widows Reached",
    },
    {
      number: "15+",
      label: "UTME Candidates Sponsored",
    },
    {
      number: "100+",
      label: "Families Supported",
    },
    {
      number: "Multiple",
      label: "Communities Impacted",
    },
  ];

  const causes = [
    {
      title: "Education Support",
      description:
        "Help students access educational materials, school supplies and examination sponsorship opportunities.",
    },
    {
      title: "Widow Empowerment",
      description:
        "Support empowerment initiatives, welfare programs and sustainable livelihood opportunities.",
    },
    {
      title: "Family Support",
      description:
        "Provide food assistance, welfare support and essential resources to vulnerable families.",
    },
    {
      title: "Community Outreach",
      description:
        "Help us reach underserved communities through interventions, outreach programs and support services.",
    },
    {
      title: "Business Empowerment",
      description:
        "Support small business grants and economic empowerment initiatives for beneficiaries.",
    },
  ];

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="container-custom">
        {/* Section Header */}

        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Your Impact
          </span>

          <h2 className="text-5xl font-bold mt-4">Real Lives. Real Change.</h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Every donation contributes directly to programs and initiatives that
            empower individuals, strengthen families and create opportunities
            for sustainable growth.
          </p>
        </div>

        {/* Impact Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[24px] p-8 text-center shadow-sm border border-gray-100"
            >
              <h3 className="text-5xl font-bold text-[#844204]">
                {stat.number}
              </h3>

              <p className="mt-3 text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Support Areas Header */}

        <div className="text-center mb-14">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Support Areas
          </span>

          <h2 className="text-4xl font-bold mt-4">Where Your Support Goes</h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Your generosity enables us to continue delivering impactful programs
            that transform lives and strengthen communities.
          </p>
        </div>

        {/* Support Areas Grid */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {causes.map((cause) => (
            <div
              key={cause.title}
              className="bg-white rounded-[24px] p-8 border border-gray-100 hover:border-[#D9A441] hover:shadow-lg transition duration-300"
            >
              <div className="w-16 h-1 bg-[#D9A441] rounded-full mb-6" />

              <h3 className="text-xl font-bold">{cause.title}</h3>

              <p className="mt-4 text-gray-600 leading-7">
                {cause.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
