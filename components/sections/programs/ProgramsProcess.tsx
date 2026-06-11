export default function ProgramsProcess() {
  const steps = [
    "Identify Needs",
    "Assess Situation",
    "Mobilize Resources",
    "Deliver Support",
    "Measure Impact",
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Our Process
          </span>

          <h2 className="text-5xl font-bold mt-4">How We Create Impact</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {steps.map((step, index) => (
            <div key={step} className="text-center">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#844204] text-white flex items-center justify-center text-2xl font-bold">
                {index + 1}
              </div>

              <h3 className="mt-6 text-xl font-bold">{step}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
