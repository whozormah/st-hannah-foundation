"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I apply for support?",
      answer:
        "You can apply through our Apply For Support page by completing the application form and providing any relevant supporting documents.",
    },
    {
      question: "Does submitting an application guarantee approval?",
      answer:
        "No. Every application is carefully reviewed based on need, eligibility, available resources and programme requirements.",
    },
    {
      question: "How long does the review process take?",
      answer:
        "Review timelines vary depending on the type of support requested and the volume of applications being processed.",
    },
    {
      question: "How can I volunteer with St. Hannah Foundation?",
      answer:
        "You can complete our volunteer application form and a member of our team will contact you regarding available opportunities.",
    },
    {
      question: "Do you accept corporate partnerships?",
      answer:
        "Yes. We welcome partnerships with businesses, institutions and organizations that share our commitment to creating sustainable impact.",
    },
    {
      question: "Can I refer someone who needs assistance?",
      answer:
        "Yes. Referrals are welcome and are reviewed using the same assessment process as direct applications.",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      {" "}
      <div className="container-custom">
        {" "}
        <div className="text-center mb-20">
          {" "}
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Frequently Asked Questions{" "}
          </span>
          ```
          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            We're Here To Help
          </h2>
          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Find answers to some of the most common questions about our
            programmes, partnerships, volunteer opportunities and support
            services.
          </p>
        </div>
        <div className="max-w-4xl mx-auto space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="bg-white rounded-[24px] overflow-hidden shadow-sm"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-8 text-left"
              >
                <h3 className="font-bold text-lg md:text-xl">{faq.question}</h3>

                <ChevronDown
                  className={`transition duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-8 pb-8">
                  <p className="text-gray-600 leading-8">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold">Still Have Questions?</h3>

          <p className="mt-4 text-gray-600">
            Our team would be happy to assist you.
          </p>

          <a
            href="/contact"
            className="inline-block mt-8 bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6e3503] transition"
          >
            Contact Our Team
          </a>
        </div>
      </div>
    </section>
  );
}
