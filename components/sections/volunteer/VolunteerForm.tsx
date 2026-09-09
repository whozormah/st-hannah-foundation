"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const GENDER = ["Male", "Female"];

const QUALIFICATIONS = [
  "Secondary School",
  "Diploma",
  "HND",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Other",
];

const AREAS = [
  "Community Outreach",
  "Programs Associate",
  "Education Support",
  "Widow Empowerment Support",
  "Family Support",
  "Content Creation",
  "Social Media Management",
  "Photography & Videography",
  "Media & Communications",
  "Fundraising",
  "Partnerships & Sponsorship",
  "Administrative Support",
  "Technology Support",
  "Event Coordination",
  "Volunteer Coordination",
  "Monitoring & Evaluation",
];

const AVAILABILITY = [
  "Weekdays",
  "Weekends",
  "Flexible",
  "Remote Only",
  "Event Based",
  "Full Time Volunteer",
];

const COMMITMENT = [
  "1 - 3 Months",
  "3 - 6 Months",
  "6 - 12 Months",
  "1 Year Or More",
];

const field =
  "w-full rounded-xl border border-gray-200 bg-white p-4 transition focus:border-brand";

function Label({
  htmlFor,
  children,
  optional,
}: {
  htmlFor: string;
  children: React.ReactNode;
  optional?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block font-semibold">
      {children}
      {optional && (
        <span className="ml-1 font-normal text-gray-500">(optional)</span>
      )}
    </label>
  );
}

function Select({
  id,
  name,
  label,
  options,
  optional,
}: {
  id: string;
  name: string;
  label: string;
  options: string[];
  optional?: boolean;
}) {
  return (
    <div>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>

      <select id={id} name={name} defaultValue="" className={field}>
        <option value="">Please select</option>

        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </div>
  );
}

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
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError(
        "We could not reach the server. Please check your connection and try again.",
      );
      setStatus("idle");
    }
  };

  if (status === "sent") {
    return (
      <section id="volunteer-form" className="bg-cream py-14 md:py-24">
        <div className="container-custom max-w-3xl">
          <div className="rounded-[28px] bg-white p-8 text-center shadow-sm sm:p-12">
            <CheckCircle2 size={60} className="mx-auto text-green-600" aria-hidden />

            <h2 className="mt-7 text-3xl font-bold text-brand md:text-4xl">
              Thank you for stepping forward
            </h2>

            <p className="mt-5 text-lg leading-9 text-gray-700">
              Your application has been received. A member of our team will
              review it and contact you about the next steps.
            </p>

            <p className="mt-7 inline-block rounded-xl bg-cream px-6 py-4 font-semibold text-brand">
              Reference {reference}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="volunteer-form" className="bg-cream py-14 md:py-24">
      <div className="container-custom max-w-3xl">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            Apply Today
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            Volunteer application
          </h2>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            Tell us a little about yourself. Only your name, email and phone
            number are required — everything else helps us match you to the
            right opportunity.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-10 rounded-[28px] bg-white p-6 shadow-sm sm:p-9"
        >
          {/* Every control now has a real label. The form previously used
              placeholders alone, which vanish as soon as you type and give
              screen readers nothing to announce. */}
          <fieldset>
            <legend className="text-xl font-bold text-ink">
              Personal information
            </legend>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Label htmlFor="v-name">Full name</Label>

                <input
                  id="v-name"
                  type="text"
                  name="fullName"
                  required
                  autoComplete="name"
                  className={field}
                />
              </div>

              <Select
                id="v-gender"
                name="gender"
                label="Gender"
                options={GENDER}
                optional
              />

              <div>
                <Label htmlFor="v-dob" optional>
                  Date of birth
                </Label>

                <input
                  id="v-dob"
                  type="date"
                  name="dateOfBirth"
                  autoComplete="bday"
                  className={field}
                />
              </div>

              <div>
                <Label htmlFor="v-email">Email address</Label>

                <input
                  id="v-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  className={field}
                />
              </div>

              <div>
                <Label htmlFor="v-phone">Phone number</Label>

                <input
                  id="v-phone"
                  type="tel"
                  name="phone"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  className={field}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="v-whatsapp" optional>
                  WhatsApp number
                </Label>

                <input
                  id="v-whatsapp"
                  type="tel"
                  name="whatsapp"
                  inputMode="tel"
                  className={field}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xl font-bold text-ink">Background</legend>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div>
                <Label htmlFor="v-location" optional>
                  Location
                </Label>

                <input
                  id="v-location"
                  type="text"
                  name="location"
                  autoComplete="address-level2"
                  className={field}
                />
              </div>

              <div>
                <Label htmlFor="v-occupation" optional>
                  Occupation
                </Label>

                <input
                  id="v-occupation"
                  type="text"
                  name="occupation"
                  autoComplete="organization-title"
                  className={field}
                />
              </div>

              <Select
                id="v-qualification"
                name="qualification"
                label="Highest qualification"
                options={QUALIFICATIONS}
                optional
              />

              <div>
                <Label htmlFor="v-profession" optional>
                  Profession
                </Label>

                <input
                  id="v-profession"
                  type="text"
                  name="profession"
                  className={field}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xl font-bold text-ink">
              Skills and experience
            </legend>

            <div className="mt-6 space-y-5">
              <div>
                <Label htmlFor="v-skills" optional>
                  Skills, experience or areas of expertise
                </Label>

                <textarea
                  id="v-skills"
                  name="skills"
                  rows={4}
                  className={field}
                />
              </div>

              <Select
                id="v-before"
                name="volunteeredBefore"
                label="Have you volunteered before?"
                options={["Yes", "No"]}
                optional
              />

              <div>
                <Label htmlFor="v-previous" optional>
                  If yes, tell us about it
                </Label>

                <textarea
                  id="v-previous"
                  name="previousExperience"
                  rows={4}
                  className={field}
                />
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-xl font-bold text-ink">
              How you would like to help
            </legend>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <Select
                  id="v-area"
                  name="areaOfInterest"
                  label="Area of interest"
                  options={AREAS}
                  optional
                />
              </div>

              <Select
                id="v-availability"
                name="availability"
                label="Availability"
                options={AVAILABILITY}
                optional
              />

              <Select
                id="v-commitment"
                name="commitment"
                label="How long can you commit?"
                options={COMMITMENT}
                optional
              />

              <div className="md:col-span-2">
                <Label htmlFor="v-motivation" optional>
                  Why would you like to volunteer with us?
                </Label>

                <textarea
                  id="v-motivation"
                  name="motivation"
                  rows={5}
                  className={field}
                />
              </div>
            </div>
          </fieldset>

          <div className="rounded-2xl border border-accent/20 bg-cream p-5">
            <label className="flex items-start gap-4">
              <input
                type="checkbox"
                name="consent"
                required
                className="mt-1 h-5 w-5 shrink-0"
              />

              <span className="text-gray-700">
                I certify that the information provided is true and accurate,
                and I agree to be contacted about volunteering with St. Hannah
                Foundation.
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
            {status === "sending" ? "Sending…" : "Submit application"}
          </button>
        </form>
      </div>
    </section>
  );
}
