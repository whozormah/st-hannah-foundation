import Link from "next/link";
import { Camera, PlayCircle } from "lucide-react";

export default function ImpactArchive() {
  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom text-center">
        <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
          Impact Archive
        </span>

        <h2 className="text-5xl font-bold mt-4">
          Explore More Moments Of Impact
        </h2>

        <p className="max-w-3xl mx-auto mt-8 text-gray-600 leading-8">
          Every outreach, every intervention and every life touched tells a
          story. Explore our growing collection of photos, videos and community
          transformation initiatives.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-16">
          <Link
            href="/gallery"
            className="bg-white rounded-[32px] p-10 shadow-sm hover:shadow-lg transition"
          >
            <Camera size={50} className="mx-auto text-[#844204]" />

            <h3 className="text-2xl font-bold mt-6">Photo Gallery</h3>

            <p className="mt-4 text-gray-600">
              Browse outreach events, beneficiary stories, volunteer activities
              and memorable moments.
            </p>
          </Link>

          <Link
            href="https://youtube.com"
            target="_blank"
            className="bg-white rounded-[32px] p-10 shadow-sm hover:shadow-lg transition"
          >
            <PlayCircle size={50} className="mx-auto text-[#844204]" />

            <h3 className="text-2xl font-bold mt-6">Video Highlights</h3>

            <p className="mt-4 text-gray-600">
              Watch event highlights, beneficiary stories and community
              transformation journeys.
            </p>
          </Link>
        </div>
      </div>
    </section>
  );
}
