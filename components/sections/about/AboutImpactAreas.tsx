import {
  GraduationCap,
  HeartHandshake,
  Users,
  Home,
  HandHeart,
  Briefcase,
} from "lucide-react";
import { ArrowRight } from "lucide-react";
export default function AboutImpactAreas() {
  const areas = [
    {
      icon: GraduationCap,
      title: "Education & Learning",
      description:
        "Creating opportunities through educational support, mentorship, digital literacy and access to learning resources.",
    },
    {
      icon: HeartHandshake,
      title: "Child Welfare",
      description:
        "Supporting vulnerable children through care initiatives, educational access, wellbeing support and opportunity creation.",
    },
    {
      icon: Users,
      title: "Family Support",
      description:
        "Strengthening families through practical assistance, empowerment initiatives and compassionate intervention.",
    },
    {
      icon: Home,
      title: "Community Development",
      description:
        "Building stronger communities through outreach programmes, partnerships and sustainable support systems.",
    },
    {
      icon: HandHeart,
      title: "Humanitarian Relief",
      description:
        "Responding to urgent needs with dignity through food support, emergency assistance and community care.",
    },
    {
      icon: Briefcase,
      title: "Volunteer Engagement",
      description:
        "Mobilising passionate individuals to serve, contribute their skills and create meaningful impact.",
    },
  ];

  const approach = ["Listen", "Support", "Empower", "Transform"];

  return (
    <section className="py-32 bg-cream">
      {" "}
      <div className="container-custom">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-brand font-semibold">
            Our Approach
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            How We Create Lasting Impact
          </h2>

          <p className="max-w-3xl mx-auto mt-6 text-gray-700 text-lg leading-8">
            We believe lasting change happens when compassion meets action.
            Every programme, outreach and initiative is designed to meet
            immediate needs while creating pathways for long-term growth,
            resilience and transformation.
          </p>
        </div>
        {/* Impact Journey */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {approach.map((step, index) => (
            <div
              key={step}
              className="bg-white rounded-[28px] p-8 text-center shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand to-brand-light text-xl font-bold text-white shadow-lg transition-all duration-500 group-hover:scale-110">
                {index + 1}
              </div>

              <h3 className="mt-5 text-xl font-bold">{step}</h3>
            </div>
          ))}
        </div>
        {/* Impact Areas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {areas.map((area) => {
            const Icon = area.icon;

            return (
              <div
                key={area.title}
                className="group bg-white rounded-[32px] p-8 border border-gray-100 hover:border-accent/40 hover:-translate-y-2 hover:shadow-xl transition-all duration-500"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-cream-warm transition-all duration-500 group-hover:scale-110 group-hover:bg-brand">
                  <Icon
                    size={36}
                    className="text-brand transition-all duration-500 group-hover:text-white"
                  />
                </div>

                <h3 className="text-2xl font-bold">{area.title}</h3>

                <p className="mt-4 text-gray-700 leading-7">
                  {area.description}
                </p>
                <div className="mt-8 flex items-center gap-2 font-semibold text-brand">
                  Learn More
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-2"
                  />
                </div>
              </div>
            );
          })}
        </div>
        {/* Closing Statement */}
        <div className="mt-24 rounded-[40px] bg-brand px-12 py-16 text-center text-white">
          <span className="uppercase tracking-[5px] text-accent">
            Our Commitment
          </span>

          <h3 className="mt-5 text-4xl font-bold">
            Creating Opportunities For Lasting Change
          </h3>

          <p className="mx-auto mt-8 max-w-4xl text-lg leading-9 text-white/80">
            Every programme we design is rooted in dignity, compassion and
            sustainability—ensuring that today&apos;s support becomes tomorrow&apos;s
            opportunity for individuals, families and communities.
          </p>
        </div>
      </div>
    </section>
  );
}
