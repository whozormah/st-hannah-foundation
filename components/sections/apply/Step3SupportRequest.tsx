export default function Step3SupportRequest() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">Support Request </h3>
      <p className="text-gray-700 mb-8">
        Help us understand the type of assistance you require and why this
        support is important at this time.
      </p>
      <div className="space-y-6">
        <div>
          <label htmlFor="apply-supportType" className="mb-2 block font-semibold">
            Type Of Support Needed
          </label>

          <select id="apply-supportType" name="supportType" className="w-full p-4 border rounded-xl">
          <option value="">Please select</option>

          <option>Education Support</option>

          <option>Widows Support Program</option>

          <option>Family Support</option>

          <option>Financial Aid</option>

          <option>Medical Aid</option>

          <option>Support Our Men</option>

          <option>Equipment Support</option>

          <option>Other</option>
        </select>
        </div>

        <div>
          <label htmlFor="apply-urgency" className="mb-2 block font-semibold">
            How Urgent Is Your Request?
          </label>

          <select id="apply-urgency" name="urgency" className="w-full p-4 border rounded-xl">
          <option value="">Please select</option>

          <option>Emergency (Immediate Assistance Needed)</option>

          <option>High Priority (Within A Few Days)</option>

          <option>Moderate Priority</option>

          <option>General Assistance</option>
        </select>
        </div>

        <div>
          <label htmlFor="apply-appliedElsewhere" className="mb-2 block font-semibold">
            Have You Applied For Similar Support Elsewhere?
          </label>

          <select id="apply-appliedElsewhere" name="appliedElsewhere" className="w-full p-4 border rounded-xl">
          <option value="">Please select</option>

          <option>Yes</option>

          <option>No</option>
        </select>
        </div>

        <div>
          <label htmlFor="apply-supportTypeOther" className="mb-2 block font-semibold">
            If Other, Please Describe The Support Needed
          </label>

          <input id="apply-supportTypeOther"
          type="text"
          name="supportTypeOther"
            placeholder="If Other, Please Describe The Support Needed"
          className="w-full p-4 border rounded-xl"
          />
        </div>

        <div>
          <label htmlFor="apply-supportSummary" className="mb-2 block font-semibold">
            Briefly Explain The Type Of Support You Are Requesting
          </label>

          <textarea id="apply-supportSummary"
          rows={4}
          name="supportSummary"
            placeholder="Briefly Explain The Type Of Support You Are Requesting"
          className="w-full p-4 border rounded-xl"
          />
        </div>

        <div>
          <label htmlFor="apply-challenge" className="mb-2 block font-semibold">
            What specific challenge or need are you currently facing?
          </label>

          <textarea id="apply-challenge"
          rows={5}
          name="challenge"
            placeholder="What specific challenge or need are you currently facing?"
          className="w-full p-4 border rounded-xl"
          />
        </div>

        <div>
          <label htmlFor="apply-expectedImpact" className="mb-2 block font-semibold">
            How will this support improve your situation?
          </label>

          <textarea id="apply-expectedImpact"
          rows={4}
          name="expectedImpact"
            placeholder="How will this support improve your situation?"
          className="w-full p-4 border rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
