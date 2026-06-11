export default function ContactFAQ() {
  const faqs = [
    {
      question: "How can I volunteer?",
      answer:
        "You can join our growing network of volunteers by completing our volunteer application form.",
    },
    {
      question: "How can I support the foundation?",
      answer:
        "You can support through donations, partnerships, sponsorships and community engagement.",
    },
    {
      question: "Do you accept corporate partnerships?",
      answer:
        "Yes. We welcome partnerships with organizations that share our passion for community impact.",
    },
    {
      question: "Can I nominate a beneficiary?",
      answer:
        "Yes. We carefully review requests and referrals based on available programs and resources.",
    },
  ];

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            FAQ
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question} className="bg-white p-8 rounded-[24px]">
              <h3 className="font-bold text-xl">{faq.question}</h3>

              <p className="mt-4 text-gray-600 leading-8">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
