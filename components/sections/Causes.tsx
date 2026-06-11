import Image from "next/image";
import Link from "next/link";

export default function Causes() {
  const causes = [
    {
      title: "Child Development",
      image: "/causes/children.jpg",
      description:
        "Providing children with education, support and opportunities to reach their full potential.",
    },
    {
      title: "Widow Empowerment",
      image: "/causes/widows.jpg",
      description:
        "Helping widows rebuild their lives through empowerment, training and community support.",
    },
    {
      title: "Education Support",
      image: "/causes/education.jpg",
      description:
        "Creating access to quality education and learning resources for underserved communities.",
    },
    {
      title: "Community Outreach",
      image: "/causes/community.jpg",
      description:
        "Supporting vulnerable communities through outreach programs and humanitarian initiatives.",
    },
  ];

  return (
    <section className="py-28 bg-white">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Causes We Support
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Creating Lasting Impact Where It Matters Most
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-600">
            Every contribution helps us extend hope, restore dignity and
            transform lives across communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {causes.map((cause, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
            >
              <div className="relative h-64">
                <Image
                  src={cause.image}
                  alt={cause.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">{cause.title}</h3>

                <p className="text-gray-600 mb-6">{cause.description}</p>

                <div className="flex flex-col gap-3">
                  <Link
                    href="/donate"
                    className="bg-[#844204] text-white text-center py-3 rounded-xl"
                  >
                    Donate To This Cause
                  </Link>

                  <Link
                    href="/programs"
                    className="border border-[#844204] text-[#844204] text-center py-3 rounded-xl"
                  >
                    Learn More
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
