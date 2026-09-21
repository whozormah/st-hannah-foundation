import LeadershipCards, { type Leader } from "@/components/shared/LeadershipCards";
import { getLeadership } from "@/lib/cms";

export default async function AboutGovernance() {
  // The President first, alone on her row; the team beneath (CR-031).
  const team: Leader[] = await getLeadership();

  if (!team.length) return null;

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold leading-tight text-ink md:text-5xl">
            Stewarding the mission
          </h2>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            The people responsible for the Foundation&apos;s direction,
            oversight and accountability.
          </p>
        </div>

        <LeadershipCards leaders={team} />
      </div>
    </section>
  );
}
