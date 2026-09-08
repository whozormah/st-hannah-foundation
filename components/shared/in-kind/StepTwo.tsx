"use client";

import { useEffect, useMemo } from "react";

import { InKindDonationData } from "./types";

interface StepTwoProps {
  formData: InKindDonationData;
  setFormData: React.Dispatch<React.SetStateAction<InKindDonationData>>;
}

export default function StepTwo({ formData, setFormData }: StepTwoProps) {
  // Derived from the selected file rather than rebuilt on every render:
  // the inline version leaked a fresh object URL on each keystroke in this step.
  const previewUrl = useMemo(
    () => (formData.image ? URL.createObjectURL(formData.image) : null),
    [formData.image],
  );

  // Release the URL once it is replaced or the step unmounts.
  useEffect(() => {
    if (!previewUrl) return;

    return () => URL.revokeObjectURL(previewUrl);
  }, [previewUrl]);

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          About Your Donation
        </h2>

        <p className="text-gray-700 mt-2">
          Tell us more about the item(s) you would like to donate.
        </p>
      </div>

      <div className="space-y-6">
        {/* Category */}

        <div>
          <label className="block font-semibold mb-2">
            Donation Category *
          </label>

          <select
            value={formData.category}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                category: e.target.value,
              }))
            }
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
            required
          >
            <option value="">Select Category</option>

            <option value="Food Items">Food Items</option>

            <option value="Clothing">Clothing</option>

            <option value="Educational Materials">Educational Materials</option>

            <option value="School Supplies">School Supplies</option>

            <option value="Medical Supplies">Medical Supplies</option>

            <option value="Furniture">Furniture</option>

            <option value="Electronics">Electronics</option>

            <option value="Business Equipment">Business Equipment</option>

            <option value="Tools & Skilled Labour Equipment">
              Tools & Skilled Labour Equipment
            </option>

            <option value="Household Items">Household Items</option>

            <option value="Other">Other</option>
          </select>
        </div>

        {/* Description */}

        <div>
          <label className="block font-semibold mb-2">
            Describe The Item(s) *
          </label>

          <textarea
            rows={5}
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Example: 5 bags of rice, 20 school bags, books, medical supplies, 2 sewing machines..."
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
            required
          />
        </div>

        {/* Quantity */}

        <div>
          <label className="block font-semibold mb-2">Quantity *</label>

          <input
            type="text"
            value={formData.quantity}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                quantity: e.target.value,
              }))
            }
            placeholder="Example: 5 bags, 20 pieces, 2 cartons"
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
            required
          />
        </div>

        {/* Condition */}

        <div>
          <label className="block font-semibold mb-2">Size / Condition *</label>

          <input
            type="text"
            value={formData.condition}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                condition: e.target.value,
              }))
            }
            placeholder="Example: New, Fairly Used, Excellent Condition, Medium Size"
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
            required
          />
          {previewUrl && (
            // A local object URL for a file the donor just picked; next/image
            // cannot optimise blob: sources.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={previewUrl}
              alt="Preview of the item you are donating"
              className="mt-4 h-48 w-full object-cover rounded-xl border"
            />
          )}
        </div>

        {/* Image Upload */}

        <div>
          <label className="block font-semibold mb-2">
            Upload Item Image *
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                image: e.target.files?.[0] || null,
              }))
            }
            className="w-full p-4 border border-gray-200 rounded-xl focus:border-brand"
            required
          />

          <p className="text-sm text-gray-500 mt-2">
            Upload a clear photo of the item(s) you wish to donate.
          </p>
        </div>
      </div>
    </div>
  );
}
