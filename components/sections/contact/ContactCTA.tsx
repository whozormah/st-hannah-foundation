import Link from "next/link";

export default function ContactCTA() {
  return (
    <section className="py-28 bg-[#844204] text-white">
      <div className="container-custom text-center">
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          Join The Mission
        </span>

        <h2 className="text-5xl font-bold mt-6">
          Together We Can Transform Lives
        </h2>

        <p className="max-w-3xl mx-auto mt-8 text-lg leading-8">
          Whether through volunteering, donating or partnering with us, your
          support helps create lasting impact in communities.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
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
        </div>
      </div>
    </section>
  );
}
