import Image from "next/image";

export default function AboutGovernance() {
  const team = [
    {
      name: "Glory Akinola",
      role: "President",
      image: "/leadership/glory.jpeg",
    },
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
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Governance Team
          </span>

          <h2 className="text-5xl font-bold mt-4">Leadership With Purpose</h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Behind every initiative, outreach and impact story is a dedicated
            team providing leadership, guidance and oversight to advance the
            mission of St. Hannah Foundation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="relative h-[450px] bg-gradient-to-b from-[#FAF7F2] to-white">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-contain object-top p-4"
                />
              </div>

              <div className="px-8 pb-10 text-center">
                <h3 className="font-bold text-2xl text-gray-900">
                  {member.name}
                </h3>

                <p className="text-[#844204] mt-2 font-semibold">
                  {member.role}
                </p>

                <div className="w-16 h-1 bg-[#D9A441] mx-auto mt-6 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
