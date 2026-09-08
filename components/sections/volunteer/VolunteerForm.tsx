"use client";

import { useState } from "react";

export default function VolunteerForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");
  const [reference, setReference] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("sending");
    setError("");

    try {
      const response = await fetch("/api/volunteer-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, consent: data.consent ? "Yes" : "No" }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.message ?? "Something went wrong. Please try again.");
        setStatus("idle");

        return;
      }

      setReference(result.reference);
      setStatus("sent");
      form.reset();
    } catch {
      setError(
        "We could not reach the server. Please check your connection and try again.",
      );
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <section id="volunteer-form" className="py-24 bg-cream">
        <div className="container-custom max-w-3xl">
          <div className="rounded-[32px] bg-white p-12 text-center shadow-sm">
            <h2 className="text-4xl font-bold text-brand">
              Thank You For Stepping Forward
            </h2>

            <p className="mt-6 text-lg leading-9 text-gray-700">
              Your volunteer application has been received. A member of our team
              will review it and contact you about the next steps.
            </p>

            <p className="mt-8 rounded-xl bg-cream px-6 py-4 font-semibold text-brand">
              Reference {reference}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="volunteer-form" className="py-24 bg-cream">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-16">
          <span className="uppercase tracking-[5px] text-brand font-semibold">
            Apply Today
          </span>

          <h2 className="text-5xl font-bold mt-4">Volunteer Application</h2>
          <p className="max-w-3xl mx-auto mt-6 text-gray-700 leading-8">
            Join our growing network of volunteers and help us create meaningful
            impact in communities through education, empowerment, outreach and
            support programs.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-10 rounded-[32px] shadow-sm space-y-8"
        >
          {/* Personal Information */}

          <div>
            <h3 className="text-2xl font-bold mb-6">Personal Information</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full p-4 border rounded-xl md:col-span-2"
              />

              <select name="gender" className="w-full p-4 border rounded-xl">
                <option value="">Gender</option>

                <option>Male</option>

                <option>Female</option>
              </select>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Date Of Birth
                </label>

                <input
                  type="date"
                  name="dateOfBirth"
                  className="w-full p-4 border rounded-xl"
                />
              </div>

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full p-4 border rounded-xl"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                className="w-full p-4 border rounded-xl"
              />

              <input
                type="tel"
                name="whatsapp"
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
                name="location"
                placeholder="Location"
                className="w-full p-4 border rounded-xl"
              />

              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                className="w-full p-4 border rounded-xl"
              />

              <select name="qualification" className="w-full p-4 border rounded-xl">
                <option value="">Highest Educational Qualification</option>

                <option>Secondary School</option>

                <option>Diploma</option>

                <option>HND</option>

                <option>Bachelor&apos;s Degree</option>

                <option>Master&apos;s Degree</option>

                <option>Doctorate</option>

                <option>Other</option>
              </select>

              <input
                type="text"
                name="profession"
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
              name="skills"
                placeholder="Skills, Experience, Certifications Or Areas Of Expertise"
              className="w-full p-4 border rounded-xl"
            />

            <div className="mt-6">
              <select name="volunteeredBefore" className="w-full p-4 border rounded-xl">
                <option value="">Have You Volunteered Before?</option>

                <option>Yes</option>

                <option>No</option>
              </select>
            </div>

            <textarea
              rows={4}
              name="previousExperience"
                placeholder="If Yes, Tell Us About Your Previous Volunteer Experience"
              className="w-full p-4 border rounded-xl mt-6"
            />
          </div>

          {/* Volunteer Interest */}

          <div>
            <h3 className="text-2xl font-bold mb-6">Volunteer Interest</h3>

            <select name="areaOfInterest" className="w-full p-4 border rounded-xl">
              <option value="">Area Of Interest</option>

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
              <select name="availability" className="w-full p-4 border rounded-xl">
                <option value="">Availability</option>

                <option>Weekdays</option>

                <option>Weekends</option>

                <option>Flexible</option>

                <option>Remote Only</option>

                <option>Event Based</option>

                <option>Full Time Volunteer</option>
              </select>

              <select name="commitment" className="w-full p-4 border rounded-xl">
                <option value="">How Long Can You Commit?</option>

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
              name="motivation"
                placeholder="Tell us why you would like to volunteer with St. Hannah Foundation and how you believe you can contribute to our mission."
              className="w-full p-4 border rounded-xl"
            />
          </div>

          {/* Consent */}

          <div className="bg-cream border rounded-2xl p-6">
            <label className="flex items-start gap-4">
              <input type="checkbox" name="consent" required className="mt-1" />

              <span className="text-gray-700">
                I certify that the information provided is true and accurate and
                I agree to be contacted regarding volunteer opportunities with
                St. Hannah Foundation.
              </span>
            </label>
          </div>

          {error && (
            <p
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 px-5 py-4 text-red-700"
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className="w-full rounded-xl bg-brand py-5 text-lg font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Volunteer With Us"}
          </button>
        </form>
      </div>
    </section>
  );
}
