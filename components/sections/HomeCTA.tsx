import Link from "next/link";

export default function HomeCTA() {
  return (
    <section className="py-28 bg-[#844204]">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center text-white">
          <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
            Join Our Mission
          </span>

          <h2 className="text-4xl md:text-6xl font-bold mt-6 leading-tight">
            Together We Can Create Lasting Change
          </h2>

          <p className="mt-8 text-lg text-gray-200">
            Whether you choose to donate, volunteer or partner with us, your
            support helps transform lives and strengthen communities across
            Africa.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/donate"
              className="bg-[#D9A441] text-black px-8 py-4 rounded-xl font-semibold"
            >
              Donate Now
            </Link>

            <Link
              href="/volunteer"
              className="bg-white text-[#844204] px-8 py-4 rounded-xl font-semibold"
            >
              Become A Volunteer
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
