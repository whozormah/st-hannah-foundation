export default function ApplicationProcess() {
  const steps = [
    "Submit Application",
    "Review & Verification",
    "Assessment",
    "Approval Decision",
    "Applicant Contacted",
  ];

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Application Process
          </span>

          <h2 className="text-5xl font-bold mt-4">What Happens Next?</h2>
        </div>

        <div className="grid md:grid-cols-5 gap-6">
          {steps.map((step, index) => (
            <div
              key={step}
              className="bg-white rounded-[24px] p-8 text-center shadow-sm"
            >
              <div className="text-4xl font-bold text-[#844204]">
                {index + 1}
              </div>

              <p className="mt-4 font-medium">{step}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
