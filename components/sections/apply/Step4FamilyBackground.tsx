export default function Step4FamilyBackground() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">
        Family & Background Information{" "}
      </h3>
      <p className="text-gray-700 mb-8">
        This information helps us better understand your household situation,
        financial circumstances and support needs.
      </p>
      {/* Background Information */}
      <div className="mb-12">
        <h4 className="text-xl font-bold mb-6">Background Information</h4>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="apply-occupation" className="mb-2 block font-semibold">
              Occupation
            </label>

            <input id="apply-occupation"
            type="text"
            name="occupation"
            placeholder="Occupation"
            className="w-full p-4 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="apply-maritalStatus" className="mb-2 block font-semibold">
              Marital Status
            </label>

            <select id="apply-maritalStatus" name="maritalStatus" className="w-full p-4 border rounded-xl">
            <option value="">Please select</option>

            <option>Single</option>

            <option>Married</option>

            <option>Widowed</option>

            <option>Divorced</option>

            <option>Separated</option>
          </select>
          </div>

          <div>
            <label htmlFor="apply-incomeSource" className="mb-2 block font-semibold">
              Primary Source Of Income
            </label>

            <select id="apply-incomeSource" name="incomeSource" className="w-full p-4 border rounded-xl">
            <option value="">Please select</option>

            <option>Employment</option>

            <option>Business</option>

            <option>Trading</option>

            <option>Farming</option>

            <option>Skilled Labour</option>

            <option>Unemployed</option>

            <option>Other</option>
          </select>
          </div>

          <div>
            <label htmlFor="apply-incomeSourceOther" className="mb-2 block font-semibold">
              If Other, Describe Source Of Income
            </label>

            <input id="apply-incomeSourceOther"
            type="text"
            name="incomeSourceOther"
            placeholder="If Other, Describe Source Of Income"
            className="w-full p-4 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="apply-monthlyIncome" className="mb-2 block font-semibold">
              Estimated Monthly Income (Optional)
            </label>

            <input id="apply-monthlyIncome"
            type="number"
            name="monthlyIncome"
            aria-label="Estimated monthly income"
            placeholder="Estimated Monthly Income (Optional)"
            className="w-full p-4 border rounded-xl md:col-span-2"
            />
          </div>
        </div>
      </div>
      {/* Family Information */}
      <div>
        <h4 className="text-xl font-bold mb-6">Family Information</h4>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="apply-children" className="mb-2 block font-semibold">
              Number Of Children
            </label>

            <input id="apply-children"
            type="number"
            name="children"
            aria-label="Number of children"
            placeholder="Number Of Children"
            className="w-full p-4 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="apply-dependents" className="mb-2 block font-semibold">
              Number Of Dependents
            </label>

            <input id="apply-dependents"
            type="number"
            name="dependents"
            aria-label="Number of dependents"
            placeholder="Number Of Dependents"
            className="w-full p-4 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="apply-primaryProvider" className="mb-2 block font-semibold">
              Are You The Primary Provider For Your Household?
            </label>

            <select id="apply-primaryProvider" name="primaryProvider" className="w-full p-4 border rounded-xl">
            <option value="">Please select</option>

            <option>Yes</option>

            <option>No</option>
          </select>
          </div>

          <input
            name="householdSize"
            inputMode="numeric"
            aria-label="Number of people living in your household"
            
            type="number"
            placeholder="Number Of People Living In Your Household"
            className="w-full p-4 border rounded-xl"
          />

          <div>
            <label htmlFor="apply-specialNeedsDependents" className="mb-2 block font-semibold">
              Do You Have Any Dependents With Special Needs?
            </label>

            <select id="apply-specialNeedsDependents" name="specialNeedsDependents" className="w-full p-4 border rounded-xl">
            <option value="">Please select</option>

            <option>Yes</option>

            <option>No</option>
          </select>
          </div>

          <select
            name="elderlyRelatives"
            aria-label="Are you responsible for elderly relatives?"
            className="w-full p-4 border rounded-xl"
          >
            <option>
              Are You Currently Responsible For Elderly Relatives?
            </option>

            <option>Yes</option>

            <option>No</option>
          </select>

          <textarea
            name="specialNeedsDetail"
            aria-label="Describe the special needs or challenges"
            
            rows={4}
            placeholder="If Yes, Please Describe The Special Needs, Medical Conditions Or Challenges"
            className="w-full p-4 border rounded-xl md:col-span-2"
          />
        </div>
      </div>
    </div>
  );
}
