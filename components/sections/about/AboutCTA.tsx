import Link from "next/link";

export default function AboutCTA() {
  return (
    <section className="py-32 bg-[#844204] text-white">
      <div className="container-custom text-center">
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          Join The Mission
        </span>

        <h2 className="text-5xl md:text-6xl font-bold mt-6">
          Together We Can
          <br />
          Create Lasting Change
        </h2>

        <p className="max-w-3xl mx-auto mt-8 text-lg text-gray-200 leading-8">
          Join a growing movement committed to restoring dignity, empowering
          families and transforming communities through compassion, opportunity
          and service.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
          <Link
            href="/donate"
            className="bg-white text-[#844204] px-8 py-4 rounded-xl font-semibold"
          >
            Donate Today
          </Link>

          <Link
            href="/volunteer"
            className="border border-white px-8 py-4 rounded-xl font-semibold"
          >
            Become A Volunteer
          </Link>

          <Link
            href="/contact"
            className="border border-white px-8 py-4 rounded-xl font-semibold"
          >
            Partner With Us
          </Link>
        </div>
      </div>
    </section>
  );
}
