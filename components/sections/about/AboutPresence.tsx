import { MapPin } from "lucide-react";

export default function AboutPresence() {
  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Our Presence
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Serving Communities Across Continents
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="bg-white rounded-[32px] p-10 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-[#844204]" size={24} />

              <h3 className="text-3xl font-bold">Nigeria Office</h3>
            </div>

            <p className="text-gray-600 leading-8">
              35, Ilaje Road
              <br />
              Bariga, Lagos
              <br />
              Nigeria
            </p>
          </div>

          <div className="bg-white rounded-[32px] p-10 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <MapPin className="text-[#844204]" size={24} />

              <h3 className="text-3xl font-bold">United States Office</h3>
            </div>

            <p className="text-gray-600 leading-8">
              4310 S King Dr.
              <br />
              Unit 3D
              <br />
              Chicago, IL 60653
              <br />
              United States
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
