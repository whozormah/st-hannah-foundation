import Link from "next/link";

export default function DonateCTA() {
  return (
    <section className="py-32 bg-[#844204] text-white">
      {" "}
      <div className="container-custom max-w-6xl text-center">
        {" "}
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          Your Generosity Matters{" "}
        </span>
        <h2 className="text-5xl md:text-7xl font-bold mt-6 leading-tight">
          Together We Can
          <br />
          Restore Hope.
          <br />
          Transform Lives.
        </h2>
        <p className="max-w-4xl mx-auto mt-8 text-lg leading-8 text-gray-200">
          Every donation helps create opportunities, empower widows, support
          families, sponsor education, strengthen livelihoods and bring hope to
          communities in need. Your generosity is more than a gift — it is an
          investment in lasting impact.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Link
            href="#donation-form"
            className="bg-white text-[#844204] rounded-[24px] p-8 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">Donate Now</h3>

            <p className="mt-3 text-gray-600 leading-7">
              Support our programmes and help transform lives through your
              financial contribution.
            </p>
          </Link>

          <Link
            href="/volunteer"
            className="bg-white text-[#844204] rounded-[24px] p-8 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">Volunteer</h3>

            <p className="mt-3 text-gray-600 leading-7">
              Give your time, skills and expertise to support our mission and
              create meaningful change.
            </p>
          </Link>

          <Link
            href="/contact"
            className="bg-white text-[#844204] rounded-[24px] p-8 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">Contact Us</h3>

            <p className="mt-3 text-gray-600 leading-7">
              Speak with our team about donations, partnerships and other ways
              to support our work.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
