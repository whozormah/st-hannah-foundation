"use client";

import { useRef, useState } from "react";
import { Check } from "lucide-react";

import PaystackButton from "@/components/paystack/PaystackButton";

interface DonationFormFieldsProps {
  programName?: string;
}

/* One donation system, not four forms. Naira is live through Paystack; the
   other currencies become active by flipping `live` here once the
   international payment account is approved. */
const CURRENCIES = [
  { code: "NGN", symbol: "₦", live: true },
  { code: "USD", symbol: "$", live: false },
  { code: "GBP", symbol: "£", live: false },
  { code: "EUR", symbol: "€", live: false },
];

/* Monthly giving needs Paystack subscription plans, which are not built yet.
   It is shown but marked, rather than quietly charging a donor once. */
const FREQUENCIES = [
  { id: "one-time", label: "One-time", live: true },
  { id: "monthly", label: "Monthly", live: false },
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
  "w-full rounded-xl border border-gray-200 bg-white p-4 transition focus:border-brand";

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

  const numericAmount = Number(amount);

  const buttonLabel =
    numericAmount > 0 ? `Give ₦${numericAmount.toLocaleString()}` : "Give";

  return (
    <div className="rounded-[28px] border border-accent/20 bg-cream p-6 shadow-sm sm:p-8">
      <h2 className="text-2xl font-bold text-ink md:text-3xl">
        Give to St. Hannah Foundation
      </h2>

      {/* Currency */}

      <fieldset className="mt-7">
        <legend className="text-sm font-semibold uppercase tracking-[2px] text-gray-500">
          Currency
        </legend>

        <ul className="mt-3 flex flex-wrap gap-2">
          {CURRENCIES.map((item) => (
            <li key={item.code}>
              {item.live ? (
                <span className="inline-flex items-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-white">
                  <Check size={14} aria-hidden />
                  {item.symbol} {item.code}
                </span>
              ) : (
                <span
                  title="Coming soon"
                  className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-xl border border-dashed border-gray-300 px-4 py-2.5 text-sm font-semibold text-gray-400"
                >
                  {item.symbol} {item.code}
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Soon
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Frequency */}

      <fieldset className="mt-7">
        <legend className="text-sm font-semibold uppercase tracking-[2px] text-gray-500">
          Giving frequency
        </legend>

        <ul className="mt-3 flex flex-wrap gap-2">
          {FREQUENCIES.map((item) => (
            <li key={item.id}>
              {item.live ? (
                <span className="inline-flex items-center gap-2 rounded-xl bg-brand px-5 py-2.5 text-sm font-bold text-white">
                  <Check size={14} aria-hidden />
                  {item.label}
                </span>
              ) : (
                <span
                  title="Coming soon"
                  className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-xl border border-dashed border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-400"
                >
                  {item.label}
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Soon
                  </span>
                </span>
              )}
            </li>
          ))}
        </ul>
      </fieldset>

      {/* Amount */}

      <fieldset className="mt-7">
        <legend className="text-sm font-semibold uppercase tracking-[2px] text-gray-500">
          Amount
        </legend>

        <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
          {PRESETS.map((value) => {
            const selected = amount === value;

            return (
              <button
                key={value}
                type="button"
                onClick={() => setAmount(value)}
                aria-pressed={selected}
                className={`rounded-xl border-2 p-3.5 font-bold transition ${
                  selected
                    ? "border-brand bg-brand text-white"
                    : "border-transparent bg-white text-ink hover:border-brand/40"
                }`}
              >
                ₦{Number(value).toLocaleString()}
              </button>
            );
          })}
        </div>

        <label htmlFor="donation-amount" className="sr-only">
          Other amount in Naira
        </label>

        <input
          id="donation-amount"
          ref={amountInputRef}
          type="number"
          inputMode="numeric"
          placeholder="Other amount"
          value={amount}
          required
          min="1"
          onChange={(event) => setAmount(event.target.value)}
          className={`${fieldClass} mt-2.5`}
        />
      </fieldset>

      {/* Donor */}

      <div className="mt-7 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
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

          <p className="mt-2 text-sm text-gray-600">Your receipt is sent here.</p>
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
            inputMode="tel"
            autoComplete="tel"
            onChange={(event) => setPhone(event.target.value)}
            className={fieldClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="donation-purpose" className="mb-2 block font-semibold">
            Support area
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

      <div className="mt-7">
        <PaystackButton
          name={name}
          email={email}
          phone={phone}
          amount={numericAmount}
          currency="NGN"
          purpose={purpose}
          label={buttonLabel}
        />
      </div>

      {/* Trust, kept to one line at the point of action. */}

      <p className="mt-5 text-center text-sm leading-7 text-gray-600">
        Your gift is handled securely. Your payment is processed through our
        payment partner and your receipt is sent to your email.
      </p>

      <p className="mt-2 text-center text-xs font-semibold uppercase tracking-[2px] text-gray-400">
        Secure payment · Instant receipt · Paystack
      </p>
    </div>
  );
}
