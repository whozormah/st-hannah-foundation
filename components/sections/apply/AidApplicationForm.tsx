"use client";
import { useRef, useState } from "react";

import ApplicationProgress from "./ApplicationProgress";

import Step1PersonalInfo from "./Step1PersonalInfo";
import Step2ResidentialInfo from "./Step2ResidentialInfo";
import Step3SupportRequest from "./Step3SupportRequest";
import Step4FamilyBackground from "./Step4FamilyBackground";
import Step5Documents from "./Step5Documents";
import Step6ReviewSubmit from "./Step6ReviewSubmit";

export default function AidApplicationForm() {
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);

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
          className="bg-[#FAF7F2] rounded-[32px] p-10 md:p-14 shadow-sm"
        >
          {" "}
          <div className="text-center mb-12">
            {" "}
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Application Form{" "}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4">
              Support Application Form
            </h2>
            <p className="mt-6 text-gray-600 leading-8 max-w-3xl mx-auto">
              Complete the steps below to submit your support request. Please
              provide accurate information to help us review your application
              effectively.
            </p>
          </div>
          <ApplicationProgress currentStep={step} />
          <div className="mt-12">
            {step === 1 && <Step1PersonalInfo />}
            {step === 2 && <Step2ResidentialInfo />}
            {step === 3 && <Step3SupportRequest />}
            {step === 4 && <Step4FamilyBackground />}
            {step === 5 && <Step5Documents />}
            {step === 6 && <Step6ReviewSubmit />}
          </div>
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
                className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6d3503] transition"
              >
                Next Step →
              </button>
            ) : (
              <button
                type="submit"
                className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6d3503] transition"
              >
                Submit Application
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
