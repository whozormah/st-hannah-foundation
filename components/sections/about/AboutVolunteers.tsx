import Image from "next/image";

import volunteersData from "@/public/data/volunteers.json";

interface Volunteer {
  name: string;
  role: string;
  image: string;
}

const volunteers: Volunteer[] = volunteersData;

export default function AboutVolunteers() {


  return (
    <section className="py-32 bg-[#FAF7F2]">
      <div className="container-custom">
        {/* Header */}

        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Volunteer Leadership Team
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            The Heartbeat Of Our Mission
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg leading-8">
            Behind every outreach, intervention and community programme is a
            dedicated team of volunteers whose passion, compassion and service
            help transform lives and strengthen communities.
          </p>
        </div>

        {/* Message Banner */}

        <div className="relative mx-auto mb-24 max-w-6xl overflow-hidden rounded-[40px] bg-gradient-to-r from-[#844204] via-[#9A5A12] to-[#B27425] px-12 py-16 text-center text-white shadow-2xl">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />
          <h3 className="text-3xl md:text-4xl font-bold">
            Volunteers Make The Difference
          </h3>

          <p className="mt-6 text-white/90 text-lg leading-8 max-w-3xl mx-auto">
            Every outreach, every visit, every act of kindness and every life
            transformed is made possible through individuals who choose to serve
            others with dedication, humility and love.
          </p>
        </div>

        {/* Volunteer Cards */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {volunteers.map((volunteer) => (
            <div
              key={volunteer.name}
              className="group overflow-hidden rounded-[36px] border border-gray-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:border-[#D9A441]/30 hover:shadow-2xl"
            >
              <div className="relative h-[350px] bg-white flex items-end justify-center">
                <Image
                  src={volunteer.image}
                  alt={volunteer.name}
                  fill
                  className="object-contain p-6 transition duration-700 group-hover:scale-105"
                />
              </div>

              <div className="p-8 text-center">
                <span className="inline-flex rounded-full bg-[#844204]/10 px-5 py-2 text-xs font-semibold uppercase tracking-[3px] text-[#844204]">
                  Volunteer Leader
                </span>

                <h3 className="text-2xl font-bold leading-tight">
                  {volunteer.name}
                </h3>

                <p className="mt-3 font-semibold uppercase tracking-[2px] text-[#9A6A17]">
                  {volunteer.role}
                </p>

                <div className="mx-auto mt-8 h-[3px] w-16 rounded-full bg-[#D9A441]" />

                <p className="mt-6 italic leading-7 text-gray-500">
                  &quot;Serving others is one of the greatest ways to create lasting
                  change.&quot;
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-24 text-center">
          <h3 className="text-4xl font-bold text-[#1B1815]">
            Join Our Volunteer Family
          </h3>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Whether you have a few hours each month or want to make long-term
            impact, there is a place for you to serve with St. Hannah
            Foundation.
          </p>

          <a
            href="/volunteer"
            className="mt-10 inline-flex items-center rounded-full bg-[#844204] px-8 py-4 font-semibold text-white transition hover:bg-[#6D3503]"
          >
            Become A Volunteer
          </a>
        </div>
      </div>
    </section>
  );
}
