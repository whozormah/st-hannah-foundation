import Link from "next/link";

export default function GalleryCTA() {
  return (
    <section className="py-32 bg-[#844204] text-white">
      {" "}
      <div className="container-custom max-w-6xl text-center">
        {" "}
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          Inspired By What You See?{" "}
        </span>
        <h2 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
          Together We Can Create
          <br />
          Even More Stories Of Hope
        </h2>
        <p className="max-w-4xl mx-auto mt-8 text-lg leading-8 text-gray-200">
          Every photograph represents a life touched, a family supported and a
          community strengthened. Your generosity, partnership and service help
          us extend our reach and create lasting impact where it is needed most.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Link
            href="/donate"
            className="bg-white text-[#844204] rounded-[24px] p-8 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">Donate</h3>

            <p className="mt-3 text-gray-600 leading-7">
              Help fund life-changing programmes and support vulnerable
              individuals, families and communities.
            </p>
          </Link>

          <Link
            href="/volunteer"
            className="bg-white text-[#844204] rounded-[24px] p-8 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">Volunteer</h3>

            <p className="mt-3 text-gray-600 leading-7">
              Share your time, skills and expertise to help us expand our impact
              and serve more people.
            </p>
          </Link>

          <Link
            href="/contact"
            className="bg-white text-[#844204] rounded-[24px] p-8 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">Partner With Us</h3>

            <p className="mt-3 text-gray-600 leading-7">
              Collaborate with us through sponsorships, strategic partnerships
              and community initiatives.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
