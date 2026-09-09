"use client";

import { useRef, useState } from "react";
import { Check, Lock } from "lucide-react";

import PaystackButton from "@/components/paystack/PaystackButton";
import InternationalGivingCard from "./InternationalGivingCard";

interface DonationFormFieldsProps {
  programName?: string;
}

/* Naira is live through Paystack. USD, GBP and EUR are pending Paystack
   registration, so they are shown as upcoming rather than offered as equal
   choices: previously a donor could pick USD, complete every field and only
   discover at the pay button that it was unavailable. */
const CURRENCIES = [
  { code: "NGN", symbol: "₦", live: true },
  { code: "USD", symbol: "$", live: false },
  { code: "GBP", symbol: "£", live: false },
  { code: "EUR", symbol: "€", live: false },
];

const PRESETS = ["10000", "25000", "50000", "100000", "200000", "500000"];

const PURPOSES = [
  "General Support",
  "Education Support",
  "Widow Empowerment",
  "Family Support",
  "Community Outreach",
  "Business Empowerment",
];

const fieldClass =
  "w-full rounded-xl border border-gray-200 p-4 transition focus:border-brand";

export default function DonationFormFields({
  programName,
}: DonationFormFieldsProps) {
  const amountInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [purpose, setPurpose] = useState(programName ?? "");

  const purposeOptions =
    programName && !PURPOSES.includes(programName)
      ? [programName, ...PURPOSES]
      : PURPOSES;

  return (
    <div className="space-y-8">
      {/* Currency */}

      <div>
        <p className="font-bold">Currency</p>

        <ul className="mt-4 flex flex-wrap gap-3">
          {CURRENCIES.map((item) => (
            <li key={item.code}>
              {item.live ? (
                <span className="inline-flex items-center gap-2 rounded-xl border-2 border-brand bg-brand px-5 py-3 font-bold text-white">
                  <Check size={16} aria-hidden />
                  {item.symbol} {item.code}
                </span>
              ) : (
                <span
                  className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-dashed border-gray-300 px-5 py-3 font-semibold text-gray-400"
                  title="Coming soon"
                >
                  {item.symbol} {item.code}
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold uppercase tracking-wider text-gray-500">
                    Soon
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>

        <p className="mt-4 text-gray-700">
          Donations are processed in Nigerian Naira. Giving in US Dollars,
          Pounds and Euros is being set up with Paystack — you can ask us to let
          you know the moment it opens.
        </p>
      </div>

      {/* Amount */}

      <div>
        <label htmlFor="donation-amount" className="font-bold">
          Amount
        </label>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {PRESETS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setAmount(value)}
              aria-pressed={amount === value}
              className={`rounded-xl border p-4 font-bold transition ${
                amount === value
                  ? "border-brand bg-brand text-white"
                  : "border-gray-200 bg-white hover:border-brand"
              }`}
            >
              ₦{Number(value).toLocaleString()}
            </button>
          ))}
        </div>

        <input
          id="donation-amount"
          ref={amountInputRef}
          type="number"
          inputMode="numeric"
          placeholder="Or enter another amount in ₦"
          value={amount}
          required
          min="1"
          onChange={(event) => setAmount(event.target.value)}
          className={`${fieldClass} mt-3`}
        />
      </div>

      {/* Donor */}

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="donor-name" className="mb-2 block font-semibold">
            Full name
          </label>

          <input
            id="donor-name"
            type="text"
            value={name}
            required
            minLength={3}
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="donor-email" className="mb-2 block font-semibold">
            Email address
          </label>

          <input
            id="donor-email"
            type="email"
            value={email}
            required
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />

          <p className="mt-2 text-sm text-gray-600">
            Your receipt is sent here.
          </p>
        </div>

        <div>
          <label htmlFor="donor-phone" className="mb-2 block font-semibold">
            Phone number{" "}
            <span className="font-normal text-gray-500">(optional)</span>
          </label>

          <input
            id="donor-phone"
            type="tel"
            value={phone}
            autoComplete="tel"
            onChange={(event) => setPhone(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="donation-purpose" className="mb-2 block font-semibold">
            What should it go towards?
          </label>

          <select
            id="donation-purpose"
            value={purpose}
            onChange={(event) => setPurpose(event.target.value)}
            required
            className={fieldClass}
          >
            <option value="">Select a programme</option>

            {purposeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <PaystackButton
        name={name}
        email={email}
        phone={phone}
        amount={Number(amount)}
        currency="NGN"
        purpose={purpose}
      />

      <ul className="grid gap-3 text-sm text-gray-700 sm:grid-cols-2">
        {[
          "Secure, SSL-encrypted payment",
          "Processed by Paystack",
          "Instant emailed receipt",
          "Your details are never shared",
        ].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <Lock size={14} className="shrink-0 text-brand" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <InternationalGivingCard />
    </div>
  );
}
