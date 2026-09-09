export default function Step1PersonalInfo() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">Personal Information </h3>
      <p className="text-gray-700 mb-8">
        Tell us a little about yourself so we can properly assess your
        application and contact you regarding your request.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="apply-fullName" className="mb-2 block font-semibold">
            Full Name
          </label>

          <input id="apply-fullName"
          type="text"
          name="fullName"
            placeholder="Full Name"
          className="w-full p-4 border rounded-xl"
          />
        </div>

        <div>
          <label htmlFor="apply-gender" className="mb-2 block font-semibold">
            Gender
          </label>

          <select id="apply-gender" name="gender" className="w-full p-4 border rounded-xl">
          <option value="">Please select</option>
          <option>Male</option>
          <option>Female</option>
        </select>
        </div>

        <div>
          <label
            htmlFor="apply-dateOfBirth"
            className="mb-2 block font-semibold"
          >
            Date Of Birth
          </label>

          <input
            id="apply-dateOfBirth"
            type="date"
            name="dateOfBirth"
            className="w-full p-4 border rounded-xl"
          />
        </div>

        <div>
          <label htmlFor="apply-nationality" className="mb-2 block font-semibold">
            Nationality
          </label>

          <input id="apply-nationality"
          type="text"
          name="nationality"
            placeholder="Nationality"
          className="w-full p-4 border rounded-xl"
          />
        </div>

        <div>
          <label htmlFor="apply-phone" className="mb-2 block font-semibold">
            Phone Number
          </label>

          <input id="apply-phone"
          type="tel"
          name="phone"
            placeholder="Phone Number"
          className="w-full p-4 border rounded-xl"
          />
        </div>

        <div>
          <label htmlFor="apply-email" className="mb-2 block font-semibold">
            Email Address
          </label>

          <input id="apply-email"
          type="email"
          name="email"
            placeholder="Email Address"
          className="w-full p-4 border rounded-xl"
          />
        </div>

        <div>
          <label htmlFor="apply-contactMethod" className="mb-2 block font-semibold">
            Preferred Contact Method
          </label>

          <select id="apply-contactMethod" name="contactMethod" className="w-full p-4 border rounded-xl">
          <option value="">Please select</option>
          <option>Phone Call</option>
          <option>WhatsApp</option>
          <option>Email</option>
        </select>
        </div>

        <div>
          <label htmlFor="apply-referralSource" className="mb-2 block font-semibold">
            How Did You Hear About St. Hannah Foundation?
          </label>

          <select id="apply-referralSource" name="referralSource" className="w-full p-4 border rounded-xl">
          <option value="">Please select</option>
          <option>Friend / Family</option>
          <option>Church</option>
          <option>Community Leader</option>
          <option>Social Media</option>
          <option>Website</option>
          <option>Previous Beneficiary</option>
          <option>Other</option>
        </select>
        </div>

        <div>
          <label htmlFor="apply-nationalId" className="mb-2 block font-semibold">
            National ID Number (Optional)
          </label>

          <input id="apply-nationalId"
          type="text"
          name="nationalId"
            placeholder="National ID Number (Optional)"
          className="w-full p-4 border rounded-xl md:col-span-2"
          />
        </div>
      </div>
    </div>
  );
}
