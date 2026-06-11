import Image from "next/image";
import Link from "next/link";

export default function ImpactStories() {
  const stories = [
    {
      title: "From Struggle To Stability",
      image: "/stories/story1.jpg",
      category: "Widow Empowerment",
      description:
        "Through support and empowerment initiatives, a widow rebuilt her livelihood and regained confidence for the future.",
    },
    {
      title: "A Future Through Education",
      image: "/stories/story2.jpg",
      category: "Child Development",
      description:
        "Educational support provided access to learning opportunities that continue to shape a brighter future.",
    },
    {
      title: "Strengthening Communities",
      image: "/stories/story3.jpg",
      category: "Community Outreach",
      description:
        "Community-focused interventions brought resources, hope and opportunities to underserved families.",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Stories Of Transformation
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Lives Changed Through Compassion
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600">
            Every life touched tells a story of hope, resilience and renewed
            possibility.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={story.image}
                  alt={story.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8">
                <span className="text-[#844204] text-sm font-semibold uppercase tracking-wider">
                  {story.category}
                </span>

                <h3 className="text-2xl font-bold mt-3">{story.title}</h3>

                <p className="mt-4 text-gray-600">{story.description}</p>

                <Link
                  href="/impact-stories"
                  className="inline-block mt-6 text-[#844204] font-semibold"
                >
                  Read Story →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
