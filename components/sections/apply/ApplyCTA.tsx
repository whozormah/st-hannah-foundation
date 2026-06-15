import Link from "next/link";

export default function ApplyCTA() {
  return (
    <section className="py-32 bg-[#844204] text-white">
      {" "}
      <div className="container-custom text-center max-w-5xl">
        {" "}
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          We're Here To Help{" "}
        </span>
        <h2 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
          Every Story Matters.
          <br />
          Every Application Matters.
        </h2>
        <p className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-gray-200">
          We understand that reaching out for support can be difficult. Every
          application received is reviewed with care, dignity and compassion by
          our team. Where possible, we work to connect individuals and families
          with meaningful opportunities, resources and support.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Link
            href="/contact"
            className="bg-white text-[#844204] px-8 py-4 rounded-xl font-semibold hover:scale-105 transition"
          >
            Contact Our Team
          </Link>

          <Link
            href="/programs"
            className="border border-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-[#844204] transition"
          >
            Explore Our Programmes
          </Link>
        </div>
      </div>
    </section>
  );
}
