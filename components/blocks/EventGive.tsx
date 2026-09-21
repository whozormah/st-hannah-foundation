"use client";

import { useState } from "react";
import { Heart } from "lucide-react";

import DonationModal from "@/components/shared/DonationModal";

// The donation form's own first amounts, so the choice carries straight over.
const AMOUNTS = ["10000", "25000", "50000", "100000", "250000"];

type Props = {
  /** The cause named on the donation; none after the event. */
  programName?: string;
  label: string;
  showAmounts: boolean;
};

/* The appeal's giving controls: amount buttons and a main button, each
   opening the site's existing donation form with the event named and the
   amount chosen (CR-013). */
export default function EventGive({ programName, label, showAmounts }: Props) {
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState<string | undefined>();
  const [press, setPress] = useState(0);

  const give = (value?: string) => {
    setAmount(value);
    setPress((count) => count + 1);
    setOpen(true);
  };

  return (
    <>
      {showAmounts && (
        <div className="mt-8 flex max-w-xl flex-wrap gap-3" role="group" aria-label="Choose an amount to give">
          {AMOUNTS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => give(value)}
              className="rounded-full border border-white/20 bg-white/[0.07] px-5 py-2.5 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur transition hover:border-white hover:bg-white hover:text-ink"
            >
              ₦{Number(value).toLocaleString("en-NG")}
            </button>
          ))}
          <button
            type="button"
            onClick={() => give()}
            className="rounded-full border border-white/20 bg-white/[0.07] px-5 py-2.5 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur transition hover:border-white hover:bg-white hover:text-ink"
          >
            Other amount
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => give()}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-accent-soft to-accent px-9 py-4 text-lg font-semibold text-ink shadow-[0_12px_40px_-10px_rgba(217,164,65,0.7)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_50px_-10px_rgba(217,164,65,0.85)]"
      >
        <Heart aria-hidden size={18} />
        {label}
      </button>

      {/* Always mounted: the dialog's "Donate Online" closes its first step
          and then opens the form, which needs the dialog still in place. A
          new press starts it afresh, so the chosen amount takes effect. */}
      <DonationModal
        key={press}
        isOpen={open}
        onClose={() => setOpen(false)}
        programName={programName}
        initialAmount={amount}
      />
    </>
  );
}
