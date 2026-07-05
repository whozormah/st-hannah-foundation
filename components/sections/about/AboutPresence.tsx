import { MapPin, Globe2 } from "lucide-react";

export default function AboutPresence() {
  const offices = [
    {
      country: "Nigeria",
      title: "Head Office",
      address: ["35, Ilaje Road", "Bariga, Lagos", "Nigeria"],
    },
    {
      country: "United States",
      title: "International Office",
      address: [
        "4310 S King Dr.",
        "Unit 3D",
        "Chicago, IL 60653",
        "United States",
      ],
    },
  ];

  return (
    <section className="bg-white py-32">
      <div className="container-custom">
        {/* Heading */}

        <div className="mx-auto mb-24 max-w-4xl text-center">
          <span className="font-semibold uppercase tracking-[6px] text-[#844204]">
            Our Presence
          </span>

          <h2 className="mt-5 text-5xl font-bold text-[#1B1815] md:text-6xl">
            Serving Communities
            <br />
            Across Borders
          </h2>

          <div className="mx-auto mt-6 h-[3px] w-24 rounded-full bg-[#D9A441]" />

          <p className="mx-auto mt-8 max-w-3xl text-lg leading-9 text-gray-600">
            While our heart is rooted in Africa, our partnerships and support
            network extend beyond borders, enabling us to reach more lives and
            strengthen communities through global collaboration.
          </p>
        </div>

        {/* Presence Banner */}

        <div className="relative mb-20 overflow-hidden rounded-[40px] bg-gradient-to-r from-[#844204] via-[#9A5A12] to-[#B27425] px-12 py-16 text-white shadow-2xl">
          <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-md">
              <Globe2 size={40} className="text-[#F4D06F]" />
            </div>

            <h3 className="mt-8 text-4xl font-bold">
              Local Roots. Global Vision.
            </h3>

            <p className="mt-6 max-w-3xl text-lg leading-9 text-white/85">
              Through our offices, volunteers and partners, we continue to
              expand our reach while remaining committed to serving vulnerable
              individuals, families and communities with excellence.
            </p>
          </div>
        </div>

        {/* Offices */}

        <div className="grid gap-8 lg:grid-cols-2">
          {offices.map((office) => (
            <div
              key={office.country}
              className="group rounded-[36px] border border-gray-100 bg-[#FAF7F2] p-10 transition-all duration-500 hover:-translate-y-2 hover:border-[#D9A441]/30 hover:shadow-2xl"
            >
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#844204]/10 transition-all duration-500 group-hover:bg-[#844204]">
                  <MapPin
                    size={30}
                    className="text-[#844204] transition-all duration-500 group-hover:text-white"
                  />
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[3px] text-[#9A6A17]">
                    {office.country}
                  </p>

                  <h3 className="mt-2 text-3xl font-bold text-[#1B1815]">
                    {office.title}
                  </h3>
                </div>
              </div>

              <div className="mt-8 h-[3px] w-16 rounded-full bg-[#D9A441]" />

              <div className="mt-8 space-y-2 text-lg leading-8 text-gray-600">
                {office.address.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Closing */}

        <div className="mx-auto mt-24 max-w-4xl text-center">
          <h3 className="text-4xl font-bold text-[#1B1815]">
            Expanding Our Reach, One Community At A Time
          </h3>

          <p className="mt-6 text-lg leading-9 text-gray-600">
            Every new partnership, volunteer and supporter enables us to extend
            hope further, serve more families and create lasting impact across
            communities both locally and internationally.
          </p>
        </div>
      </div>
    </section>
  );
}
