import Image from "next/image";

export default function AboutFounder() {
  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            The Heart Behind The Mission
          </span>

          <h2 className="text-5xl font-bold mt-4">Meet Our Founder</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative h-[650px] rounded-[32px] overflow-hidden shadow-xl">
            <Image
              src="/founder/glory-akinola.jpeg"
              alt="Glory Akinola"
              fill
              className="object-cover"
            />
          </div>

          <div>
            <div className="bg-white p-8 rounded-[24px] shadow-sm mb-8">
              <h3 className="text-3xl font-bold">Glory Akinola</h3>

              <p className="text-[#844204] font-semibold mt-2">
                Founder & President
              </p>
            </div>

            <blockquote className="text-2xl leading-relaxed italic text-[#844204]">
              "I pour my life into helping others because every joyful smile
              reminds me that hope is never lost, it only needed a hand, and I
              am glad to be that hand."
            </blockquote>

            <p className="mt-8 text-gray-600 leading-8">
              St. Hannah Foundation was birthed from a heart of compassion and a
              deep desire to bring hope where it is needed most.
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              It is more than a nonprofit organization. It is a movement
              grounded in compassion and committed to restoring dignity,
              opportunity and hope to vulnerable individuals and families.
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              Through sustainable initiatives, educational access and
              collaborative outreach, the Foundation seeks to strengthen
              communities and transform lives one restored story at a time.
            </p>

            <p className="mt-6 text-gray-600 leading-8">
              Our work is fueled by the belief that every child deserves a
              chance, every family deserves support and every community deserves
              the opportunity to thrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
