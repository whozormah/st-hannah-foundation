export default function Step5Documents() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">
        Documents & Supporting Information{" "}
      </h3>
      <p className="text-gray-700 mb-8">
        Please upload any relevant documents that can help our review team
        understand your application and assess your support request.
      </p>
      {/* Applicant Photograph */}
      <div className="mb-10">
        <h4 className="text-xl font-bold mb-4">Applicant Photograph</h4>

        <div className="bg-white border rounded-2xl p-6">
          <input
            type="file"
            aria-label="Applicant photograph"
            accept=".jpg,.jpeg,.png"
            className="w-full"
          />

          <p className="text-sm text-gray-500 mt-3">
            Upload a recent passport photograph or clear picture of yourself.
            Accepted formats: JPG, JPEG and PNG.
          </p>
        </div>
      </div>
      {/* Supporting Documents */}
      <div className="mb-10">
        <h4 className="text-xl font-bold mb-4">Supporting Documents</h4>

        <input
          type="file"
          aria-label="Supporting documents"
          multiple
          accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          className="w-full p-4 border rounded-xl bg-white"
        />

        <p className="text-sm text-gray-500 mt-3">
          Upload any relevant documents such as identification, admission
          letters, school fee invoices, medical reports, business proposals,
          quotations or other supporting evidence.
        </p>
      </div>
      {/* Previous Support */}
      <div className="mb-10">
        <h4 className="text-xl font-bold mb-4">Previous Support Information</h4>

        <div className="space-y-6">
          <div>
            <label htmlFor="apply-previousSupport" className="mb-2 block font-semibold">
              Have You Received Support From St. Hannah Foundation Before?
            </label>

            <select id="apply-previousSupport" name="previousSupport" className="w-full p-4 border rounded-xl">
            <option value="">Please select</option>

            <option>Yes</option>

            <option>No</option>
          </select>
          </div>

          <div>
            <label htmlFor="apply-previousSupportDetail" className="mb-2 block font-semibold">
              If Yes, Please Describe The Support Received And When You Received It
            </label>

            <textarea id="apply-previousSupportDetail"
            rows={4}
            name="previousSupportDetail"
            placeholder="If Yes, Please Describe The Support Received And When You Received It"
            className="w-full p-4 border rounded-xl"
            />
          </div>
        </div>
      </div>
      {/* Supporting Narrative */}
      <div>
        <h4 className="text-xl font-bold mb-4">Supporting Narrative</h4>

        <div className="space-y-6">
          <div>
            <label htmlFor="apply-situationNarrative" className="mb-2 block font-semibold">
              Please tell us about your current situation, the challenges you are facing and how this support will help improve your circumstances.
            </label>

            <textarea id="apply-situationNarrative"
            rows={6}
            name="situationNarrative"
            placeholder="Please tell us about your current situation, the challenges you are facing and how this support will help improve your circumstances."
            className="w-full p-4 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="apply-stepsTaken" className="mb-2 block font-semibold">
              What steps have you already taken to address this situation?
            </label>

            <textarea id="apply-stepsTaken"
            rows={5}
            name="stepsTaken"
            placeholder="What steps have you already taken to address this situation?"
            className="w-full p-4 border rounded-xl"
            />
          </div>

          <textarea
            name="additionalInformation"
            aria-label="Additional information for the review team"
            
            rows={5}
            placeholder="Is there any additional information you would like the review team to know?"
            className="w-full p-4 border rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
