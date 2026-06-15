import { InKindDonationData } from "./types";

interface StepThreeProps {
  formData: InKindDonationData;
  setFormData: React.Dispatch<React.SetStateAction<InKindDonationData>>;
}

export default function StepThree({ formData, setFormData }: StepThreeProps) {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Location & Delivery
        </h2>

        <p className="text-gray-600 mt-2">
          Tell us where the item is located and how you would like the donation
          to reach us.
        </p>
      </div>

      <div className="space-y-6">
        {/* Item Location */}

        <div>
          <label className="block font-semibold mb-2">
            Where are the item(s) currently located? *
          </label>

          <select
            value={formData.location}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                location: e.target.value,
              }))
            }
            className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
          >
            <option value="">Select Location</option>

            <option value="Lagos, Nigeria">Lagos, Nigeria</option>

            <option value="Chicago, USA">Chicago, USA</option>

            <option value="Other">Other Location</option>
          </select>
        </div>

        {/* Custom Location */}

        {formData.location === "Other" && (
          <div>
            <label className="block font-semibold mb-2">
              Specify Your Location *
            </label>

            <input
              type="text"
              value={formData.customLocation}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customLocation: e.target.value,
                }))
              }
              placeholder="City, State, Country"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            />
          </div>
        )}

        {/* Delivery Method */}

        <div>
          <label className="block font-semibold mb-4">
            How would you like us to receive the donation? *
          </label>

          <div className="grid md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  deliveryMethod: "Pickup",
                }))
              }
              className={`p-6 rounded-2xl border text-left transition ${
                formData.deliveryMethod === "Pickup"
                  ? "border-[#844204] bg-[#FAF7F2]"
                  : "border-gray-200"
              }`}
            >
              <h4 className="font-bold text-lg">Arrange Pickup</h4>

              <p className="text-gray-600 mt-2">
                Our team will coordinate a pickup from your location.
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                setFormData((prev) => ({
                  ...prev,
                  deliveryMethod: "Send",
                }))
              }
              className={`p-6 rounded-2xl border text-left transition ${
                formData.deliveryMethod === "Send"
                  ? "border-[#844204] bg-[#FAF7F2]"
                  : "border-gray-200"
              }`}
            >
              <h4 className="font-bold text-lg">I Will Send The Items</h4>

              <p className="text-gray-600 mt-2">
                I prefer to deliver or ship the items myself.
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
