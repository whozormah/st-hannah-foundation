import Link from "next/link";

export default function GalleryCTA() {
  return (
    <section className="py-28 bg-[#844204] text-white">
      <div className="container-custom text-center">
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          Join The Mission
        </span>

        <h2 className="text-5xl md:text-6xl font-bold mt-6">
          Help Us Create More
          <br />
          Stories Of Impact
        </h2>

        <p className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-gray-200">
          Behind every image is a life touched, a family strengthened and a
          community transformed. Your support helps us reach even more people.
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
        </div>
      </div>
    </section>
  );
}
