import Link from "next/link";

export default function VolunteerCTA() {
  return (
    <section className="py-32 bg-[#844204] text-white">
      {" "}
      <div className="container-custom max-w-6xl text-center">
        {" "}
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          Ready To Make A Difference?{" "}
        </span>
        ```
        <h2 className="text-5xl md:text-6xl font-bold mt-6 leading-tight">
          Your Time.
          <br />
          Your Skills.
          <br />
          Your Impact.
        </h2>
        <p className="max-w-4xl mx-auto mt-8 text-lg leading-8 text-gray-200">
          Every volunteer plays a vital role in helping us create opportunities,
          restore dignity and transform lives. Whether you can give a few hours,
          support an event or contribute professional expertise, your service
          can make a lasting difference.
        </p>
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Link
            href="#volunteer-form"
            className="bg-white text-[#844204] rounded-[24px] p-8 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">Apply Now</h3>

            <p className="mt-3 text-gray-600 leading-7">
              Complete the volunteer application form and join our growing
              network of changemakers.
            </p>
          </Link>

          <Link
            href="/programs"
            className="bg-white text-[#844204] rounded-[24px] p-8 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">Explore Programmes</h3>

            <p className="mt-3 text-gray-600 leading-7">
              Discover the initiatives and projects where volunteers help create
              meaningful impact.
            </p>
          </Link>

          <Link
            href="/contact"
            className="bg-white text-[#844204] rounded-[24px] p-8 hover:scale-105 transition"
          >
            <h3 className="text-2xl font-bold">Contact Our Team</h3>

            <p className="mt-3 text-gray-600 leading-7">
              Have questions about volunteering? Our team would be happy to
              assist you.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
