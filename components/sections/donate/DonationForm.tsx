"use client";

import { useRef, useState } from "react";
import PaystackButton from "@/components/paystack/PaystackButton";

export default function DonationForm() {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("");
  const [purpose, setPurpose] = useState("");

  const currencySymbol =
    currency === "USD"
      ? "$"
      : currency === "GBP"
        ? "£"
        : currency === "EUR"
          ? "€"
          : "₦";

  const donationAmounts =
    currency === "USD"
      ? ["10", "25", "50", "100", "250", "500", "1000"]
      : currency === "GBP"
        ? ["10", "25", "50", "100", "250", "500", "1000"]
        : currency === "EUR"
          ? ["10", "25", "50", "100", "250", "500", "1000"]
          : [
              "10000",
              "25000",
              "50000",
              "100000",
              "200000",
              "500000",
              "1000000",
            ];

  const handleCustomAmount = () => {
    setAmount("");

    setTimeout(() => {
      amountInputRef.current?.focus();
    }, 100);
  };

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
          {/* Amount Selection */}

          <div className="mb-10">
            <h3 className="font-bold text-xl mb-5">Give To Our Cause</h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {donationAmounts.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setAmount(value)}
                  className={`rounded-xl p-5 border transition font-bold ${
                    amount === value
                      ? "bg-[#844204] text-white border-[#844204]"
                      : "bg-white border-gray-200 hover:border-[#844204]"
                  }`}
                >
                  {currencySymbol}
                  {Number(value).toLocaleString()}
                </button>
              ))}

              <button
                type="button"
                onClick={handleCustomAmount}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:border-[#844204] transition font-bold"
              >
                {currency === "NGN"
                  ? "₦1,500,000+"
                  : currency === "USD"
                    ? "$3,000+"
                    : currency === "GBP"
                      ? "£3,000+"
                      : currency === "EUR"
                        ? "€3,000+"
                        : "₦1,500,000+"}
              </button>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                required
                minLength={3}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              />

              <input
                type="email"
                placeholder="Email Address"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <select className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]">
                <option>Donation Type</option>

                <option>One-Time Donation</option>

                <option>Monthly Giving</option>

                <option>Annual Giving</option>
              </select>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              >
                <option value="">Select Donation Purpose</option>

                <option value="General Support">General Support</option>

                <option value="Education Support">Education Support</option>

                <option value="Widow Empowerment">Widow Empowerment</option>

                <option value="Family Support">Family Support</option>

                <option value="Community Outreach">Community Outreach</option>

                <option value="Business Empowerment">
                  Business Empowerment
                </option>
              </select>

              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                required
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              >
                <option value="">Choose Your Currency</option>

                <option value="NGN">NGN</option>
                <option value="USD">USD</option>
                <option value="GBP">GBP</option>
                <option value="EUR">EUR</option>
              </select>
            </div>

            <input
              ref={amountInputRef}
              type="number"
              placeholder={`Enter The Amount You Intend To Donate (${currency || "NGN"})`}
              value={amount}
              required
              min="1"
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            />

            <div className="bg-[#844204]/5 border border-[#844204]/10 rounded-2xl p-6">
              <h3 className="font-bold text-lg">Ready To Make An Impact?</h3>

              <p className="mt-2 text-gray-600">
                Your contribution helps us support widows, empower families,
                sponsor education, strengthen communities and restore hope where
                it is needed most.
              </p>
            </div>
            <PaystackButton
              name={name}
              email={email}
              amount={Number(amount)}
              currency={currency}
            />
          </form>

          {/* Security & Trust Indicators */}

          <div className="grid md:grid-cols-2 gap-4 mt-10 text-sm text-gray-600">
            <div>✓ Secure SSL Encrypted Transactions</div>

            <div>✓ Trusted Paystack Payment Gateway</div>

            <div>✓ Protected Donor Information & Privacy</div>

            <div>✓ Transparent & Accountable Stewardship</div>

            <div>✓ Multiple Currency Support</div>

            <div>✓ Instant Donation Confirmation</div>
          </div>
        </div>
      </div>
    </section>
  );
}
