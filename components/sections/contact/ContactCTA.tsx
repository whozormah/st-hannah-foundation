import Link from "next/link";
import { Heart, Users, Handshake, ArrowRight } from "lucide-react";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden bg-brand py-32 text-white">
      {/* Background Glow */}

      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-accent blur-3xl" />

        <div className="absolute -bottom-20 -right-20 h-96 w-96 rounded-full bg-accent blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Heading */}

        <div className="mx-auto max-w-5xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-accent">
            Join The Mission
          </span>

          <h2 className="mt-6 text-5xl font-bold leading-tight md:text-7xl">
            Together We Can
            <br />
            Transform More Lives
          </h2>

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-white/90">
            Every act of generosity creates hope for someone in need. Whether
            you choose to volunteer, donate or partner with us, your support
            helps restore dignity, strengthen families and create sustainable
            change across communities.
          </p>
        </div>

        {/* Action Cards */}

        <div className="mx-auto mt-20 grid max-w-6xl gap-8 md:grid-cols-3">
          <div className="rounded-[32px] bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/15">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
              <Heart size={38} />
            </div>

            <h3 className="mt-8 text-3xl font-bold">Donate</h3>

            <p className="mt-5 leading-8 text-white/80">
              Help fund education, widow empowerment, healthcare, family support
              and community development programmes.
            </p>
          </div>

          <div className="rounded-[32px] bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/15">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
              <Users size={38} />
            </div>

            <h3 className="mt-8 text-3xl font-bold">Volunteer</h3>

            <p className="mt-5 leading-8 text-white/80">
              Share your skills, time and passion to help us create meaningful
              and lasting impact.
            </p>
          </div>

          <div className="rounded-[32px] bg-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-white/15">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/10">
              <Handshake size={38} />
            </div>

            <h3 className="mt-8 text-3xl font-bold">Partner</h3>

            <p className="mt-5 leading-8 text-white/80">
              Collaborate with us as an individual, church, business or
              organisation to expand our impact.
            </p>
          </div>
        </div>

        {/* Buttons */}

        <div className="mt-20 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link
            href="/donate"
            className="group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-semibold text-brand transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
          >
            Donate Today
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>

          <Link
            href="/volunteer"
            className="group inline-flex items-center gap-3 rounded-full border border-white/30 px-10 py-5 font-semibold transition-all duration-300 hover:border-white hover:bg-white hover:text-brand"
          >
            Become A Volunteer
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-2"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
