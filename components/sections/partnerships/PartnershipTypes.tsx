export default function PartnershipTypes() {
  const types = [
    "Corporate Sponsorship",
    "CSR Partnerships",
    "Church Partnerships",
    "Educational Institution Partnerships",
    "Community Development Projects",
    "Programme Sponsorship",
    "Media Partnerships",
    "In-Kind Donations",
  ];

  return (
    <section className="py-24 bg-cream">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-brand font-semibold">
            Partnership Opportunities
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mt-4">Ways To Partner With Us</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {types.map((type) => (
            <div
              key={type}
              className="bg-white rounded-[24px] p-6 text-center shadow-sm"
            >
              <h3 className="font-semibold">{type}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
