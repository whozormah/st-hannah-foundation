import { InKindDonationData } from "./types";

interface StepFourProps {
  formData: InKindDonationData;
  setFormData: React.Dispatch<React.SetStateAction<InKindDonationData>>;
}

export default function StepFour({ formData, setFormData }: StepFourProps) {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          Delivery Arrangement
        </h2>

        <p className="text-gray-600 mt-2">
          Help us coordinate the most convenient way to receive your donation.
        </p>
      </div>

      {/* PICKUP SECTION */}

      {formData.deliveryMethod === "Pickup" && (
        <div className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">Pickup Address *</label>

            <textarea
              rows={4}
              value={formData.pickupAddress}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pickupAddress: e.target.value,
                }))
              }
              placeholder="Enter the address where the donation can be picked up"
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Preferred Contact Method *
            </label>

            <select
              value={formData.contactMethod}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  contactMethod: e.target.value,
                }))
              }
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            >
              <option value="">Select Contact Method</option>

              <option value="Phone Call">Phone Call</option>

              <option value="WhatsApp">WhatsApp</option>

              <option value="Email">Email</option>

              <option value="Any Of The Above">Any Of The Above</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">
                Preferred Pickup Date *
              </label>

              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pickupDate: e.target.value,
                  }))
                }
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">
                Preferred Pickup Time *
              </label>

              <select
                value={formData.pickupTime}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pickupTime: e.target.value,
                  }))
                }
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
              >
                <option value="">Select Time</option>

                <option value="Morning">Morning (8AM - 12PM)</option>

                <option value="Afternoon">Afternoon (12PM - 4PM)</option>

                <option value="Evening">Evening (4PM - 7PM)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Additional Pickup Instructions
            </label>

            <textarea
              rows={4}
              value={formData.pickupInstructions}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  pickupInstructions: e.target.value,
                }))
              }
              placeholder="Gate code, landmark, call before arrival, etc."
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            />
          </div>
        </div>
      )}

      {/* SEND SECTION */}

      {formData.deliveryMethod === "Send" && (
        <div className="space-y-6">
          <div>
            <label className="block font-semibold mb-2">
              Choose Delivery Destination *
            </label>

            <select
              value={formData.destination}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  destination: e.target.value,
                }))
              }
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:border-[#844204]"
            >
              <option value="">Select Destination</option>

              <option value="Lagos Office">Lagos, Nigeria Office</option>

              <option value="Chicago Office">Chicago, USA Office</option>
            </select>
          </div>

          {formData.destination === "Lagos Office" && (
            <div className="bg-[#FAF7F2] rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-3">Lagos Delivery Address</h4>

              <p className="text-gray-600 leading-7">
                35 Ilaje Road
                <br />
                Bariga, Lagos
                <br />
                Nigeria
              </p>
            </div>
          )}

          {formData.destination === "Chicago Office" && (
            <div className="bg-[#FAF7F2] rounded-2xl p-6">
              <h4 className="font-bold text-lg mb-3">
                Chicago Delivery Address
              </h4>

              <p className="text-gray-600 leading-7">
                4310 S King Dr
                <br />
                Unit 3D
                <br />
                Chicago, IL 60653
                <br />
                United States
              </p>
            </div>
          )}
        </div>
      )}

      {/* ACKNOWLEDGEMENT */}

      <div className="mt-10 border-t pt-8">
        <label className="block font-semibold mb-4">
          Would you like us to publicly acknowledge your donation?
        </label>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                acknowledgeDonation: "Yes",
              }))
            }
            className={`px-6 py-3 rounded-xl border ${
              formData.acknowledgeDonation === "Yes"
                ? "bg-[#844204] text-white border-[#844204]"
                : "border-gray-300"
            }`}
          >
            Yes
          </button>

          <button
            type="button"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                acknowledgeDonation: "No",
              }))
            }
            className={`px-6 py-3 rounded-xl border ${
              formData.acknowledgeDonation === "No"
                ? "bg-[#844204] text-white border-[#844204]"
                : "border-gray-300"
            }`}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
