export default function Step6ReviewSubmit() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">Review & Submit Application </h3>
      <p className="text-gray-600 mb-8">
        Please review your application carefully before submission. Ensure all
        information provided is accurate and complete.
      </p>
      {/* Review Summary */}
      <div className="bg-white rounded-[24px] border p-8 mb-10">
        <h4 className="text-xl font-bold mb-6">Application Checklist</h4>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <span>Personal Information Provided</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <span>Residential Information Provided</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <span>Support Request Details Completed</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <span>Family & Background Information Completed</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-green-600 text-xl">✓</span>
            <span>Supporting Documents Uploaded (Where Available)</span>
          </div>
        </div>
      </div>
      {/* Important Notice */}
      <div className="bg-white border border-[#D9A441] rounded-[24px] p-8 mb-10">
        <h4 className="font-bold text-[#844204] mb-4">Important Notice</h4>

        <ul className="space-y-3 text-gray-700 leading-7">
          <li>
            • Submission of this application does not automatically guarantee
            approval.
          </li>

          <li>
            • Applications are reviewed based on need, eligibility and available
            resources.
          </li>

          <li>
            • Additional information or supporting documents may be requested.
          </li>

          <li>
            • Review timelines may vary depending on the type of support
            requested.
          </li>

          <li>• All information provided will be treated confidentially.</li>
        </ul>
      </div>
      {/* Declaration */}
      <div className="bg-white rounded-[24px] border p-8">
        <h4 className="text-xl font-bold mb-6">Declaration & Consent</h4>

        <div className="space-y-5">
          <label className="flex gap-4 items-start">
            <input type="checkbox" className="mt-1" />

            <span className="text-gray-700">
              I certify that the information provided in this application is
              true, complete and accurate to the best of my knowledge.
            </span>
          </label>

          <label className="flex gap-4 items-start">
            <input type="checkbox" className="mt-1" />

            <span className="text-gray-700">
              I understand that submission of this application does not
              guarantee approval and that all applications are subject to
              review, verification and available resources.
            </span>
          </label>

          <label className="flex gap-4 items-start">
            <input type="checkbox" className="mt-1" />

            <span className="text-gray-700">
              I consent to being contacted by St. Hannah Foundation regarding
              this application.
            </span>
          </label>

          <label className="flex gap-4 items-start">
            <input type="checkbox" className="mt-1" />

            <span className="text-gray-700">
              I consent to the processing of my information for application
              review, beneficiary management and programme administration
              purposes.
            </span>
          </label>
        </div>
      </div>
      {/* Encouragement */}
      <div className="mt-10 bg-[#844204] text-white rounded-[24px] p-8 text-center">
        <h4 className="text-2xl font-bold">Thank You For Reaching Out</h4>

        <p className="mt-4 text-white/90 leading-8 max-w-3xl mx-auto">
          We understand that seeking support can be difficult. Every application
          is reviewed with care, dignity, fairness and compassion. Our team is
          committed to helping where possible and connecting people with
          meaningful support opportunities.
        </p>
      </div>
    </div>
  );
}
