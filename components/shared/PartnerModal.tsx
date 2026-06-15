"use client";

import { useState } from "react";
import { X, CheckCircle } from "lucide-react";

interface PartnerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PartnerModal({ isOpen, onClose }: PartnerModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[99999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-[32px] w-full max-w-3xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {!submitted ? (
          <>
            {/* Header */}

            <div className="flex items-center justify-between p-8 border-b">
              <div>
                <h2 className="text-3xl font-bold">Become A Partner</h2>

                <p className="text-gray-500 mt-2">
                  Let's work together to create lasting impact and transform
                  lives.
                </p>
              </div>

              <button
                onClick={handleClose}
                className="hover:scale-110 transition"
              >
                <X size={28} />
              </button>
            </div>

            {/* Form */}

            <div className="p-8">
              <form className="space-y-6">
                <input
                  type="text"
                  placeholder="Organization / Company Name"
                  className="w-full p-4 border rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Contact Person"
                  className="w-full p-4 border rounded-xl"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full p-4 border rounded-xl"
                  />

                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-4 border rounded-xl"
                  />
                </div>

                <input
                  type="text"
                  placeholder="Country / Location"
                  className="w-full p-4 border rounded-xl"
                />

                <select className="w-full p-4 border rounded-xl">
                  <option>Select Partnership Type</option>

                  <option>Corporate Partnership</option>

                  <option>NGO Partnership</option>

                  <option>Church Partnership</option>

                  <option>Community Partnership</option>

                  <option>Sponsor A Program</option>

                  <option>Sponsor A Beneficiary</option>

                  <option>Volunteer Partnership</option>

                  <option>Media Partnership</option>

                  <option>Other</option>
                </select>

                <textarea
                  rows={5}
                  placeholder="Tell us about your organization and how you would like to partner with St. Hannah Foundation."
                  className="w-full p-4 border rounded-xl"
                />

                <label className="flex items-start gap-3">
                  <input type="checkbox" className="mt-1" />

                  <span className="text-gray-700">
                    I agree to be contacted regarding partnership opportunities.
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => setSubmitted(true)}
                  className="w-full bg-[#844204] text-white py-5 rounded-xl font-semibold text-lg hover:bg-[#6d3503] transition"
                >
                  Submit Partnership Request
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="p-12 text-center">
            <div className="flex justify-center">
              <CheckCircle size={80} className="text-green-600" />
            </div>

            <h2 className="text-4xl font-bold mt-8">Thank You</h2>

            <p className="text-gray-600 mt-6 leading-8 max-w-xl mx-auto">
              Your partnership request has been received successfully. A member
              of St. Hannah Foundation will contact you shortly to discuss
              collaboration opportunities.
            </p>

            <button
              onClick={handleClose}
              className="mt-10 bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#6d3503] transition"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
