import Link from "next/link";

export default function StoryDonationCTA({ program }: { program: string }) {
  return (
    <section className="py-24 bg-[#844204] text-white">
      <div className="container-custom text-center max-w-4xl">
        <span className="uppercase tracking-[5px] text-[#D9A441] font-semibold">
          Continue The Impact
        </span>

        <h2 className="text-5xl md:text-6xl font-bold mt-6">
          Help Us Reach More Lives
        </h2>

        <p className="mt-8 text-lg leading-8 text-gray-200">
          Every contribution helps us expand our programmes and support more
          individuals, families and communities in need.
        </p>

        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Link
            href="/donate"
            className="bg-white text-[#844204] px-8 py-4 rounded-xl font-semibold"
          >
            Support {program}
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
