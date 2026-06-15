import {
  FileText,
  Search,
  ClipboardCheck,
  Phone,
  HeartHandshake,
} from "lucide-react";

export default function ApplicationProcess() {
  const steps = [
    {
      icon: FileText,
      title: "Submit Your Application",
      description:
        "Complete the support application form and provide all relevant information regarding your request.",
    },
    {
      icon: Search,
      title: "Review & Verification",
      description:
        "Our team carefully reviews applications and may request additional information where necessary.",
    },
    {
      icon: ClipboardCheck,
      title: "Assessment",
      description:
        "Applications are assessed based on need, eligibility, available resources and programme requirements.",
    },
    {
      icon: Phone,
      title: "Follow-Up",
      description:
        "Applicants may be contacted for clarification, verification or further discussion regarding their request.",
    },
    {
      icon: HeartHandshake,
      title: "Support Decision",
      description:
        "Successful applicants are guided through the next steps and connected with the appropriate support programme.",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center max-w-4xl mx-auto mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Application Process{" "}
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            What Happens After You Apply?
          </h2>
          <p className="mt-6 text-lg text-gray-600 leading-8">
            Every application is carefully reviewed by our team to ensure
            support reaches those who need it most. The process below outlines
            what you can expect after submitting your request.
          </p>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-lg transition"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
                  <Icon size={28} className="text-[#844204]" />
                </div>

                <div className="text-sm font-semibold text-[#844204] mb-3">
                  STEP {index + 1}
                </div>

                <h3 className="text-xl font-bold">{step.title}</h3>

                <p className="mt-4 text-gray-600 leading-7 text-sm">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
