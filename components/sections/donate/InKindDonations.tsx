import Link from "next/link";

export default function InKindDonations() {
  const items = [
    "Educational Materials",
    "School Bags",
    "Books & Stationery",
    "Food Items",
    "Clothing",
    "Business Equipment",
    "Medical Supplies",
    "Household Essentials",
  ];

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            In-Kind Donations
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Support Beyond Financial Giving
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Your donated items can make a direct and meaningful impact in the
            lives of individuals and families we support.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item}
              className="bg-white p-6 rounded-[24px] text-center shadow-sm"
            >
              {item}
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/contact"
            className="inline-flex bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold"
          >
            Donate Items
          </Link>
        </div>
      </div>
    </section>
  );
}
