"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, MessageCircle, ArrowRight } from "lucide-react";

export default function ContactFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "How do I apply for support?",
      answer:
        "You can submit an application through our Apply for Support page. Each application is carefully reviewed based on eligibility, need and available programme resources.",
    },
    {
      question: "Does submitting an application guarantee approval?",
      answer:
        "No. Every application undergoes an assessment process to ensure available resources reach individuals and families with the greatest need.",
    },
    {
      question: "How long does the review process take?",
      answer:
        "Processing times vary depending on the programme and application volume. Our team will keep you informed throughout the review process.",
    },
    {
      question: "How can I volunteer with St. Hannah Foundation?",
      answer:
        "Complete the Volunteer Application form and our team will contact you regarding available opportunities that match your skills and interests.",
    },
    {
      question: "Do you welcome corporate partnerships?",
      answer:
        "Absolutely. We collaborate with businesses, churches, institutions and organisations that share our vision of creating sustainable impact.",
    },
    {
      question: "Can I refer someone who needs assistance?",
      answer:
        "Yes. Referrals are welcome and are assessed using the same transparent review process as direct applications.",
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="container-custom">
        {/* Header */}

        <div className="mx-auto mb-20 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-[#844204]">
            Frequently Asked Questions
          </span>

          <h2 className="mt-5 text-5xl md:text-6xl font-bold leading-tight text-[#1B1815]">
            Answers To The
            <br />
            Questions We Hear Most
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[#D9A441]" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            We've answered some of the most common questions about our
            programmes, partnerships, volunteering opportunities and support
            services.
          </p>
        </div>

        {/* FAQ */}

        <div className="mx-auto max-w-5xl space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="group overflow-hidden rounded-[32px] border border-gray-100 bg-[#FAF7F2] transition-all duration-300 hover:border-[#D9A441]/30 hover:shadow-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-8 text-left"
              >
                <h3 className="pr-6 text-xl font-bold leading-8 text-[#1B1815]">
                  {faq.question}
                </h3>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-white transition-all duration-300 ${
                    openIndex === index
                      ? "rotate-180 bg-[#844204] text-white"
                      : "text-[#844204]"
                  }`}
                >
                  <ChevronDown size={22} />
                </div>
              </button>

              <div
                className={`grid transition-all duration-500 ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-8 pb-8">
                    <div className="mb-6 h-[2px] w-16 rounded-full bg-[#D9A441]" />

                    <p className="text-lg leading-9 text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Card */}

        <div className="mx-auto mt-24 max-w-5xl rounded-[40px] bg-[#844204] p-12 text-center text-white shadow-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
            <MessageCircle size={38} />
          </div>

          <h3 className="mt-8 text-4xl font-bold">Still Need Help?</h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-white/90">
            If you couldn't find the answer you were looking for, our team is
            always happy to help. Reach out and we'll respond as quickly as
            possible.
          </p>

          <Link
            href="/contact"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-semibold text-[#844204] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Contact Our Team
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
