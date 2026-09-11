"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Gift, HandHeart, Handshake } from "lucide-react";

import InKindDonationModal from "@/components/shared/in-kind/InKindDonationModal";

export default function OtherWaysToSupport() {
  const [isInKindOpen, setIsInKindOpen] = useState(false);

  return (
    <>
      <section className="bg-cream py-14 md:py-24">
        <div className="container-custom">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
              Other Ways To Support
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              There is more than one way to give.
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {/* In kind opens the existing multi-step modal rather than
                repeating the whole in-kind page here. */}
            <article className="flex h-full flex-col rounded-[24px] border border-accent/15 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-warm text-brand"
              >
                <Gift size={26} />
              </span>

              <h3 className="mt-7 text-xl font-bold text-ink">Give In Kind</h3>

              <p className="mt-4 flex-1 leading-8 text-gray-700">
                Support with useful items such as educational materials, food,
                clothing, medical supplies and other essentials.
              </p>

              <button
                onClick={() => setIsInKindOpen(true)}
                className="group mt-7 inline-flex w-fit items-center gap-2 font-semibold text-brand"
              >
                Give In Kind
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </article>

            <article className="flex h-full flex-col rounded-[24px] border border-accent/15 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-warm text-brand"
              >
                <HandHeart size={26} />
              </span>

              <h3 className="mt-7 text-xl font-bold text-ink">Volunteer</h3>

              <p className="mt-4 flex-1 leading-8 text-gray-700">
                Give your time, skills and experience to support the work of St.
                Hannah Foundation.
              </p>

              <Link
                href="/volunteer"
                className="group mt-7 inline-flex w-fit items-center gap-2 font-semibold text-brand"
              >
                Become a Volunteer
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </article>

            <article className="flex h-full flex-col rounded-[24px] border border-accent/15 bg-white p-8 shadow-sm transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
              <span
                aria-hidden
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cream-warm text-brand"
              >
                <Handshake size={26} />
              </span>

              <h3 className="mt-7 text-xl font-bold text-ink">
                Partner With Us
              </h3>

              <p className="mt-4 flex-1 leading-8 text-gray-700">
                Support through sponsorship, CSR, strategic partnerships and
                community initiatives.
              </p>

              <Link
                href="/partnerships"
                className="group mt-7 inline-flex w-fit items-center gap-2 font-semibold text-brand"
              >
                Partner With Us
                <ArrowRight
                  size={16}
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </article>
          </div>
        </div>
      </section>

      <InKindDonationModal
        isOpen={isInKindOpen}
        onClose={() => setIsInKindOpen(false)}
      />
    </>
  );
}
