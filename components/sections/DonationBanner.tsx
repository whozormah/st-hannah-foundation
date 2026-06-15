"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SiteSettings {
  bank: {
    bankName: string;
    accountNumber: string;
    accountName: string;
  };
}

export default function DonationBanner() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    fetch("/data/site-settings.json")
      .then((res) => res.json())
      .then((data) => setSettings(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="py-28 bg-[#844204]">
      <div className="container-custom">
        <div className="max-w-5xl mx-auto text-center text-white">
          <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
            Support Our Mission
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
            Together We Can Restore Hope
          </h2>

          <p className="mt-8 text-lg text-gray-200 max-w-3xl mx-auto">
            Every donation helps us provide support, education, empowerment and
            opportunities to children, widows and underserved communities across
            Africa.
          </p>

          <div className="mt-12 bg-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-10">
            <h3 className="text-2xl font-bold mb-8">Direct Bank Donation</h3>

            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm text-gray-300">Bank Name</p>

                <h4 className="text-xl font-semibold mt-2">
                  {settings?.bank.bankName}
                </h4>
              </div>

              <div>
                <p className="text-sm text-gray-300">Account Number</p>

                <h4 className="text-xl font-semibold mt-2">
                  {settings?.bank.accountNumber}
                </h4>
              </div>

              <div>
                <p className="text-sm text-gray-300">Account Name</p>

                <h4 className="text-xl font-semibold mt-2">
                  {settings?.bank.accountName}
                </h4>
              </div>
            </div>
          </div>

          <p className="mt-8 text-gray-300 max-w-2xl mx-auto">
            Donations can be made directly to our bank account or through our
            online donation platform. Every contribution helps create
            opportunities, restore hope and transform lives.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/donate"
              className="bg-[#D9A441] text-black px-8 py-4 rounded-xl font-semibold"
            >
              Donate Now
            </Link>

            <Link
              href="/volunteer"
              className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#844204] transition"
            >
              Become A Volunteer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
