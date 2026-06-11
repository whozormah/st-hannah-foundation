export default function AboutTestimonials() {
  const testimonials = [
    {
      name: "Mitchelle",
      role: "Volunteer",
      text: "Exploring the St. Hannah Foundation website already speaks volumes about the organization's vision and mission. Its commitment to touching lives and creating lasting, positive impact is both inspiring and admirable.",
    },
    {
      name: "Mrs. Adeola Johnson",
      role: "Community Beneficiary",
      text: "The support and encouragement we received restored hope during a difficult season. St. Hannah Foundation is not only helping families but restoring dignity and confidence.",
    },
    {
      name: "Pastor Samuel Okafor",
      role: "Community Leader",
      text: "The Foundation continues to demonstrate that lasting change is possible when compassion, service and community development come together.",
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Voices Of Impact
          </span>

          <h2 className="text-5xl font-bold mt-4">Stories That Inspire Us</h2>

          <p className="mt-6 text-gray-600 max-w-3xl mx-auto">
            Every story reflects lives touched, hope restored and communities
            strengthened through compassion and service.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="bg-[#FAF7F2] rounded-[24px] p-8"
            >
              <div className="text-[#D9A441] text-xl mb-4">★★★★★</div>

              <p className="text-gray-600 leading-8">"{testimonial.text}"</p>

              <div className="mt-8">
                <h4 className="font-bold">{testimonial.name}</h4>

                <p className="text-sm text-[#844204]">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
