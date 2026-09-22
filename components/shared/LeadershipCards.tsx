import Image from "next/image";

export interface Leader {
  name: string;
  role: string;
  image: string;
  /** Optional. An editor adds a bio in the CMS and it appears on the card. */
  bio?: string;
}

/* The Foundation's leaders, as the President asked (CR-031, 21 September
   2026): every leader in the same card, the President alone on the first
   row, and the rest of the team in rows beneath her, never grouped with her.
   The card is the volunteer section's (AboutVolunteers), three to a row, so
   the Team page reads as one design; a short last row sits centred. Used on
   the homepage and the Team page. */

const WIDTH = "w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]";

function LeaderCard({ leader, priority = false }: { leader: Leader; priority?: boolean }) {
  return (
    <article className="group h-full overflow-hidden rounded-[24px] border border-accent/15 bg-white transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
        />
      </div>

      <div className="p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-brand">{leader.role}</p>

        <h3 className="mt-2 text-xl font-bold leading-tight text-ink">{leader.name}</h3>

        {/* Nothing invented: a bio appears once the CMS carries one. */}
        {leader.bio && <p className="mt-3 leading-8 text-gray-700">{leader.bio}</p>}
      </div>
    </article>
  );
}

export default function LeadershipCards({ leaders }: { leaders: Leader[] }) {
  const [lead, ...team] = leaders;

  if (!lead) return null;

  return (
    <div className="mt-12">
      {/* The President, alone on her row, in the same card as everyone else */}
      <div className="flex justify-center">
        <div className={WIDTH}>
          <LeaderCard leader={lead} priority />
        </div>
      </div>

      {/* The team, beneath her */}
      {team.length > 0 && (
        <ul className="mt-6 flex flex-wrap justify-center gap-6">
          {team.map((member) => (
            <li key={member.name} className={WIDTH}>
              <LeaderCard leader={member} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
