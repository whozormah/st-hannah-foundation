export default function SupportCategories() {
  const categories = [
    "Education Support",
    "Widow Empowerment",
    "Family Support",
    "Business Empowerment",
    "Medical Assistance",
    "Emergency Assistance",
  ];

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Available Support
          </span>

          <h2 className="text-5xl font-bold mt-4">Areas Of Assistance</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((item) => (
            <div
              key={item}
              className="bg-white rounded-[24px] p-8 border border-gray-100 hover:border-[#D9A441] hover:shadow-lg transition"
            >
              <div className="w-16 h-1 bg-[#D9A441] rounded-full mb-6" />

              <h3 className="text-xl font-bold">{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
