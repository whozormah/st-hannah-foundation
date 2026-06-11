import {
  Eye,
  Target,
  HeartHandshake,
  ShieldCheck,
  Award,
  Sparkles,
  Scale,
  Users,
} from "lucide-react";

export default function VisionMission() {
  const values = [
    {
      icon: HeartHandshake,
      title: "Compassion",
      description:
        "Serving with empathy, dignity and genuine care for every individual.",
    },
    {
      icon: ShieldCheck,
      title: "Integrity",
      description:
        "Acting with honesty, transparency and strong ethical principles.",
    },
    {
      icon: Award,
      title: "Excellence",
      description:
        "Delivering impactful solutions with professionalism and quality.",
    },
    {
      icon: Sparkles,
      title: "Empowerment",
      description:
        "Creating opportunities that unlock potential and inspire growth.",
    },
    {
      icon: Scale,
      title: "Accountability",
      description:
        "Stewarding resources responsibly and remaining answerable to our stakeholders.",
    },
    {
      icon: Users,
      title: "Community",
      description:
        "Building stronger communities through collaboration and service.",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container-custom">
        {/* Header */}

        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-[#844204] font-semibold uppercase tracking-widest">
            Our Foundation
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Guided By Purpose, Driven By Impact
          </h2>
        </div>

        {/* Vision & Mission */}

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Vision */}

          <div className="bg-[#FAF7F2] p-10 rounded-3xl border border-gray-100">
            <div className="w-14 h-14 rounded-xl bg-[#844204]/10 flex items-center justify-center mb-6">
              <Eye className="text-[#844204]" size={28} />
            </div>

            <h3 className="text-3xl font-bold mb-4">Our Vision</h3>

            <p className="text-gray-600 leading-8">
              To build a world where every child and family, especially the
              overlooked, underserved, and unheard, experiences the fullness of
              their God-given potential. We envision communities restored,
              futures rebuilt, and generations empowered through love,
              structure, and transformative support.
            </p>
          </div>

          {/* Mission */}

          <div className="bg-[#FAF7F2] p-10 rounded-3xl border border-gray-100">
            <div className="w-14 h-14 rounded-xl bg-[#844204]/10 flex items-center justify-center mb-6">
              <Target className="text-[#844204]" size={28} />
            </div>

            <h3 className="text-3xl font-bold mb-4">Our Mission</h3>

            <p className="text-gray-600 leading-8">
              St. Hannah Foundation exists to uplift families and communities
              across Africa through dignified access to resources, education,
              and community empowerment, igniting hope and restoring the power
              of possibility.
            </p>
          </div>
        </div>

        {/* Core Values */}

        <div>
          <div className="text-center mb-10">
            <h3 className="text-3xl font-bold">Our Core Values</h3>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;

              return (
                <div
                  key={index}
                  className="p-8 rounded-2xl border border-gray-100 hover:shadow-lg transition duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#844204]/10 flex items-center justify-center mb-5">
                    <Icon size={24} className="text-[#844204]" />
                  </div>

                  <h4 className="text-xl font-semibold mb-3">{value.title}</h4>

                  <p className="text-gray-600">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
