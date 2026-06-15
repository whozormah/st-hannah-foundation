"use client";

import { useEffect, useState } from "react";
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
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

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
  useEffect(() => {
    if (isOpen && initialCategory) {
      setFormData((prev) => ({
        ...prev,
        category: initialCategory,
      }));
    }
  }, [initialCategory, isOpen]);

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

  const handleSubmit = () => {
    if (!validateStep()) return;

    console.log(formData);

    setSubmitted(true);
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
            <h1 className="text-4xl font-bold">Donate Items & Materials</h1>

            <p className="text-gray-600 mt-3 max-w-2xl">
              Support our mission through food items, clothing, educational
              materials, medical supplies, equipment and other resources that
              can positively impact lives and communities.
            </p>
          </div>

          <button onClick={handleClose} className="hover:scale-110 transition">
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
                  className="bg-[#844204] h-3 rounded-full transition-all duration-300"
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
                  className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6d3503] transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6d3503] transition"
                >
                  Submit Donation Offer
                </button>
              )}
            </div>
          </>
        )}

        {submitted && <SuccessScreen onClose={handleClose} />}
      </div>
    </div>
  );
}
