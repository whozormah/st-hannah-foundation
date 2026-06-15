"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface InKindDonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InKindDonationModal({
  isOpen,
  onClose,
}: InKindDonationModalProps) {
  const [location, setLocation] = useState("");
  const [deliveryMethod, setDeliveryMethod] = useState("");
  const [destination, setDestination] = useState("");

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[32px] w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-8 flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold">Donate Items & Materials</h2>

            <p className="text-gray-500 mt-2">
              Support our mission through food items, clothing, educational
              materials, equipment and other resources.
            </p>
          </div>

          <button onClick={onClose}>
            <X size={28} />
          </button>
        </div>

        <form
          action="https://formspree.io/f/YOUR_FORM_ID"
          method="POST"
          encType="multipart/form-data"
          className="p-8 space-y-6"
        >
          {/* Full Name */}

          <input
            type="text"
            name="fullName"
            required
            placeholder="Full Name"
            className="w-full p-4 border rounded-xl"
          />

          {/* Email */}

          <input
            type="email"
            name="email"
            required
            placeholder="Email Address"
            className="w-full p-4 border rounded-xl"
          />

          {/* Items */}

          <textarea
            name="items"
            required
            rows={4}
            placeholder="Items You Would Like To Donate"
            className="w-full p-4 border rounded-xl"
          />

          {/* Quantity */}

          <input
            type="text"
            name="quantity"
            required
            placeholder="Quantity / Size"
            className="w-full p-4 border rounded-xl"
          />

          {/* Image */}

          <div>
            <label className="block font-semibold mb-2">
              Upload Item Image
            </label>

            <input
              type="file"
              name="itemImage"
              accept="image/*"
              required
              className="w-full"
            />
          </div>

          {/* Location */}

          <select
            name="location"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-4 border rounded-xl"
          >
            <option value="">Where Is The Item Located?</option>
            <option value="Lagos, Nigeria">Lagos, Nigeria</option>
            <option value="Chicago, USA">Chicago, USA</option>
            <option value="Other">Other</option>
          </select>

          {location === "Other" && (
            <input
              type="text"
              name="customLocation"
              required
              placeholder="Specify Your Location"
              className="w-full p-4 border rounded-xl"
            />
          )}

          {/* Delivery */}

          <select
            name="deliveryMethod"
            required
            value={deliveryMethod}
            onChange={(e) => setDeliveryMethod(e.target.value)}
            className="w-full p-4 border rounded-xl"
          >
            <option value="">How Would You Like To Donate?</option>
            <option value="Pickup">Pickup</option>
            <option value="Send">Send</option>
          </select>

          {/* Pickup */}

          {deliveryMethod === "Pickup" && (
            <>
              <input
                type="tel"
                name="phone"
                required
                pattern="[0-9+\-\s()]{10,15}"
                placeholder="Phone Number"
                className="w-full p-4 border rounded-xl"
              />

              <textarea
                name="pickupAddress"
                required
                rows={3}
                placeholder="Pickup Address"
                className="w-full p-4 border rounded-xl"
              />

              <textarea
                name="notes"
                rows={3}
                placeholder="Additional Notes"
                className="w-full p-4 border rounded-xl"
              />
            </>
          )}

          {/* Send */}

          {deliveryMethod === "Send" && (
            <>
              <select
                required
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                name="destination"
                className="w-full p-4 border rounded-xl"
              >
                <option value="">Send To</option>

                <option value="Lagos Office">Lagos, Nigeria Office</option>

                <option value="Chicago Office">Chicago, USA Office</option>
              </select>

              {destination === "Lagos Office" && (
                <div className="bg-[#FAF7F2] p-6 rounded-2xl">
                  <h4 className="font-bold">Lagos Delivery Address</h4>

                  <p className="mt-2 text-gray-600">
                    35 Ilaje Road
                    <br />
                    Bariga, Lagos
                    <br />
                    Nigeria
                  </p>
                </div>
              )}

              {destination === "Chicago Office" && (
                <div className="bg-[#FAF7F2] p-6 rounded-2xl">
                  <h4 className="font-bold">Chicago Delivery Address</h4>

                  <p className="mt-2 text-gray-600">
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
            </>
          )}

          {/* Submit */}

          <button
            type="submit"
            className="w-full bg-[#844204] text-white py-4 rounded-xl font-semibold"
          >
            Donate These Items
          </button>
        </form>
      </div>
    </div>
  );
}
