"use client";

import { useRef, useState } from "react";
import PaystackButton from "@/components/paystack/PaystackButton";
import InternationalGivingCard from "./InternationalGivingCard";

interface DonationFormFieldsProps {
  programName?: string;
}

export default function DonationFormFields({
  programName,
}: DonationFormFieldsProps) {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [currency, setCurrency] = useState("NGN");
  // Seeded from the prop on mount. The modal that supplies programName
  // unmounts while closed, so reopening it for another programme remounts
  // this form and re-seeds the purpose.
  const [purpose, setPurpose] = useState(programName ?? "");

  const currencySymbol =
    currency === "USD"
      ? "$"
      : currency === "GBP"
        ? "£"
        : currency === "EUR"
          ? "€"
          : "₦";

  const donationAmounts =
    currency === "USD" || currency === "GBP" || currency === "EUR"
      ? ["10", "25", "50", "100", "250", "500", "1000"]
      : ["10000", "25000", "50000", "100000", "200000", "500000", "1000000"];

  const handleCustomAmount = () => {
    setAmount("");

    setTimeout(() => {
      amountInputRef.current?.focus();
    }, 100);
  };

  return (
    <>
      {/* Amount */}

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
                  ? "bg-brand text-white border-brand"
                  : "bg-white border-gray-200 hover:border-brand"
              }`}
            >
              {currencySymbol}
              {Number(value).toLocaleString()}
            </button>
          ))}

          <button
            type="button"
            onClick={handleCustomAmount}
            className="bg-white border border-gray-200 rounded-xl p-5 hover:border-brand transition font-bold"
          >
            {currency === "NGN"
              ? "₦1,500,000+"
              : currency === "USD"
                ? "$3,000+"
                : currency === "GBP"
                  ? "£3,000+"
                  : "€3,000+"}
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
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <select className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand">
            <option>Donation Type</option>

            <option>One-Time Donation</option>

            <option>Monthly Giving</option>

            <option>Annual Giving</option>
          </select>

          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
          >
            <option value="">Select Donation Purpose</option>

            <option value="General Support">General Support</option>

            <option value="Education Support">Education Support</option>

            <option value="Widow Empowerment">Widow Empowerment</option>

            <option value="Family Support">Family Support</option>

            <option value="Community Outreach">Community Outreach</option>

            <option value="Business Empowerment">Business Empowerment</option>

            {programName && <option value={programName}>{programName}</option>}
          </select>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            required
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
          >
            <option value="NGN">NGN</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="EUR">EUR</option>
          </select>
        </div>

        <input
          ref={amountInputRef}
          type="number"
          placeholder={`Enter Amount (${currency})`}
          value={amount}
          required
          min="1"
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
        />

        <div className="bg-brand/5 border border-brand/10 rounded-2xl p-6">
          <h3 className="font-bold text-lg">Ready To Make An Impact?</h3>

          <p className="mt-2 text-gray-700">
            Your contribution helps us support widows, empower families, sponsor
            education, strengthen communities and restore hope where it is
            needed most.
          </p>
        </div>

        {currency === "NGN" ? (
          <PaystackButton
            name={name}
            email={email}
            phone={phone}
            amount={Number(amount)}
            currency={currency}
            purpose={purpose}
          />
        ) : (
          <InternationalGivingCard />
        )}
      </form>

      <div className="grid md:grid-cols-2 gap-4 mt-10 text-sm text-gray-700">
        <div>✓ Secure SSL Encrypted Transactions</div>

        <div>✓ Trusted Paystack Payment Gateway</div>

        <div>✓ Protected Donor Information & Privacy</div>

        <div>✓ Transparent & Accountable Stewardship</div>

        <div>✓ Multiple Currency Support</div>

        <div>✓ Instant Donation Confirmation</div>
      </div>
    </>
  );
}
