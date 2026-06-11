import Link from "next/link";

export default function Sponsorship() {
  const opportunities = [
    "Educational Sponsorship",
    "Community Development Sponsorship",
    "Widow Empowerment Sponsorship",
    "Event Sponsorship",
    "Strategic Partnerships",
    "Corporate Social Responsibility (CSR)",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Sponsorship & Partnerships
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Become A Partner In Impact
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Organizations, businesses and individuals can partner with St.
            Hannah Charity Foundation to create sustainable impact in
            communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {opportunities.map((item) => (
            <div key={item} className="bg-[#FAF7F2] p-8 rounded-[24px]">
              <h3 className="font-bold text-xl">{item}</h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold"
          >
            Become A Sponsor
          </Link>
        </div>
      </div>
    </section>
  );
}
