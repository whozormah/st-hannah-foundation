import Image from "next/image";

export default function FounderMessage() {
  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        {/* Section Header */}

        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            The Heart Behind The Mission
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            A Story Rooted In Compassion
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Side */}

          <div className="relative">
            {/* Accent Background */}

            <div className="absolute -left-6 -bottom-6 w-full h-full rounded-3xl bg-[#844204]/10"></div>

            <div className="relative">
              <Image
                src="/founder.jpeg"
                alt="Glory Akinola"
                width={800}
                height={1000}
                className="w-full rounded-3xl object-cover shadow-xl"
              />
            </div>

            {/* Founder Details */}

            <div className="mt-8">
              <h3 className="text-3xl font-bold text-[#844204]">
                Glory Akinola
              </h3>

              <p className="text-gray-600 mt-2">Founder & President</p>

              <p className="text-sm uppercase tracking-widest text-gray-400 mt-3">
                St. Hannah Foundation
              </p>
            </div>
          </div>

          {/* Right Side */}

          <div>
            <blockquote className="border-l-4 border-[#D9A441] pl-6 text-2xl md:text-4xl leading-relaxed italic text-[#844204] mb-10">
              “I pour my life into helping others, because every joyous smile
              reminds me that hope is never lost — it only needed a hand, and
              I’m glad to be that hand.”
            </blockquote>

            <div className="space-y-6 text-gray-700 leading-8">
              <p>
                St. Hannah Foundation was birthed from a heart of compassion and
                a deep desire to bring hope where it is most needed.
              </p>

              <p>
                It is more than a nonprofit. It is a movement grounded in
                compassion, committed to restoring dignity and opportunity where
                it is needed most.
              </p>

              <p>
                Through sustainable initiatives, educational access, and
                collaborative outreach, we aim to support families and
                strengthen communities, with the hope of transforming lives one
                restored story at a time.
              </p>

              <p>
                Our work is fueled by the belief that every child deserves a
                chance, every family deserves support, and every community
                deserves the opportunity to thrive.
              </p>
            </div>

            {/* Signature */}
          </div>
        </div>
      </div>
    </section>
  );
}
