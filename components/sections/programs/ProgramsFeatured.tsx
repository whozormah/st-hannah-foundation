import Image from "next/image";
import Link from "next/link";

export default function ProgramsFeatured() {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Featured Initiative
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Restoring Hope. One Family At A Time.
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[500px] rounded-[32px] overflow-hidden">
            <Image
              src="/campaigns/esther-2.png"
              alt="Esther Orga"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <span className="text-[#844204] font-semibold uppercase tracking-[4px]">
              Featured Campaign
            </span>

            <h3 className="text-4xl font-bold mt-4">
              Esther Orga's Journey To A Better Future
            </h3>

            <p className="mt-8 text-gray-600 leading-8">
              Through our humanitarian support initiatives, we identify
              vulnerable families and provide practical interventions that
              restore dignity, hope and opportunity.
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              Esther's story represents many families facing difficult
              circumstances. Through collaborative support, we are working
              toward sustainable solutions that create lasting impact.
            </p>

            <div className="flex gap-4 mt-10">
              <Link
                href="/campaigns/esther-orga"
                className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold"
              >
                Read Her Story
              </Link>

              <Link
                href="/donate"
                className="border border-[#844204] px-8 py-4 rounded-xl font-semibold"
              >
                Support This Cause
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
