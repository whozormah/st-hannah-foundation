export default function Step1PersonalInfo() {
  return (
    <div>
      {" "}
      <h3 className="text-3xl font-bold mb-3">Personal Information </h3>
      <p className="text-gray-600 mb-8">
        Tell us a little about yourself so we can properly assess your
        application and contact you regarding your request.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-4 border rounded-xl"
        />

        <select className="w-full p-4 border rounded-xl">
          <option>Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <div>
          <label className="block text-sm font-medium mb-2">
            Date Of Birth
          </label>

          <input type="date" className="w-full p-4 border rounded-xl" />
        </div>

        <input
          type="text"
          placeholder="Nationality"
          className="w-full p-4 border rounded-xl"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full p-4 border rounded-xl"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="w-full p-4 border rounded-xl"
        />

        <select className="w-full p-4 border rounded-xl">
          <option>Preferred Contact Method</option>
          <option>Phone Call</option>
          <option>WhatsApp</option>
          <option>Email</option>
        </select>

        <select className="w-full p-4 border rounded-xl">
          <option>How Did You Hear About St. Hannah Foundation?</option>
          <option>Friend / Family</option>
          <option>Church</option>
          <option>Community Leader</option>
          <option>Social Media</option>
          <option>Website</option>
          <option>Previous Beneficiary</option>
          <option>Other</option>
        </select>

        <input
          type="text"
          placeholder="National ID Number (Optional)"
          className="w-full p-4 border rounded-xl md:col-span-2"
        />
      </div>
    </div>
  );
}
