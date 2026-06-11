import Link from "next/link";

export default function TeamCTA() {
  return (
    <section className="py-28 bg-[#844204] text-white">
      <div className="container-custom text-center">
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          Join Our Team
        </span>

        <h2 className="text-5xl font-bold mt-6">Become Part Of The Mission</h2>

        <p className="max-w-3xl mx-auto mt-8 text-lg leading-8">
          We believe meaningful change happens when passionate people come
          together to serve others. Join us as a volunteer, partner or
          supporter.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
          <Link
            href="/volunteer"
            className="bg-white text-[#844204] px-8 py-4 rounded-xl font-semibold"
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
