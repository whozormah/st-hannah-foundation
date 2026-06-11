"use client";

export default function AidApplicationForm() {
  return (
    <section className="py-24 bg-white">
      <div className="container-custom max-w-5xl">
        <div className="bg-[#FAF7F2] rounded-[32px] p-10 md:p-14 shadow-sm">
          <div className="text-center mb-12">
            <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
              Application Form
            </span>

            <h2 className="text-5xl font-bold mt-4">Apply For Support</h2>

            <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
              Please provide accurate information. All applications are reviewed
              based on program criteria and available resources.
            </p>
          </div>

          <form className="space-y-10">
            {/* Personal Information */}

            <div>
              <h3 className="text-2xl font-bold mb-6">Personal Information</h3>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full p-4 border rounded-xl"
                />

                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full p-4 border rounded-xl"
                />

                <select className="w-full p-4 border rounded-xl">
                  <option>Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>

                <input type="date" className="w-full p-4 border rounded-xl" />

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full p-4 border rounded-xl"
                />

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-4 border rounded-xl"
                />
              </div>
            </div>

            {/* Address */}

            <div>
              <h3 className="text-2xl font-bold mb-6">
                Residential Information
              </h3>

              <div className="space-y-6">
                <input
                  type="text"
                  placeholder="Residential Address"
                  className="w-full p-4 border rounded-xl"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="State"
                    className="w-full p-4 border rounded-xl"
                  />

                  <input
                    type="text"
                    placeholder="LGA"
                    className="w-full p-4 border rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Support Category */}

            <div>
              <h3 className="text-2xl font-bold mb-6">Support Request</h3>

              <select className="w-full p-4 border rounded-xl">
                <option>Type Of Support Needed</option>

                <option>Education Support</option>

                <option>Widow Empowerment</option>

                <option>Family Support</option>

                <option>Business Empowerment</option>

                <option>Medical Assistance</option>

                <option>Emergency Assistance</option>

                <option>Other</option>
              </select>
            </div>

            {/* Background Information */}

            <div>
              <h3 className="text-2xl font-bold mb-6">
                Background Information
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                <input
                  type="text"
                  placeholder="Occupation"
                  className="w-full p-4 border rounded-xl"
                />

                <select className="w-full p-4 border rounded-xl">
                  <option>Marital Status</option>
                  <option>Single</option>
                  <option>Married</option>
                  <option>Widowed</option>
                  <option>Divorced</option>
                </select>

                <input
                  type="text"
                  placeholder="Monthly Income Range"
                  className="w-full p-4 border rounded-xl"
                />

                <input
                  type="number"
                  placeholder="Number Of Dependents"
                  className="w-full p-4 border rounded-xl"
                />
              </div>
            </div>

            {/* Applicant Photo */}

            <div>
              <h3 className="text-2xl font-bold mb-6">Applicant Photograph</h3>

              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="w-full p-4 border rounded-xl bg-white"
              />
            </div>

            {/* Supporting Documents */}

            <div>
              <h3 className="text-2xl font-bold mb-6">Supporting Documents</h3>

              <input
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                className="w-full p-4 border rounded-xl bg-white"
              />

              <p className="text-sm text-gray-500 mt-3">
                Upload any relevant documents such as identification, admission
                letters, school fee invoices, medical reports, business
                proposals or other supporting evidence.
              </p>
            </div>

            {/* Application Details */}

            <div>
              <h3 className="text-2xl font-bold mb-6">
                Tell Us About Your Situation
              </h3>

              <textarea
                rows={8}
                placeholder="Provide details about your circumstances and the support you are requesting."
                className="w-full p-4 border rounded-xl"
              />
            </div>

            {/* Declaration */}

            <div className="bg-white p-6 rounded-2xl border">
              <label className="flex gap-4 items-start">
                <input type="checkbox" className="mt-1" />

                <span className="text-gray-700">
                  I certify that the information provided is true and accurate
                  to the best of my knowledge.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#844204] text-white py-5 rounded-xl font-semibold text-lg hover:bg-[#6d3503] transition"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
