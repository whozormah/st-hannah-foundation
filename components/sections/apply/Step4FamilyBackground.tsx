export default function Step4FamilyBackground() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">
        Family & Background Information{" "}
      </h3>
      <p className="text-gray-600 mb-8">
        This information helps us better understand your household situation,
        financial circumstances and support needs.
      </p>
      {/* Background Information */}
      <div className="mb-12">
        <h4 className="text-xl font-bold mb-6">Background Information</h4>

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

            <option>Separated</option>
          </select>

          <select className="w-full p-4 border rounded-xl">
            <option>Primary Source Of Income</option>

            <option>Employment</option>

            <option>Business</option>

            <option>Trading</option>

            <option>Farming</option>

            <option>Skilled Labour</option>

            <option>Unemployed</option>

            <option>Other</option>
          </select>

          <input
            type="text"
            placeholder="If Other, Describe Source Of Income"
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="number"
            placeholder="Estimated Monthly Income (Optional)"
            className="w-full p-4 border rounded-xl md:col-span-2"
          />
        </div>
      </div>
      {/* Family Information */}
      <div>
        <h4 className="text-xl font-bold mb-6">Family Information</h4>

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="number"
            placeholder="Number Of Children"
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="number"
            placeholder="Number Of Dependents"
            className="w-full p-4 border rounded-xl"
          />

          <select className="w-full p-4 border rounded-xl">
            <option>Are You The Primary Provider For Your Household?</option>

            <option>Yes</option>

            <option>No</option>
          </select>

          <input
            type="number"
            placeholder="Number Of People Living In Your Household"
            className="w-full p-4 border rounded-xl"
          />

          <select className="w-full p-4 border rounded-xl">
            <option>Do You Have Any Dependents With Special Needs?</option>

            <option>Yes</option>

            <option>No</option>
          </select>

          <select className="w-full p-4 border rounded-xl">
            <option>
              Are You Currently Responsible For Elderly Relatives?
            </option>

            <option>Yes</option>

            <option>No</option>
          </select>

          <textarea
            rows={4}
            placeholder="If Yes, Please Describe The Special Needs, Medical Conditions Or Challenges"
            className="w-full p-4 border rounded-xl md:col-span-2"
          />
        </div>
      </div>
    </div>
  );
}
