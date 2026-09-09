
import donationImpact from "@/public/data/donation-impact.json";

interface Stat {
  number: string;
  label: string;
}

interface Cause {
  title: string;
  description: string;
}

interface DonationImpactData {
  stats: Stat[];
  causes: Cause[];
}

const data: DonationImpactData = donationImpact;

export default function DonationImpact() {
  return (
    <section className="py-28 bg-cream">
      {" "}
      <div className="container-custom">
        {/* Header */}

        <div className="text-center max-w-4xl mx-auto mb-20">
          <span className="uppercase tracking-[5px] text-brand font-semibold">
            Your Impact
          </span>

          <h2 className="text-5xl md:text-6xl font-bold mt-4">
            Every Gift Creates A Ripple Of Hope
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-8">
            Every donation contributes directly to programmes and initiatives
            that empower individuals, strengthen families and create
            opportunities for sustainable growth and transformation.
          </p>
        </div>

        {/* Statistics */}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {data.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-[32px] p-8 text-center shadow-sm hover:shadow-lg transition"
            >
              <h3 className="text-3xl md:text-5xl font-bold text-brand">
                {stat.number}
              </h3>

              <p className="mt-4 text-gray-700 leading-7">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Support Areas */}

        <div className="text-center max-w-4xl mx-auto mb-16">
          <span className="uppercase tracking-[5px] text-brand font-semibold">
            Support Areas
          </span>

          <h2 className="text-4xl md:text-5xl font-bold mt-4">
            Transforming Generosity Into Impact
          </h2>

          <p className="mt-6 text-lg text-gray-700 leading-8">
            Your generosity enables us to continue delivering life-changing
            programmes that uplift individuals, support families and strengthen
            communities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.causes.map((cause) => (
            <div
              key={cause.title}
              className="bg-white rounded-[32px] p-8 shadow-sm hover:shadow-xl transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mb-6">
                <div className="w-6 h-6 rounded-full bg-brand" />
              </div>

              <h3 className="text-2xl font-bold">{cause.title}</h3>

              <p className="mt-4 text-gray-700 leading-7">
                {cause.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
