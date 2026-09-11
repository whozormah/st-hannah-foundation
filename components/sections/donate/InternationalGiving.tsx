import { Globe2 } from "lucide-react";

import InternationalGivingCard from "@/components/shared/InternationalGivingCard";

/* Kept compact and honest: nothing here suggests these currencies can be used
   today. When PayPal is approved the copy changes and the currency chips in
   the donation form become active, without redesigning the page. */
export default function InternationalGiving() {
  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <div className="grid items-center gap-10 rounded-[28px] border border-accent/20 bg-cream p-8 md:p-12 lg:grid-cols-[1fr_minmax(0,420px)]">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[4px] text-brand">
              <Globe2 size={16} aria-hidden />
              International Giving
            </span>

            <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
              Giving from outside Nigeria?
            </h2>

            <p className="mt-5 text-lg leading-9 text-gray-700">
              International giving in USD, GBP and EUR is being prepared and
              will be available soon.
            </p>
          </div>

          <InternationalGivingCard />
        </div>
      </div>
    </section>
  );
}
