"use client";

import { useState } from "react";

import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { X } from "lucide-react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";
import SuccessScreen from "./SuccessScreen";

import { InKindDonationData } from "./types";

interface InKindDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: string;
}

export default function InKindDonationModal({
  isOpen,
  onClose,
  initialCategory = "",
}: InKindDonationModalProps) {
  useBodyScrollLock(isOpen);

  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState<InKindDonationData>({
    fullName: "",
    email: "",
    phone: "",

    category: initialCategory,
    description: "",
    quantity: "",
    condition: "",
    image: null,

    location: "",
    customLocation: "",

    deliveryMethod: "",

    pickupAddress: "",
    contactMethod: "",
    pickupDate: "",
    pickupTime: "",
    pickupInstructions: "",

    destination: "",

    acknowledgeDonation: "No",
  });

  if (!isOpen) return null;

  const stepTitles = [
    "About You",
    "Donation Details",
    "Location & Delivery",
    "Logistics & Review",
  ];
  const progress = (step / 4) * 100;

  const validateStep = () => {
    if (step === 1) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        alert("Please complete all required fields.");
        return false;
      }
    }

    if (step === 2) {
      if (
        !formData.category ||
        !formData.description ||
        !formData.quantity ||
        !formData.condition ||
        !formData.image
      ) {
        alert("Please complete all donation information.");
        return false;
      }
    }

    if (step === 3) {
      if (!formData.location || !formData.deliveryMethod) {
        alert("Please complete location and delivery information.");
        return false;
      }

      if (formData.location === "Other" && !formData.customLocation) {
        alert("Please specify your location.");
        return false;
      }
    }

    if (step === 4) {
      if (formData.deliveryMethod === "Pickup") {
        if (
          !formData.pickupAddress ||
          !formData.contactMethod ||
          !formData.pickupDate ||
          !formData.pickupTime
        ) {
          alert("Please complete pickup information.");
          return false;
        }
      }

      if (formData.deliveryMethod === "Send") {
        if (!formData.destination) {
          alert("Please select a delivery destination.");
          return false;
        }
      }
    }

    return true;
  };

  const handleNext = () => {
    if (!validateStep()) return;

    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep()) return;

    setSubmitting(true);
    setSubmitError("");

    try {
      // The image is deliberately not sent: there is no file storage
      // configured, and the Foundation asks for photographs by reply.
      const { image, ...submission } = formData;
      void image;

      const response = await fetch("/api/in-kind-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitError(
          result.message ?? "Something went wrong. Please try again.",
        );

        return;
      }

      // Comes back from the server so the donor and the Foundation are
      // looking at the same reference.
      setReference(result.reference);
      setSubmitted(true);
    } catch {
      setSubmitError(
        "We could not reach the server. Please check your connection and try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    const confirmClose = window.confirm(
      "Are you sure you want to close this donation form? Any information entered will be lost.",
    );

    if (!confirmClose) return;
    setStep(1);
    setSubmitted(false);

    setFormData({
      fullName: "",
      email: "",
      phone: "",

      category: initialCategory,
      description: "",
      quantity: "",
      condition: "",
      image: null,

      location: "",
      customLocation: "",

      deliveryMethod: "",

      pickupAddress: "",
      contactMethod: "",
      pickupDate: "",
      pickupTime: "",
      pickupInstructions: "",

      destination: "",

      acknowledgeDonation: "No",
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99999] bg-white overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        {/* Header */}

        <div className="flex justify-between items-start mb-10">
          <div>
            <h2 className="text-4xl font-bold">Donate Items &amp; Materials</h2>

            <p className="text-gray-700 mt-3 max-w-2xl">
              Support our mission through food items, clothing, educational
              materials, medical supplies, equipment and other resources that
              can positively impact lives and communities.
            </p>
          </div>

          <button aria-label="Close" onClick={handleClose} className="hover:scale-110 transition">
            <X size={32} />
          </button>
        </div>

        {!submitted && (
          <>
            {/* Progress */}

            <div className="mb-10">
              <div className="flex justify-between mb-3">
                <div>
                  <p className="font-medium">Step {step} of 4</p>

                  <p className="text-sm text-gray-500">
                    {stepTitles[step - 1]}
                  </p>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-brand h-3 rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                  }}
                />
              </div>
            </div>

            {/* Steps */}

            {step === 1 && (
              <StepOne formData={formData} setFormData={setFormData} />
            )}

            {step === 2 && (
              <StepTwo formData={formData} setFormData={setFormData} />
            )}

            {step === 3 && (
              <StepThree formData={formData} setFormData={setFormData} />
            )}

            {step === 4 && (
              <StepFour formData={formData} setFormData={setFormData} />
            )}

            {submitError && (
              <p
                role="alert"
                className="mt-8 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700"
              >
                {submitError}
              </p>
            )}

            {/* Navigation */}

            <div className="flex justify-between mt-10">
              {step > 1 ? (
                <button
                  onClick={handlePrevious}
                  className="border border-gray-300 px-8 py-4 rounded-xl font-semibold"
                >
                  Previous
                </button>
              ) : (
                <div />
              )}

              {step < 4 ? (
                <button
                  onClick={handleNext}
                  className="bg-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-dark transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="bg-brand text-white px-8 py-4 rounded-xl font-semibold transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting…" : "Submit Donation Offer"}
                </button>
              )}
            </div>
          </>
        )}

        {submitted && (
          <SuccessScreen onClose={handleClose} reference={reference} />
        )}
      </div>
    </div>
  );
}
