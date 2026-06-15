import { InKindDonationData } from "./types";

interface StepOneProps {
  formData: InKindDonationData;
  setFormData: React.Dispatch<React.SetStateAction<InKindDonationData>>;
}

export default function StepOne({ formData, setFormData }: StepOneProps) {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">About You</h2>

        <p className="text-gray-600 mt-2">
          Please provide your contact information so we can coordinate your
          donation.
        </p>
      </div>

      <div className="space-y-6">
        {/* Full Name */}

        <div>
          <label className="block font-semibold mb-2">
            What is your full name? *
          </label>

          <input
            type="text"
            value={formData.fullName}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                fullName: e.target.value,
              }))
            }
            placeholder="Enter your full name"
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            required
          />
        </div>

        {/* Email */}

        <div>
          <label className="block font-semibold mb-2">
            What is your email address? *
          </label>

          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            placeholder="Enter your email address"
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            required
          />
        </div>

        {/* Phone */}

        <div>
          <label className="block font-semibold mb-2">
            What is the best phone number to reach you? *
          </label>

          <input
            type="tel"
            value={formData.phone}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                phone: e.target.value,
              }))
            }
            placeholder="+2348012345678"
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            required
          />

          <p className="text-sm text-gray-500 mt-2">
            Include country code if applicable.
          </p>
        </div>
      </div>
    </div>
  );
}
