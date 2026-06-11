"use client";

import { useState } from "react";
import PaystackButton from "@/components/paystack/PaystackButton";

export default function DonationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");

  return (
    <section className="py-24 bg-white">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Donate Online
          </span>

          <h2 className="text-5xl font-bold mt-4">Support A Cause</h2>

          <p className="max-w-2xl mx-auto mt-6 text-gray-600 leading-8">
            Your generosity helps us empower widows, support families, provide
            educational opportunities and strengthen communities.
          </p>
        </div>

        <div className="bg-[#FAF7F2] rounded-[32px] p-10 md:p-14 shadow-sm">
          {/* Suggested Giving */}

          <div className="mb-10">
            <h3 className="font-bold text-xl mb-5">Popular Giving Amounts</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                type="button"
                onClick={() => setAmount("10000")}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#844204] transition"
              >
                <div className="font-bold">₦10,000</div>
                <div className="text-xs text-gray-500 mt-1">
                  Education Support
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAmount("25000")}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#844204] transition"
              >
                <div className="font-bold">₦25,000</div>
                <div className="text-xs text-gray-500 mt-1">Family Support</div>
              </button>

              <button
                type="button"
                onClick={() => setAmount("50000")}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#844204] transition"
              >
                <div className="font-bold">₦50,000</div>
                <div className="text-xs text-gray-500 mt-1">
                  UTME Sponsorship
                </div>
              </button>

              <button
                type="button"
                onClick={() => setAmount("100000")}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#844204] transition"
              >
                <div className="font-bold">₦100,000</div>
                <div className="text-xs text-gray-500 mt-1">
                  Widow Empowerment
                </div>
              </button>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <select className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]">
                <option>Purpose Of Donation</option>
                <option>General Support</option>
                <option>Education Support</option>
                <option>Widow Empowerment</option>
                <option>Family Support</option>
                <option>Community Outreach</option>
                <option>Business Empowerment</option>
              </select>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              >
                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <input
              type="number"
              placeholder="Donation Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            />

            <PaystackButton
              name={name}
              email={email}
              amount={Number(amount)}
              currency={currency}
            />
          </form>

          {/* Trust Indicators */}

          <div className="grid md:grid-cols-2 gap-4 mt-10 text-sm text-gray-600">
            <div>✓ Secure Payment Processing</div>

            <div>✓ International Donations Accepted</div>

            <div>✓ Transparent Impact Reporting</div>

            <div>✓ Supporting Communities Through Sustainable Impact</div>
          </div>
        </div>
      </div>
    </section>
  );
}
