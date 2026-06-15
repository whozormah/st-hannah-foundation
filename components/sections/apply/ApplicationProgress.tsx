interface ApplicationProgressProps {
  currentStep: number;
}

export default function ApplicationProgress({
  currentStep,
}: ApplicationProgressProps) {
  const steps = [
    "Personal",
    "Residential",
    "Support",
    "Family",
    "Documents",
    "Review",
  ];

  const progress = (currentStep / steps.length) * 100;

  return (
    <div className="mb-12">
      <div className="flex justify-between mb-4">
        <span className="font-semibold text-[#844204]">
          Step {currentStep} of {steps.length}
        </span>

        <span className="text-gray-500">{Math.round(progress)}% Complete</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#844204] transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="hidden md:grid grid-cols-6 gap-2 mt-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`text-center text-xs font-medium ${
              currentStep >= index + 1 ? "text-[#844204]" : "text-gray-400"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}
