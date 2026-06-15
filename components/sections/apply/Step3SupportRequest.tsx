export default function Step3SupportRequest() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">Support Request </h3>
      <p className="text-gray-600 mb-8">
        Help us understand the type of assistance you require and why this
        support is important at this time.
      </p>
      <div className="space-y-6">
        <select className="w-full p-4 border rounded-xl">
          <option>Type Of Support Needed</option>

          <option>Education Support</option>

          <option>Widows Support Program</option>

          <option>Family Support</option>

          <option>Financial Aid</option>

          <option>Medical Aid</option>

          <option>Support Our Men</option>

          <option>Equipment Support</option>

          <option>Other</option>
        </select>

        <select className="w-full p-4 border rounded-xl">
          <option>How Urgent Is Your Request?</option>

          <option>Emergency (Immediate Assistance Needed)</option>

          <option>High Priority (Within A Few Days)</option>

          <option>Moderate Priority</option>

          <option>General Assistance</option>
        </select>

        <select className="w-full p-4 border rounded-xl">
          <option>Have You Applied For Similar Support Elsewhere?</option>

          <option>Yes</option>

          <option>No</option>
        </select>

        <input
          type="text"
          placeholder="If Other, Please Describe The Support Needed"
          className="w-full p-4 border rounded-xl"
        />

        <textarea
          rows={4}
          placeholder="Briefly Explain The Type Of Support You Are Requesting"
          className="w-full p-4 border rounded-xl"
        />

        <textarea
          rows={5}
          placeholder="What specific challenge or need are you currently facing?"
          className="w-full p-4 border rounded-xl"
        />

        <textarea
          rows={4}
          placeholder="How will this support improve your situation?"
          className="w-full p-4 border rounded-xl"
        />
      </div>
    </div>
  );
}
