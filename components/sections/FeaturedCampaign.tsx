import Image from "next/image";
import Link from "next/link";
import { Home, HeartPulse, Utensils, BriefcaseBusiness } from "lucide-react";

export default function FeaturedCampaign() {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Featured Campaign
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            A Mother's Courage Against All Odds
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600">
            Meet Esther Orga, a 23-year-old mother of five whose determination
            and resilience continue to inspire hope despite overwhelming
            challenges.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Media Section */}

          <div>
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="/campaigns/esther-main.png"
                alt="Esther Orga"
                fill
                className="object-cover"
              />
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="relative h-28 rounded-2xl overflow-hidden">
                <Image
                  src="/campaigns/esther-1.png"
                  alt="Esther"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-28 rounded-2xl overflow-hidden">
                <Image
                  src="/campaigns/esther-2.png"
                  alt="Esther"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-28 rounded-2xl overflow-hidden">
                <Image
                  src="/campaigns/esther-3.png"
                  alt="Esther"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}

          <div>
            <span className="bg-[#844204]/10 text-[#844204] px-4 py-2 rounded-full font-medium">
              Esther Orga • Age 23
            </span>

            <h3 className="text-4xl font-bold mt-6">
              Raising Five Children Against Incredible Odds
            </h3>

            <div className="mt-8 space-y-6 text-gray-700 leading-8">
              <p>
                Esther Orga is a 23-year-old mother raising five children under
                extremely difficult circumstances.
              </p>

              <p>
                Living in inadequate accommodation and facing severe food
                insecurity, Esther works tirelessly every day to provide for her
                family.
              </p>

              <p>
                To earn a little income, she takes on washing and cleaning jobs
                whenever opportunities arise. The small amount she earns is
                often barely enough to feed her children.
              </p>

              <p>
                Beyond financial hardship, Esther is also facing health
                challenges and urgently requires holistic support to help her
                family regain stability and hope.
              </p>
            </div>

            {/* Needs */}

            <div className="mt-10">
              <h4 className="text-2xl font-bold mb-6">Current Needs</h4>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-xl">
                  <Home className="text-[#844204]" />
                  <span>Safe Accommodation</span>
                </div>

                <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-xl">
                  <Utensils className="text-[#844204]" />
                  <span>Food Support</span>
                </div>

                <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-xl">
                  <HeartPulse className="text-[#844204]" />
                  <span>Medical Support</span>
                </div>

                <div className="flex items-center gap-3 bg-[#FAF7F2] p-4 rounded-xl">
                  <BriefcaseBusiness className="text-[#844204]" />
                  <span>Income Empowerment</span>
                </div>
              </div>
            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/donate?cause=esther-orga-family-support"
                className="bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold text-center"
              >
                Support Esther Today
              </Link>

              <Link
                href="https://drive.google.com/drive/folders/178ZZ4blhtxzrVEs7HLZvI6d-ISXdujkA"
                className="border border-[#844204] text-[#844204] px-8 py-4 rounded-xl font-semibold text-center"
              >
                Watch Her Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
