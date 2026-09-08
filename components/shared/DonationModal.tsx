"use client";

import { useState } from "react";

import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { X, Gift, CreditCard } from "lucide-react";

import InKindDonationModal from "./in-kind/InKindDonationModal";
import DonationFormModal from "./DonationFormModal";

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName?: string;
}

export default function DonationModal({
  isOpen,
  onClose,
  programName,
}: DonationModalProps) {
  const [isInKindOpen, setIsInKindOpen] = useState(false);
  const [isDonationFormOpen, setIsDonationFormOpen] = useState(false);

  useBodyScrollLock(isOpen || isDonationFormOpen || isInKindOpen);

  if (!isOpen && !isDonationFormOpen) return null;

  return (
    <>
      {/* Donation Options Modal */}

      {isOpen && (
        <div
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 px-4 py-6 backdrop-blur-sm sm:px-6 sm:py-10"
          onClick={onClose}
        >
          <div
            className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[24px] bg-white shadow-2xl animate-in fade-in zoom-in duration-300 sm:rounded-[32px]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}

            <div className="flex items-start justify-between gap-4 border-b p-6 sm:p-8">
              <div>
                <span className="uppercase tracking-[4px] text-brand text-sm font-semibold">
                  St. Hannah Foundation
                </span>

                <h2 className="text-2xl md:text-3xl font-bold text-ink mt-2">
                  {programName
                    ? `Support ${programName}`
                    : "Make An Impact Today"}
                </h2>

                <p className="text-gray-500 mt-2">
                  {programName
                    ? `Your donation will directly support our ${programName} initiative.`
                    : "Choose how you'd like to support St. Hannah Foundation."}
                </p>
              </div>

              <button aria-label="Close" onClick={onClose} className="hover:scale-110 transition">
                <X size={28} />
              </button>
            </div>

            {/* Body */}

            <div className="space-y-5 p-6 sm:p-8">
              {/* Donate Online */}

              <div className="rounded-3xl bg-brand p-6 text-white sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <CreditCard size={24} />

                  <h3 className="text-2xl font-bold">Donate Online</h3>
                </div>

                <p className="text-white/80 leading-7">
                  Make a secure online donation using our trusted Paystack
                  payment gateway. Your support helps transform lives and
                  strengthen communities.
                </p>

                <button
                  onClick={() => {
                    onClose();

                    setTimeout(() => {
                      setIsDonationFormOpen(true);
                    }, 250);
                  }}
                  className="mt-6 w-full bg-white text-brand py-4 rounded-xl font-semibold hover:scale-[1.02] transition-all duration-300"
                >
                  Donate Online
                </button>
              </div>

              {/* Donate Items */}

              <div className="rounded-3xl border border-accent/20 p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Gift size={24} className="text-brand" />

                  <h3 className="text-2xl font-bold text-ink">
                    Donate Items & Materials
                  </h3>
                </div>

                <p className="text-gray-700 leading-7">
                  Support our mission through food items, educational materials,
                  clothing, medical supplies, equipment and other essential
                  resources that directly impact the lives of beneficiaries.
                </p>

                <button
                  onClick={() => {
                    onClose();

                    setTimeout(() => {
                      setIsInKindOpen(true);
                    }, 250);
                  }}
                  className="mt-6 w-full border border-brand text-brand py-4 rounded-xl font-semibold hover:bg-brand hover:text-white transition-all duration-300"
                >
                  Donate Items Instead
                </button>
              </div>

              {/* Impact */}

              <div className="bg-cream rounded-3xl p-6 text-center">
                <h3 className="font-bold text-xl text-brand mb-3">
                  Every Gift Creates Impact
                </h3>

                <p className="text-gray-700 leading-7">
                  Your support helps provide educational opportunities, widow
                  empowerment, family assistance, medical aid and community
                  outreach programmes that restore hope and transform lives.
                </p>
              </div>

              <div className="text-center text-sm text-gray-500">
                Every contribution helps restore hope, empower lives and
                strengthen communities.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Donation Form Modal */}

      <DonationFormModal
        isOpen={isDonationFormOpen}
        programName={programName}
        onClose={() => setIsDonationFormOpen(false)}
      />

      {/* In Kind Donation */}

      <InKindDonationModal
        isOpen={isInKindOpen}
        onClose={() => setIsInKindOpen(false)}
      />
    </>
  );
}
