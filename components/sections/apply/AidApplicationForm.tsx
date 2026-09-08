"use client";
import { useRef, useState } from "react";

import ApplicationProgress from "./ApplicationProgress";

import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2ResidentialInfo from "./Step2ResidentialInfo";
import Step3SupportRequest from "./Step3SupportRequest";
import Step4FamilyBackground from "./Step4FamilyBackground";
import Step5Documents from "./Step5Documents";
import Step6ReviewSubmit from "./Step6ReviewSubmit";

const DECLARATIONS = [
  "declarationTrue",
  "declarationNoGuarantee",
  "declarationContact",
  "declarationDataUse",
];

export default function AidApplicationForm() {
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    // Declarations are checkboxes on the final step; the browser cannot
    // enforce required on steps that are hidden, so they are checked here.
    const agreed = DECLARATIONS.every((name) => formData.get(name) !== null);

    if (!agreed) {
      setError("Please accept all four declarations before submitting.");

      return;
    }

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/aid-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message ?? "Something went wrong. Please try again.");
        setStatus("idle");

        return;
      }

      setReference(result.reference);
      setStatus("sent");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(
        "We could not reach the server. Please check your connection and try again.",
      );
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <section className="bg-white py-24">
        <div className="container-custom max-w-3xl">
          <div className="rounded-[32px] bg-cream p-12 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-brand">
              Your Application Has Been Received
            </h2>

            <p className="mt-6 text-lg leading-9 text-gray-700">
              Thank you for reaching out. Every application is reviewed with
              care, and a member of our team will contact you about the next
              steps. Supporting documents may be requested by email.
            </p>

            <p className="mt-8 rounded-xl bg-white px-6 py-4 font-semibold text-brand">
              Reference {reference}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const nextStep = () => {
    if (step < 6) {
      setStep(step + 1);

      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);

      setTimeout(() => {
        formRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24 bg-white">
      {" "}
      <div className="container-custom max-w-5xl">
        {" "}
        <div
          ref={formRef}
          className="bg-cream rounded-[32px] p-10 md:p-14 shadow-sm"
        >
          {" "}
          <div className="text-center mb-12">
            {" "}
            <span className="uppercase tracking-[5px] text-brand font-semibold">
              Application Form{" "}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Support Application Form
            </h2>
            <p className="mt-6 text-gray-700 leading-8 max-w-3xl mx-auto">
              Complete the steps below to submit your support request. Please
              provide accurate information to help us review your application
              effectively.
            </p>
          </div>
          <ApplicationProgress currentStep={step} />
          {/* Every step stays mounted and inactive ones are hidden, so
              answers survive navigation and are all present on submit. */}
          <form onSubmit={handleSubmit}>
            <div className="mt-12">
              <div hidden={step !== 1}>
                <Step1PersonalInfo />
              </div>

              <div hidden={step !== 2}>
                <Step2ResidentialInfo />
              </div>

              <div hidden={step !== 3}>
                <Step3SupportRequest />
              </div>

              <div hidden={step !== 4}>
                <Step4FamilyBackground />
              </div>

              <div hidden={step !== 5}>
                <Step5Documents />
              </div>

              <div hidden={step !== 6}>
                <Step6ReviewSubmit />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-10 rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700"
              >
                {error}
              </p>
            )}
          <div className="flex justify-between mt-12">
            <button
              type="button"
              onClick={prevStep}
              disabled={step === 1}
              className="px-8 py-4 border border-gray-300 rounded-xl font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition"
            >
              Previous
            </button>

            {step < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                className="bg-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-dark transition"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="submit"
                disabled={status === "sending"}
                className="rounded-xl bg-brand px-8 py-4 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "sending" ? "Submitting…" : "Submit Application"}
              </button>
            )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
