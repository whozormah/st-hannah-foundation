"use client";

import { X } from "lucide-react";

import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import DonationFormFields from "./DonationFormFields";

interface DonationFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  programName?: string;
}

export default function DonationFormModal({
  isOpen,
  onClose,
  programName,
}: DonationFormModalProps) {
  useBodyScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100000] bg-black/70 backdrop-blur-sm flex items-center justify-center px-6 py-8"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-[32px] w-full max-w-5xl max-h-[92vh] overflow-y-auto shadow-2xl animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="sticky top-0 z-10 bg-white border-b px-8 py-6 flex items-start justify-between rounded-t-[32px]">
          <div>
            <span className="uppercase tracking-[4px] text-brand text-sm font-semibold">
              St. Hannah Foundation
            </span>

            <h2 className="text-3xl font-bold text-ink mt-2">
              Make Your Donation
            </h2>

            <p className="text-gray-700 mt-2 max-w-2xl">
              Complete the form below to securely support our mission.
            </p>

            {programName && (
              <div className="mt-4 inline-flex items-center rounded-full bg-brand/10 px-4 py-2 text-brand font-medium">
                Supporting: {programName}
              </div>
            )}
          </div>

          <button aria-label="Close"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 transition"
          >
            <X size={28} />
          </button>
        </div>

        {/* Form */}

        <div className="p-8">
          <DonationFormFields programName={programName} />
        </div>
      </div>
    </div>
  );
}
