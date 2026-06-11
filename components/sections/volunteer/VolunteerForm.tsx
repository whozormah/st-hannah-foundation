export default function VolunteerForm() {
  return (
    <section className="py-24 bg-[#FAF7F2]">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Apply Today
          </span>

          <h2 className="text-5xl font-bold mt-4">Volunteer Application</h2>
        </div>

        <form className="bg-white p-10 rounded-[32px] shadow-sm space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="First Name"
              className="w-full p-4 border rounded-xl"
            />

            <input
              type="text"
              placeholder="Other Name"
              className="w-full p-4 border rounded-xl"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-4 border rounded-xl"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-4 border rounded-xl"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <select className="w-full p-4 border rounded-xl">
              <option>Gender</option>
              <option>Male</option>
              <option>Female</option>
            </select>

            <input
              type="text"
              placeholder="Location"
              className="w-full p-4 border rounded-xl"
            />
          </div>

          <input
            type="text"
            placeholder="Occupation"
            className="w-full p-4 border rounded-xl"
          />

          <input
            type="text"
            placeholder="Profession / Skillset"
            className="w-full p-4 border rounded-xl"
          />

          <select className="w-full p-4 border rounded-xl">
            <option>Area Of Interest</option>

            <option>Community Outreach</option>
            <option>Programs Associate</option>
            <option>Education Support</option>
            <option>Widow Empowerment Support</option>
            <option>Family Support</option>
            <option>Content Creation</option>
            <option>Social Media Management</option>
            <option>Photography & Videography</option>
            <option>Media & Communications</option>
            <option>Fundraising</option>
            <option>Partnerships & Sponsorship</option>
            <option>Administrative Support</option>
            <option>Technology Support</option>
            <option>Event Coordination</option>
            <option>Volunteer Coordination</option>
            <option>Monitoring & Evaluation</option>
          </select>

          <select className="w-full p-4 border rounded-xl">
            <option>Availability</option>
            <option>Weekdays</option>
            <option>Weekends</option>
            <option>Flexible</option>
            <option>Remote Only</option>
            <option>Event Based</option>
            <option>Full Time Volunteer</option>
          </select>

          <textarea
            rows={6}
            placeholder="Why would you like to volunteer?"
            className="w-full p-4 border rounded-xl"
          />

          <button
            type="submit"
            className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold"
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}
