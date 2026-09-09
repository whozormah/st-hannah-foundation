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
        <div>
          <label htmlFor="apply-address" className="mb-2 block font-semibold">
            Residential Address
          </label>

          <input id="apply-address"
          type="text"
          name="address"
            placeholder="Residential Address"
          className="w-full p-4 border rounded-xl"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="apply-state" className="mb-2 block font-semibold">
              State
            </label>

            <input id="apply-state"
            type="text"
            name="state"
            placeholder="State"
            className="w-full p-4 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="apply-lga" className="mb-2 block font-semibold">
              Local Government Area (LGA)
            </label>

            <input id="apply-lga"
            type="text"
            name="lga"
            placeholder="Local Government Area (LGA)"
            className="w-full p-4 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="apply-landmark" className="mb-2 block font-semibold">
              Nearest Landmark
            </label>

            <input id="apply-landmark"
            type="text"
            name="landmark"
            placeholder="Nearest Landmark"
            className="w-full p-4 border rounded-xl"
            />
          </div>

          <div>
            <label htmlFor="apply-durationAtAddress" className="mb-2 block font-semibold">
              How Long Have You Lived Here?
            </label>

            <input id="apply-durationAtAddress"
            type="text"
            name="durationAtAddress"
            placeholder="How Long Have You Lived Here?"
            className="w-full p-4 border rounded-xl"
            />
          </div>
        </div>

        <div>
          <label htmlFor="apply-housingStatus" className="mb-2 block font-semibold">
            Housing Status
          </label>

          <select id="apply-housingStatus" name="housingStatus" className="w-full p-4 border rounded-xl">
          <option value="">Please select</option>

          <option>Owner Occupier</option>

          <option>Tenant</option>

          <option>Living With Family</option>

          <option>Temporary Accommodation</option>

          <option>Other</option>
        </select>
        </div>

        <div>
          <label htmlFor="apply-livingConditions" className="mb-2 block font-semibold">
            Briefly Describe Your Current Living Conditions
          </label>

          <textarea id="apply-livingConditions"
          rows={4}
          name="livingConditions"
            placeholder="Briefly Describe Your Current Living Conditions"
          className="w-full p-4 border rounded-xl"
          />
        </div>

        <div>
          <label htmlFor="apply-housingChallenges" className="mb-2 block font-semibold">
            Are there any housing, safety or environmental challenges affecting your household?
          </label>

          <textarea id="apply-housingChallenges"
          rows={4}
          name="housingChallenges"
            placeholder="Are there any housing, safety or environmental challenges affecting your household?"
          className="w-full p-4 border rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}
