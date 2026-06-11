import Link from "next/link";

export default function DonateCTA() {
  return (
    <section className="py-28 bg-[#844204] text-white">
      <div className="container-custom text-center">
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          Thank You
        </span>

        <h2 className="text-5xl md:text-6xl font-bold mt-6">
          Together We Can
          <br />
          Change Lives
        </h2>

        <p className="max-w-3xl mx-auto mt-8 text-lg leading-8 text-gray-200">
          Every contribution, regardless of size, helps us create opportunities,
          restore hope and transform lives.
        </p>

        <div className="flex justify-center mt-12">
          <Link
            href="/contact"
            className="bg-white text-[#844204] px-8 py-4 rounded-xl font-semibold"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
