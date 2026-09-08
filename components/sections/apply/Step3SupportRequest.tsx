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
        <select name="supportType" className="w-full p-4 border rounded-xl">
          <option value="">Type Of Support Needed</option>

          <option>Education Support</option>

          <option>Widows Support Program</option>

          <option>Family Support</option>

          <option>Financial Aid</option>

          <option>Medical Aid</option>

          <option>Support Our Men</option>

          <option>Equipment Support</option>

          <option>Other</option>
        </select>

        <select name="urgency" className="w-full p-4 border rounded-xl">
          <option value="">How Urgent Is Your Request?</option>

          <option>Emergency (Immediate Assistance Needed)</option>

          <option>High Priority (Within A Few Days)</option>

          <option>Moderate Priority</option>

          <option>General Assistance</option>
        </select>

        <select name="appliedElsewhere" className="w-full p-4 border rounded-xl">
          <option value="">Have You Applied For Similar Support Elsewhere?</option>

          <option>Yes</option>

          <option>No</option>
        </select>

        <input
          type="text"
          name="supportTypeOther"
            placeholder="If Other, Please Describe The Support Needed"
          className="w-full p-4 border rounded-xl"
        />

        <textarea
          rows={4}
          name="supportSummary"
            placeholder="Briefly Explain The Type Of Support You Are Requesting"
          className="w-full p-4 border rounded-xl"
        />

        <textarea
          rows={5}
          name="challenge"
            placeholder="What specific challenge or need are you currently facing?"
          className="w-full p-4 border rounded-xl"
        />

        <textarea
          rows={4}
          name="expectedImpact"
            placeholder="How will this support improve your situation?"
          className="w-full p-4 border rounded-xl"
        />
      </div>
    </div>
  );
}
