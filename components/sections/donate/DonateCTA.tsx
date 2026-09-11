import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function DonateCTA() {
  return (
    <section className="bg-brand py-14 text-white md:py-24">
      <div className="container-custom max-w-3xl text-center">
        <span className="text-sm font-semibold uppercase tracking-[4px] text-accent">
          Your Generosity Matters
        </span>

        <h2 className="mt-5 text-3xl font-bold leading-tight md:text-5xl">
          Together, we can restore hope.
        </h2>

        <p className="mt-6 text-lg leading-9 text-white/85">
          Every gift can help create opportunity and strengthen lives.
        </p>

        <Link
          href="#give"
          className="group mt-10 inline-flex items-center gap-3 rounded-full bg-white px-9 py-4 font-semibold text-brand transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
        >
          Give Now
          <ArrowRight
            size={18}
            aria-hidden
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}
