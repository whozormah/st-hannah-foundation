export default function Step2ResidentialInfo() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">Residential Information </h3>
      <p className="text-gray-700 mb-8">
        Help us understand your living environment and location. This
        information assists our team in assessing applications and planning
        possible support interventions.
      </p>
      <div className="space-y-6">
        <input
          type="text"
          name="address"
            placeholder="Residential Address"
          className="w-full p-4 border rounded-xl"
        />

        <div className="grid md:grid-cols-2 gap-6">
          <input
            type="text"
            name="state"
            placeholder="State"
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            name="lga"
            placeholder="Local Government Area (LGA)"
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            name="landmark"
            placeholder="Nearest Landmark"
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            name="durationAtAddress"
            placeholder="How Long Have You Lived Here?"
            className="w-full p-4 border rounded-xl"
          />
        </div>

        <select name="housingStatus" className="w-full p-4 border rounded-xl">
          <option value="">Housing Status</option>

          <option>Owner Occupier</option>

          <option>Tenant</option>

          <option>Living With Family</option>

          <option>Temporary Accommodation</option>

          <option>Other</option>
        </select>

        <textarea
          rows={4}
          name="livingConditions"
            placeholder="Briefly Describe Your Current Living Conditions"
          className="w-full p-4 border rounded-xl"
        />

        <textarea
          rows={4}
          name="housingChallenges"
            placeholder="Are there any housing, safety or environmental challenges affecting your household?"
          className="w-full p-4 border rounded-xl"
        />
      </div>
    </div>
  );
}
