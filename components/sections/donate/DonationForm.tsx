"use client";

import DonationFormFields from "@/components/shared/DonationFormFields";

export default function DonationForm() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Donate Online
          </span>

          <h2 className="text-5xl font-bold mt-4">Donate Now</h2>

          <p className="max-w-2xl mx-auto mt-6 text-gray-600 leading-8">
            Your generosity helps us restore hope, empower families, support
            education and create lasting impact in communities across Nigeria
            and beyond.
          </p>
        </div>

        <div className="bg-[#FAF7F2] rounded-[32px] p-10 md:p-14 shadow-sm">
          <DonationFormFields />
        </div>
      </div>
    </section>
  );
}
