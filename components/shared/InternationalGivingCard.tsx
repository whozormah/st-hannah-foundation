"use client";

import { useState } from "react";
import { Globe2, Mail, Loader2, CheckCircle2 } from "lucide-react";

export default function InternationalGivingCard() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleNotifyMe = async () => {
    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/international-interest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="mt-8 rounded-[32px] border border-green-200 bg-green-50 p-6 sm:p-10 text-center">
        <CheckCircle2 size={60} className="mx-auto text-green-600" />

        <h3 className="mt-6 text-3xl font-bold text-green-700">
          You&apos;re On The List!
        </h3>

        <p className="mt-5 text-gray-700 leading-8 max-w-xl mx-auto">
          Thank you for your interest in supporting St. Hannah Foundation.
        </p>

        <p className="mt-3 text-gray-700 leading-8 max-w-xl mx-auto">
          We&apos;ll notify you as soon as international donations in
          <strong> USD, GBP and EUR </strong>
          become available.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-hidden rounded-[32px] border border-accent/20 bg-white shadow-sm">
      {/* Header */}

      <div className="bg-gradient-to-r from-brand to-[#A86A1F] px-8 py-8 text-white">
        <div className="flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/15">
            <Globe2 size={28} />
          </div>

          <div>
            <span className="text-sm font-semibold uppercase tracking-[4px] text-white/80">
              Coming Soon
            </span>

            <h3 className="mt-1 text-3xl font-bold">International Giving</h3>
          </div>
        </div>
      </div>

      {/* Body */}

      <div className="px-8 py-10">
        <p className="text-lg font-semibold text-ink leading-8">
          Thank you for your interest in supporting St. Hannah Foundation from
          anywhere in the world.
        </p>

        <p className="mt-5 text-gray-700 leading-8">
          International donations in{" "}
          <span className="font-semibold text-brand">US Dollar (USD),</span>{" "}
          <span className="font-semibold text-brand">
            British Pound (GBP)
          </span>{" "}
          and <span className="font-semibold text-brand">Euro (EUR)</span>{" "}
          will be available soon.
        </p>

        <p className="mt-5 text-gray-700 leading-8">
          Join our notification list and be among the first to know when
          international giving becomes available.
        </p>

        {/* Email */}

        <div className="mt-10">
          <label className="mb-3 block text-sm font-semibold uppercase tracking-wide text-brand">
            Stay Updated
          </label>

          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <Mail
                size={18}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full rounded-2xl border border-gray-200 py-4 pl-14 pr-5 outline-none transition focus:border-brand"
              />
            </div>

            <button
              onClick={handleNotifyMe}
              disabled={loading}
              className="flex items-center justify-center gap-2 rounded-2xl bg-brand px-8 py-4 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Joining...
                </>
              ) : (
                "Notify Me"
              )}
            </button>
          </div>

          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
        </div>

        {/* Supported Currencies */}

        <div className="mt-10 flex flex-wrap gap-3">
          <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-brand">
            🇺🇸 USD
          </span>

          <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-brand">
            🇬🇧 GBP
          </span>

          <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-brand">
            🇪🇺 EUR
          </span>
        </div>
      </div>
    </div>
  );
}
