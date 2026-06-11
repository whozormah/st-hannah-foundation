import Link from "next/link";
import { Heart, Users, Building2, HandHeart } from "lucide-react";

export default function ProgramsGetInvolved() {
  const options = [
    {
      title: "Donate",
      icon: Heart,
      description:
        "Support life-changing programs through financial contributions.",
      link: "/donate",
    },
    {
      title: "Volunteer",
      icon: Users,
      description: "Join our mission and contribute your time and skills.",
      link: "/volunteer",
    },
    {
      title: "Partner",
      icon: Building2,
      description:
        "Collaborate with us to create sustainable community impact.",
      link: "/contact",
    },
    {
      title: "Sponsor A Project",
      icon: HandHeart,
      description:
        "Directly support specific initiatives and outreach efforts.",
      link: "/donate",
    },
  ];

  return (
    <section className="py-28 bg-[#FAF7F2]">
      <div className="container-custom">
        <div className="text-center mb-20">
          <span className="uppercase tracking-[5px] text-[#844204] font-semibold">
            Get Involved
          </span>

          <h2 className="text-5xl font-bold mt-4">Be Part Of The Change</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {options.map((option) => {
            const Icon = option.icon;

            return (
              <Link
                href={option.link}
                key={option.title}
                className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-lg transition block"
              >
                <div className="w-16 h-16 rounded-2xl bg-[#844204]/10 flex items-center justify-center mb-6">
                  <Icon size={28} className="text-[#844204]" />
                </div>

                <h3 className="text-2xl font-bold">{option.title}</h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {option.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
