import Image from "next/image";
import Link from "next/link";

export default function GalleryPreview() {
  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        {/* Header */}

        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Moments Of Impact
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Moments That Tell Our Story
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600 text-lg leading-8">
            Behind every outreach, educational initiative, empowerment program
            and community intervention are moments worth remembering. Explore
            the stories, smiles and transformations that continue to shape lives
            across communities.
          </p>
        </div>

        {/* Gallery Grid */}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Large Image */}

          <div className="lg:col-span-2 relative h-[500px] overflow-hidden rounded-[32px] group">
            <Image
              src="/gallery/gallery1.jpeg"
              alt="Gallery"
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
          </div>

          {/* Right Column */}

          <div className="grid gap-6">
            <div className="relative h-[238px] overflow-hidden rounded-[32px] group">
              <Image
                src="/gallery/gallery2.jpeg"
                alt="Gallery"
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            </div>

            <div className="relative h-[238px] overflow-hidden rounded-[32px] group">
              <Image
                src="/gallery/gallery3.jpg"
                alt="Gallery"
                fill
                className="object-cover group-hover:scale-110 transition duration-700"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <div className="relative h-[250px] overflow-hidden rounded-[32px] group">
            <Image
              src="/gallery/gallery4.jpg"
              alt="Gallery"
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
          </div>

          <div className="relative h-[250px] overflow-hidden rounded-[32px] group">
            <Image
              src="/gallery/gallery5.jpg"
              alt="Gallery"
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
          </div>

          {/* Gallery Teaser Card */}

          <Link
            href="/gallery"
            className="relative h-[250px] overflow-hidden rounded-[32px] group block"
          >
            <Image
              src="/gallery/gallery6.jpg"
              alt="View Gallery"
              fill
              className="object-cover group-hover:scale-110 transition duration-700"
            />

            <div className="absolute inset-0 bg-[#844204]/80 flex flex-col items-center justify-center text-white text-center">
              <h3 className="text-5xl font-bold">500+</h3>

              <p className="mt-3 text-lg">
                More Photos
                <br />& Stories
              </p>

              <span className="mt-5 text-sm uppercase tracking-[3px] border border-white/30 px-4 py-2 rounded-full">
                Explore Gallery
              </span>
            </div>
          </Link>
        </div>

        {/* Bottom CTA */}

        <div className="text-center mt-16">
          <p className="max-w-2xl mx-auto text-gray-600 leading-8 mb-8">
            Discover outreach events, educational support initiatives, widow
            empowerment programs, family interventions and unforgettable moments
            of transformation.
          </p>

          <Link
            href="/gallery"
            className="inline-flex items-center gap-3 bg-[#844204] text-white px-8 py-4 rounded-xl font-semibold hover:bg-[#A85A12] transition-all duration-300"
          >
            Explore Our Gallery →
          </Link>
        </div>
      </div>
    </section>
  );
}
