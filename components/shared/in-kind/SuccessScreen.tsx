interface SuccessScreenProps {
  onClose: () => void;
}

export default function SuccessScreen({ onClose }: SuccessScreenProps) {
  const reference = "SHF-" + Date.now().toString().slice(-6);
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 mx-auto rounded-full bg-green-100 flex items-center justify-center">
          <svg
            className="w-12 h-12 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <h2 className="text-4xl font-bold mt-8">
          Thank You For Your Generosity
        </h2>

        <p className="text-gray-600 mt-6 leading-8">
          Your donation offer has been received successfully. A member of the
          St. Hannah Foundation team will review your submission and contact you
          shortly regarding the next steps.
        </p>

        <div className="mt-6 bg-[#FAF7F2] p-4 rounded-xl">
          <p className="text-sm text-gray-500">Reference Number</p>

          <p className="font-bold text-lg text-[#844204]">{reference}</p>
        </div>
        <button
          onClick={onClose}
          className="mt-10 bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6d3503] transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}
