"use client";

import { useEffect, useState } from "react";
import InKindDonationModal from "@/components/shared/in-kind/InKindDonationModal";

interface DonationItem {
  title: string;
  description: string;
}

export default function InKindDonations() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [items, setItems] = useState<DonationItem[]>([]);

  useEffect(() => {
    fetch("/data/in-kind-donations.json")
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((err) => console.error(err));
  }, []);

  const handleDonate = (category: string) => {
    setSelectedCategory(category);
    setIsOpen(true);
  };

  return (
    <>
      {" "}
      <section className="py-28 bg-[#FAF7F2]">
        {" "}
        <div className="container-custom">
          {/* Header */}

          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              In-Kind Donations
            </span>

            <h2 className="text-5xl md:text-6xl font-bold mt-4">
              Give What You Have.
              <br />
              Change A Life.
            </h2>

            <p className="mt-6 text-lg text-gray-600 leading-8">
              Not every gift comes in the form of money. Donating essential
              items helps us meet immediate needs, strengthen families and
              create opportunities for individuals and communities to thrive.
            </p>
          </div>

          {/* Categories */}

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {items.map((item) => (
              <button
                key={item.title}
                onClick={() => handleDonate(item.title)}
                className="bg-white rounded-[32px] p-8 text-left shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >
                <div className="w-12 h-1 bg-[#D9A441] rounded-full mb-5" />

                <h3 className="text-xl font-bold">{item.title}</h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.description}
                </p>
              </button>
            ))}
          </div>

          {/* Impact Promise */}

          <div className="mt-20 bg-white rounded-[32px] p-10 md:p-14 text-center shadow-sm">
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Every Item Matters
            </span>

            <h3 className="text-4xl md:text-5xl font-bold mt-4">
              Turning Generosity Into Opportunity
            </h3>

            <p className="max-w-4xl mx-auto mt-6 text-gray-600 leading-8">
              Whether it is educational materials, food supplies, medical
              resources, business tools or household essentials, your donation
              helps restore dignity, create opportunities and bring hope to
              those who need it most.
            </p>
          </div>

          {/* CTA */}

          <div className="text-center mt-14">
            <button
              onClick={() => handleDonate("")}
              className="inline-flex bg-[#844204] text-white px-10 py-5 rounded-2xl font-semibold hover:bg-[#6d3503] transition"
            >
              Submit An In-Kind Donation
            </button>
          </div>
        </div>
      </section>
      <InKindDonationModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialCategory={selectedCategory}
      />
    </>
  );
}
