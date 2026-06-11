import Image from "next/image";

export default function AboutVolunteers() {
  const volunteers = [
    {
      name: "Engr. Uzoma Udoma",
      role: "Chief Technology Officer (CTO)",
      image: "/volunteers/uzoma.png",
    },
    {
      name: "Victoria",
      role: "Programs Associate",
      image: "/volunteers/victoria.jpg",
    },
    {
      name: "David Adebayo",
      role: "Community Outreach Lead",
      image: "/volunteers/volunteer-1.jpg",
    },
    {
      name: "Sarah Johnson",
      role: "Volunteer Coordinator",
      image: "/volunteers/volunteer-2.jpg",
    },
    {
      name: "Michael Eze",
      role: "Education Support Lead",
      image: "/volunteers/volunteer-3.jpg",
    },
    {
      name: "Grace Williams",
      role: "Partnerships & Engagement Lead",
      image: "/volunteers/volunteer-4.jpg",
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Lead Volunteers
          </span>

          <h2 className="text-5xl font-bold mt-4">
            The Heartbeat Of Our Mission
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 leading-8">
            Behind every outreach, intervention and community project is a
            dedicated team of volunteers committed to serving others and
            creating lasting impact.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer.name}
              className="bg-white rounded-[32px] overflow-hidden shadow-md hover:shadow-xl transition duration-300"
            >
              <div className="relative h-[450px] bg-gradient-to-b from-[#FAF7F2] to-white">
                <Image
                  src={volunteer.image}
                  alt={volunteer.name}
                  fill
                  className="object-contain object-top p-4"
                />
              </div>

              <div className="px-8 pb-10 text-center">
                <h3 className="font-bold text-2xl text-gray-900">
                  {volunteer.name}
                </h3>

                <p className="text-[#844204] mt-2 font-semibold">
                  {volunteer.role}
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
