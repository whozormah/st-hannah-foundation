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
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        {/* Header */}

        <div className="mb-12 max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            Frequently Asked Questions
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            Answers to the questions we hear most
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-700">
            We&apos;ve answered some of the most common questions about our
            programmes, partnerships, volunteering opportunities and support
            services.
          </p>
        </div>

        {/* FAQ */}

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="group overflow-hidden rounded-[32px] border border-gray-100 bg-cream transition-all duration-300 hover:border-accent/30 hover:shadow-xl"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between p-8 text-left"
              >
                <h3 className="pr-6 text-xl font-bold leading-8 text-ink">
                  {faq.question}
                </h3>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full bg-white transition-all duration-300 ${
                    openIndex === index
                      ? "rotate-180 bg-brand text-white"
                      : "text-brand"
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
                    <div className="mb-6 h-[2px] w-16 rounded-full bg-accent" />

                    <p className="text-lg leading-9 text-gray-700">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Card */}

        <div className="mx-auto mt-16 max-w-4xl rounded-[32px] bg-brand p-6 sm:p-10 text-center text-white shadow-2xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
            <MessageCircle size={38} />
          </div>

          <h3 className="mt-8 text-3xl font-bold">Still need help?</h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-9 text-white/90">
            If you couldn&apos;t find the answer you were looking for, our team is
            always happy to help. Reach out and we&apos;ll respond as quickly as
            possible.
          </p>

          <Link
            href="#contact-form"
            className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-semibold text-brand transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            Send us a message
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
