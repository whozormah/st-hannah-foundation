export default function VolunteerForm() {
  return (
    <section id="volunteer-form" className="py-24 bg-[#FAF7F2]">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Apply Today
          </span>

          <h2 className="text-5xl font-bold mt-4">Volunteer Application</h2>
          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Join our growing network of volunteers and help us create meaningful
            impact in communities through education, empowerment, outreach and
            support programs.
          </p>
        </div>

        <form className="bg-white p-10 rounded-[32px] shadow-sm space-y-8">
          {/* Personal Information */}

          <div>
            <h3 className="text-2xl font-bold mb-6">Personal Information</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full p-4 border rounded-xl md:col-span-2"
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
                type="email"
                placeholder="Email Address"
                className="w-full p-4 border rounded-xl"
              />

              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-4 border rounded-xl"
              />

              <input
                type="tel"
                placeholder="WhatsApp Number"
                className="w-full p-4 border rounded-xl md:col-span-2"
              />
            </div>
          </div>

          {/* Location & Background */}

          <div>
            <h3 className="text-2xl font-bold mb-6">Background Information</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Location"
                className="w-full p-4 border rounded-xl"
              />

              <input
                type="text"
                placeholder="Occupation"
                className="w-full p-4 border rounded-xl"
              />

              <select className="w-full p-4 border rounded-xl">
                <option>Highest Educational Qualification</option>

                <option>Secondary School</option>

                <option>Diploma</option>

                <option>HND</option>

                <option>Bachelor's Degree</option>

                <option>Master's Degree</option>

                <option>Doctorate</option>

                <option>Other</option>
              </select>

              <input
                type="text"
                placeholder="Profession"
                className="w-full p-4 border rounded-xl"
              />
            </div>
          </div>

          {/* Skills */}

          <div>
            <h3 className="text-2xl font-bold mb-6">Skills & Experience</h3>

            <textarea
              rows={5}
              placeholder="Skills, Experience, Certifications Or Areas Of Expertise"
              className="w-full p-4 border rounded-xl"
            />

            <div className="mt-6">
              <select className="w-full p-4 border rounded-xl">
                <option>Have You Volunteered Before?</option>

                <option>Yes</option>

                <option>No</option>
              </select>
            </div>

            <textarea
              rows={4}
              placeholder="If Yes, Tell Us About Your Previous Volunteer Experience"
              className="w-full p-4 border rounded-xl mt-6"
            />
          </div>

          {/* Volunteer Interest */}

          <div>
            <h3 className="text-2xl font-bold mb-6">Volunteer Interest</h3>

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

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <select className="w-full p-4 border rounded-xl">
                <option>Availability</option>

                <option>Weekdays</option>

                <option>Weekends</option>

                <option>Flexible</option>

                <option>Remote Only</option>

                <option>Event Based</option>

                <option>Full Time Volunteer</option>
              </select>

              <select className="w-full p-4 border rounded-xl">
                <option>How Long Can You Commit?</option>

                <option>1 - 3 Months</option>

                <option>3 - 6 Months</option>

                <option>6 - 12 Months</option>

                <option>1 Year Or More</option>
              </select>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h3 className="text-2xl font-bold mb-6">Volunteer Photograph</h3>

            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              className="w-full p-4 border rounded-xl bg-white"
            />

            <p className="text-sm text-gray-500 mt-3">
              Upload a recent passport photograph.
            </p>
          </div>
          {/* Motivation */}

          <div>
            <h3 className="text-2xl font-bold mb-6">Motivation</h3>

            <textarea
              rows={6}
              placeholder="Tell us why you would like to volunteer with St. Hannah Foundation and how you believe you can contribute to our mission."
              className="w-full p-4 border rounded-xl"
            />
          </div>

          {/* Consent */}

          <div className="bg-[#FAF7F2] border rounded-2xl p-6">
            <label className="flex items-start gap-4">
              <input type="checkbox" className="mt-1" />

              <span className="text-gray-700">
                I certify that the information provided is true and accurate and
                I agree to be contacted regarding volunteer opportunities with
                St. Hannah Foundation.
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#844204] text-white py-5 rounded-xl font-semibold text-lg hover:bg-[#6d3503] transition"
          >
            Volunteer With Us
          </button>
        </form>
      </div>
    </section>
  );
}
