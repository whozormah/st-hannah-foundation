import Link from "next/link";
import {
  Camera,
  PlayCircle,
  ArrowRight,
  Heart,
  Users,
  GraduationCap,
  Briefcase,
} from "lucide-react";

export default function ImpactArchive() {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Widows Supported",
    },
    {
      icon: GraduationCap,
      number: "15+",
      label: "UTME Candidates Sponsored",
    },
    {
      icon: Heart,
      number: "100+",
      label: "Families Supported",
    },
    {
      icon: Briefcase,
      number: "50+",
      label: "Businesses Empowered",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        {/* Header */}

        <div className="text-center max-w-4xl mx-auto">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Impact Archive
          </span>

          <h2 className="text-5xl md:text-6xl font-bold mt-4">
            Explore More Stories Of Transformation
          </h2>

          <p className="mt-8 text-lg text-gray-600 leading-8">
            Behind every programme is a story of hope, resilience and
            transformation. Explore our growing collection of photographs,
            videos and community impact highlights.
          </p>
        </div>

        {/* Impact Stats */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="bg-white rounded-[28px] p-8 text-center shadow-sm border border-gray-100 hover:shadow-lg transition"
              >
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#844204]/10 flex items-center justify-center">
                  <Icon size={30} className="text-[#844204]" />
                </div>

                <h3 className="text-4xl font-bold text-[#844204] mt-6">
                  {stat.number}
                </h3>

                <p className="mt-3 text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Archive Links */}

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto mt-20">
          <Link
            href="/gallery"
            className="group bg-white rounded-[32px] p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#844204]/10 flex items-center justify-center">
              <Camera size={42} className="text-[#844204]" />
            </div>

            <h3 className="text-3xl font-bold mt-8">Explore Photo Gallery</h3>

            <p className="mt-4 text-gray-600 leading-8">
              Browse photographs from widow empowerment programmes, educational
              support initiatives, community outreach events, family support
              projects and volunteer activities.
            </p>

            <div className="mt-8 flex items-center gap-2 text-[#844204] font-semibold">
              Explore Gallery
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </div>
          </Link>

          <Link
            href="https://youtube.com"
            target="_blank"
            className="group bg-white rounded-[32px] p-10 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
          >
            <div className="w-20 h-20 rounded-3xl bg-[#844204]/10 flex items-center justify-center">
              <PlayCircle size={42} className="text-[#844204]" />
            </div>

            <h3 className="text-3xl font-bold mt-8">Watch Video Highlights</h3>

            <p className="mt-4 text-gray-600 leading-8">
              Experience outreach programmes, beneficiary testimonies,
              educational interventions and inspiring moments through video
              highlights.
            </p>

            <div className="mt-8 flex items-center gap-2 text-[#844204] font-semibold">
              Watch Videos
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </div>
          </Link>
        </div>

        {/* Footer Text */}

        <div className="text-center mt-20 max-w-3xl mx-auto">
          <p className="text-gray-600 leading-8">
            Our archive continues to grow as more lives are touched, families
            are supported and communities are empowered through the work of St.
            Hannah Foundation and the generosity of our partners, volunteers and
            donors.
          </p>
        </div>
      </div>
    </section>
  );
}
