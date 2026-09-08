"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export default function DonationSuccessPage() {
  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const reference = params.get("reference");

      if (!reference) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/paystack/verify", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ reference }),
        });

        const data = await response.json();

        if (data.success && data.payment.status === "success") {
          setVerified(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-brand/20 border-t-[#844204] rounded-full animate-spin mx-auto" />

          <h2 className="mt-6 text-2xl font-bold text-brand">
            Verifying Your Donation...
          </h2>

          <p className="mt-2 text-gray-700">
            Please wait while we confirm your payment.
          </p>
        </div>
      </section>
    );
  }

  if (!verified) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-cream px-6">
        <div className="bg-white rounded-[32px] shadow-xl p-10 max-w-xl w-full text-center">
          <h1 className="text-4xl font-bold text-brand">
            Payment Verification Failed
          </h1>

          <p className="mt-6 text-gray-700 leading-8">
            We couldn&apos;t verify your donation at this time. If your account has
            been debited, please contact the Foundation and we&apos;ll gladly assist
            you.
          </p>

          <Link
            href="/contact"
            className="inline-block mt-8 bg-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-dark transition"
          >
            Contact Us
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-cream flex items-center justify-center px-6 py-24">
      <div className="bg-white rounded-[36px] shadow-2xl max-w-3xl w-full p-12 text-center">
        <CheckCircle2 size={90} className="mx-auto text-green-600" />

        <span className="uppercase tracking-[5px] text-brand font-semibold block mt-8">
          Donation Successful
        </span>

        <h1 className="text-5xl font-bold mt-4 leading-tight">
          Thank You For
          <br />
          Your Generosity
        </h1>

        <p className="mt-8 text-lg text-gray-700 leading-8">
          Your generous contribution will help provide educational
          opportunities, empower widows, strengthen families, support medical
          outreach and restore hope to vulnerable communities.
        </p>

        <div className="bg-cream rounded-3xl p-8 mt-10">
          <h3 className="text-2xl font-bold text-brand">
            Because of You...
          </h3>

          <div className="grid md:grid-cols-2 gap-4 mt-8 text-left">
            <div>✓ Children receive educational support.</div>

            <div>✓ Widows are empowered.</div>

            <div>✓ Families receive assistance.</div>

            <div>✓ Communities experience hope.</div>

            <div>✓ Lives are transformed.</div>

            <div>✓ The mission continues.</div>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-left max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-brand">
              What happens next?
            </h3>

            <ul className="mt-4 space-y-3 text-gray-700 leading-7">
              <li>
                • A confirmation email has been sent to the email address you
                provided.
              </li>

              <li>• Your official donation receipt is ready for download.</li>

              <li>
                • Your contribution will directly support the Foundation&apos;s
                programmes and community initiatives.
              </li>

              <li>
                • We sincerely appreciate your partnership in transforming
                lives.
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <a
              href={`/donate/receipt/${
                new URLSearchParams(window.location.search).get("reference") ??
                ""
              }`}
              className="bg-brand text-white px-8 py-4 rounded-xl font-semibold hover:bg-brand-dark transition text-center"
            >
              Download Receipt
            </a>

            <Link
              href="/programs"
              className="border border-brand text-brand px-8 py-4 rounded-xl font-semibold hover:bg-brand hover:text-white transition text-center"
            >
              Explore Our Programmes
            </Link>

            <Link
              href="/"
              className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition text-center"
            >
              Return Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
