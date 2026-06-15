export default function Step5Documents() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">
        Documents & Supporting Information{" "}
      </h3>
      <p className="text-gray-600 mb-8">
        Please upload any relevant documents that can help our review team
        understand your application and assess your support request.
      </p>
      {/* Applicant Photograph */}
      <div className="mb-10">
        <h4 className="text-xl font-bold mb-4">Applicant Photograph</h4>

        <div className="bg-white border rounded-2xl p-6">
          <input type="file" accept=".jpg,.jpeg,.png" className="w-full" />

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
          <select className="w-full p-4 border rounded-xl">
            <option>
              Have You Received Support From St. Hannah Foundation Before?
            </option>

            <option>Yes</option>

            <option>No</option>
          </select>

          <textarea
            rows={4}
            placeholder="If Yes, Please Describe The Support Received And When You Received It"
            className="w-full p-4 border rounded-xl"
          />
        </div>
      </div>
      {/* Supporting Narrative */}
      <div>
        <h4 className="text-xl font-bold mb-4">Supporting Narrative</h4>

        <div className="space-y-6">
          <textarea
            rows={6}
            placeholder="Please tell us about your current situation, the challenges you are facing and how this support will help improve your circumstances."
            className="w-full p-4 border rounded-xl"
          />

          <textarea
            rows={5}
            placeholder="What steps have you already taken to address this situation?"
            className="w-full p-4 border rounded-xl"
          />

          <textarea
            rows={5}
            placeholder="Is there any additional information you would like the review team to know?"
            className="w-full p-4 border rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
