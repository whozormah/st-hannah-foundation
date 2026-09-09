"use client";

import { useState } from "react";

import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { X, CheckCircle } from "lucide-react";

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PARTNERSHIP_TYPES = [
  "Corporate Partnership",
  "NGO Partnership",
  "Church Partnership",
  "Community Partnership",
  "Sponsor A Program",
  "Sponsor A Beneficiary",
  "Volunteer Partnership",
  "Media Partnership",
  "Other",
];

const fieldClass =
  "w-full rounded-xl border border-gray-200 bg-white p-4 transition focus:border-brand";

export default function PartnerModal({ isOpen, onClose }: PartnerModalProps) {
  useBodyScrollLock(isOpen);

  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setSending(true);
    setError("");

    try {
      const response = await fetch("/api/partnership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message ?? "Something went wrong. Please try again.");

        return;
      }

      form.reset();
      setSubmitted(true);
    } catch {
      setError(
        "We could not reach the server. Please check your connection and try again.",
      );
    } finally {
      setSending(false);
    }
  };

  if (!isOpen) return null;

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-[32px] w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            {/* Header */}

            <div className="flex items-center justify-between p-8 border-b">
              <div>
                <h2 className="text-3xl font-bold">Become A Partner</h2>

                <p className="text-gray-500 mt-2">
                  Let&apos;s work together to create lasting impact and transform
                  lives.
                </p>
              </div>

              <button aria-label="Close"
                onClick={handleClose}
                className="hover:scale-110 transition"
              >
                <X size={28} />
              </button>
            </div>

            {/* Form */}

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="p-org" className="mb-2 block font-semibold">
                    Organisation / company name
                  </label>

                  <input
                    id="p-org"
                    type="text"
                    name="organisation"
                    required
                    autoComplete="organization"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label
                    htmlFor="p-contact"
                    className="mb-2 block font-semibold"
                  >
                    Contact person
                  </label>

                  <input
                    id="p-contact"
                    type="text"
                    name="contactPerson"
                    required
                    autoComplete="name"
                    className={fieldClass}
                  />
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="p-email"
                      className="mb-2 block font-semibold"
                    >
                      Email address
                    </label>

                    <input
                      id="p-email"
                      type="email"
                      name="email"
                      required
                      autoComplete="email"
                      className={fieldClass}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="p-phone"
                      className="mb-2 block font-semibold"
                    >
                      Phone number{" "}
                      <span className="font-normal text-gray-500">
                        (optional)
                      </span>
                    </label>

                    <input
                      id="p-phone"
                      type="tel"
                      name="phone"
                      inputMode="tel"
                      autoComplete="tel"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="p-location"
                    className="mb-2 block font-semibold"
                  >
                    Country / location{" "}
                    <span className="font-normal text-gray-500">
                      (optional)
                    </span>
                  </label>

                  <input
                    id="p-location"
                    type="text"
                    name="location"
                    className={fieldClass}
                  />
                </div>

                <div>
                  <label htmlFor="p-type" className="mb-2 block font-semibold">
                    Partnership type
                  </label>

                  <select
                    id="p-type"
                    name="partnershipType"
                    defaultValue=""
                    className={fieldClass}
                  >
                    <option value="">Please select</option>

                    {PARTNERSHIP_TYPES.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="p-message"
                    className="mb-2 block font-semibold"
                  >
                    How would you like to partner with us?
                  </label>

                  <textarea
                    id="p-message"
                    name="message"
                    rows={5}
                    className={fieldClass}
                  />
                </div>

                <label className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    name="consent"
                    required
                    className="mt-1 h-5 w-5 shrink-0"
                  />

                  <span className="text-gray-700">
                    I agree to be contacted regarding partnership
                    opportunities.
                  </span>
                </label>

                {error && (
                  <p
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700"
                  >
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="w-full rounded-xl bg-brand py-5 text-lg font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {sending ? "Sending…" : "Submit partnership request"}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="flex justify-center">
              <CheckCircle size={80} className="text-green-600" />
            </div>

            <h2 className="text-4xl font-bold mt-8">Thank You</h2>

            <p className="text-gray-700 mt-6 leading-8 max-w-xl mx-auto">
              Your partnership request has been received successfully. A member
              of St. Hannah Foundation will contact you shortly to discuss
              collaboration opportunities.
            </p>

            <button
              onClick={handleClose}
              className="mt-10 bg-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-dark transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
