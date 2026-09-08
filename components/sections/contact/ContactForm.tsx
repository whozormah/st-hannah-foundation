"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const REASONS = [
  "General Enquiry",
  "Volunteer Application",
  "Partnership Request",
  "Donation Enquiry",
  "Support Request",
  "Media Enquiry",
  "Corporate Partnership",
  "Other",
];

const fieldClass =
  "w-full rounded-2xl border border-gray-200 bg-cream p-4 transition focus:border-brand focus:bg-white";

export default function ContactForm() {
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[32px] border border-gray-100 bg-white p-10 text-center shadow-xl">
        <CheckCircle2 size={64} className="text-green-600" aria-hidden />

        <h2 className="mt-8 text-3xl font-bold text-ink">
          Your Message Is On Its Way
        </h2>

        <p className="mt-5 max-w-md text-lg leading-9 text-gray-700">
          Thank you for getting in touch. We reply to most enquiries within 24
          to 48 business hours.
        </p>

        <p className="mt-8 rounded-xl bg-cream px-6 py-4 font-semibold text-brand">
          Reference {reference}
        </p>

        <button
          onClick={() => setStatus("idle")}
          className="mt-8 font-semibold text-brand underline underline-offset-4"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-[32px] border border-gray-100 bg-white p-8 shadow-xl lg:p-10">
      <h2 className="text-3xl font-bold leading-tight text-ink md:text-4xl">
        Send us a message
      </h2>

      <p className="mt-4 text-lg leading-9 text-gray-700">
        Tell us how we can help and we&apos;ll connect you with the right member
        of our team.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="mb-2 block font-semibold">
              Full name
            </label>

            <input
              id="contact-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              className={fieldClass}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="mb-2 block font-semibold">
              Email address
            </label>

            <input
              id="contact-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              className={fieldClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="contact-reason" className="mb-2 block font-semibold">
            Reason for contact
          </label>

          <select
            id="contact-reason"
            name="enquiry"
            defaultValue={REASONS[0]}
            className={fieldClass}
          >
            {REASONS.map((reason) => (
              <option key={reason}>{reason}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="contact-subject" className="mb-2 block font-semibold">
            Subject
          </label>

          <input
            id="contact-subject"
            type="text"
            name="subject"
            required
            placeholder="How can we help?"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="contact-message" className="mb-2 block font-semibold">
            Your message
          </label>

          <textarea
            id="contact-message"
            rows={7}
            name="message"
            required
            className={fieldClass}
          />
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
          className="group inline-flex items-center gap-3 rounded-full bg-brand px-9 py-4 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-brand-dark hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          <ArrowRight
            size={18}
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-2"
          />
        </button>
      </form>
    </div>
  );
}
