"use client";

import { useState } from "react";
import { Mail, Loader2, CheckCircle2 } from "lucide-react";

/* Just the notify-me capture. The heading, explanation and currencies live in
   the section that wraps this, so they are not repeated here. The request
   itself is unchanged: it still posts to /api/international-interest. */
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
      <div
        role="status"
        className="rounded-[22px] border border-green-200 bg-green-50 p-7 text-center"
      >
        <CheckCircle2 size={40} className="mx-auto text-green-600" aria-hidden />

        <p className="mt-4 font-bold text-green-800">You&apos;re on the list</p>

        <p className="mt-2 leading-8 text-gray-700">
          We&apos;ll email you the moment giving in USD, GBP and EUR opens.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] bg-white p-7 shadow-sm">
      <label
        htmlFor="international-email"
        className="block font-semibold text-ink"
      >
        Notify me when it opens
      </label>

      <div className="relative mt-4">
        <Mail
          size={18}
          aria-hidden
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          id="international-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Your email address"
          className="w-full rounded-xl border border-gray-200 py-4 pl-12 pr-4 transition focus:border-brand"
        />
      </div>

      <button
        onClick={handleNotifyMe}
        disabled={loading}
        className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 py-4 font-semibold text-white transition hover:bg-brand-dark disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? (
          <>
            <Loader2 size={18} className="animate-spin" aria-hidden />
            Joining…
          </>
        ) : (
          "Notify Me"
        )}
      </button>

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
