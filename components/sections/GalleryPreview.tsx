import Image from "next/image";
import Link from "next/link";

export default function GalleryPreview() {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Moments Of Impact
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Capturing Stories Of Hope
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600">
            Every image tells a story of lives touched, communities strengthened
            and futures transformed through compassion and service.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large Left Image */}

          <div className="lg:col-span-2 relative h-[500px] overflow-hidden rounded-3xl">
            <Image
              src="/gallery/gallery1.jpeg"
              alt="Gallery"
              fill
              className="object-cover hover:scale-105 transition duration-700"
            />
          </div>

          {/* Right Column */}

          <div className="grid gap-6">
            <div className="relative h-[238px] overflow-hidden rounded-3xl">
              <Image
                src="/gallery/gallery2.jpeg"
                alt="Gallery"
                fill
                className="object-cover hover:scale-105 transition duration-700"
              />
            </div>

            <div className="relative h-[238px] overflow-hidden rounded-3xl">
              <Image
                src="/gallery/gallery3.jpg"
                alt="Gallery"
                fill
                className="object-cover hover:scale-105 transition duration-700"
              />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="relative h-[250px] overflow-hidden rounded-3xl">
            <Image
              src="/gallery/gallery4.jpg"
              alt="Gallery"
              fill
              className="object-cover hover:scale-105 transition duration-700"
            />
          </div>

          <div className="relative h-[250px] overflow-hidden rounded-3xl">
            <Image
              src="/gallery/gallery5.jpg"
              alt="Gallery"
              fill
              className="object-cover hover:scale-105 transition duration-700"
            />
          </div>

          <div className="relative h-[250px] overflow-hidden rounded-3xl">
            <Image
              src="/gallery/gallery6.jpg"
              alt="Gallery"
              fill
              className="object-cover hover:scale-105 transition duration-700"
            />
          </div>
        </div>

        <div className="text-center mt-12">
          <Link
            href="/gallery"
            className="inline-block bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#A85A12] transition"
          >
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}
