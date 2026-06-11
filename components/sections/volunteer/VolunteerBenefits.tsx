export default function VolunteerBenefits() {
  const benefits = [
    "Make a meaningful impact in communities",
    "Develop leadership and teamwork skills",
    "Build valuable professional experience",
    "Network with passionate changemakers",
    "Receive volunteer recognition and certificates",
    "Contribute to sustainable community development",
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Why Volunteer
          </span>

          <h2 className="text-5xl font-bold mt-4">Benefits Of Volunteering</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {benefits.map((benefit) => (
            <div key={benefit} className="bg-[#FAF7F2] p-8 rounded-[24px]">
              {benefit}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
