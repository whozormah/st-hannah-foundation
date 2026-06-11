"use client";

import { useState } from "react";

export default function BankTransfer() {
  const [copied, setCopied] = useState(false);

  const copyAccountNumber = async () => {
    await navigator.clipboard.writeText("2047855878");

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-[32px] shadow-sm">
          <div className="text-center">
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Nigeria Bank Transfer
            </span>

            <h2 className="text-4xl font-bold mt-4">Prefer Direct Transfer?</h2>

            <p className="text-gray-600 mt-4">
              You can support our mission directly through a bank transfer.
            </p>
          </div>

          <div className="mt-10 space-y-8">
            <div>
              <h3 className="font-bold text-lg">Bank Name</h3>

              <p className="text-gray-600 mt-2">FirstBank</p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Account Name</h3>

              <p className="text-gray-600 mt-2">
                St. Hannah Charity Foundation
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg">Account Number</h3>

              <p className="text-3xl font-bold text-[#844204] mt-2">
                2047855878
              </p>
            </div>

            <button
              onClick={copyAccountNumber}
              className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6d3503] transition"
            >
              {copied ? "Copied Successfully ✓" : "Copy Account Number"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
