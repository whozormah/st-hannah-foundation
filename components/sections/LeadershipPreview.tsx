import Image from "next/image";
import Link from "next/link";

export default function LeadershipPreview() {
  const leaders = [
    {
      name: "Dr. Akinola",
      role: "Vice President",
      image: "/leadership/vice-president.png",
    },
    {
      name: "Pastor Chinedu Momah",
      role: "Secretary",
      image: "/leadership/secretary.png",
    },
    {
      name: "Chief Joseph Bayo Akinola FNIM",
      role: "Advisory Board Member",
      image: "/leadership/advisory-board.png",
    },
    {
      name: "Ola",
      role: "Programs Director",
      image: "/leadership/programs-director.png",
    },
    {
      name: "Engr. Maxwell Nwajei",
      role: "Program Manager",
      image: "/leadership/program-manager.jpg",
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Governance & Leadership
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Stewarding The Mission With Integrity
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600">
            Meet the dedicated individuals providing strategic direction,
            governance and leadership for St. Hannah Foundation.
          </p>
        </div>

        {/* Featured President */}

        <div className="bg-[#FAF7F2] rounded-[32px] overflow-hidden shadow-lg mb-20">
          <div className="grid lg:grid-cols-2 items-center">
            <div className="relative h-[550px] bg-white">
              <Image
                src="/leadership/glory.jpeg"
                alt="Glory Akinola"
                fill
                className="object-contain p-6"
              />
            </div>

            <div className="p-10 md:p-16">
              <span className="uppercase tracking-widest text-[#844204] font-semibold">
                President
              </span>

              <h3 className="text-4xl md:text-5xl font-bold mt-4">
                Glory Akinola
              </h3>

              <p className="mt-6 text-gray-600 leading-8">
                As President of St. Hannah Foundation, Glory Akinola provides
                strategic leadership and direction for the organisation's
                mission of restoring hope, empowering communities and creating
                sustainable impact across Africa.
              </p>

              <div className="mt-8 border-l-4 border-[#D9A441] pl-5">
                <p className="italic text-[#844204] text-lg leading-8">
                  "Every transformed life reminds us that hope still lives, and
                  together we can make that hope accessible to more people."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Leaders */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="relative h-[340px] bg-white">
                <Image
                  src={leader.image}
                  alt={leader.name}
                  fill
                  className="object-contain p-4"
                />
              </div>

              <div className="p-8 text-center">
                <p className="uppercase tracking-widest text-xs text-[#844204] font-semibold">
                  {leader.role}
                </p>

                <h3 className="text-xl font-bold mt-3 leading-snug">
                  {leader.name}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/team"
            className="inline-block bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#A85A12] transition"
          >
            View Full Team
          </Link>
        </div>
      </div>
    </section>
  );
}
