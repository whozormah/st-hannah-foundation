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
   row, and the rest of the team in a row beneath her, never grouped with her.
   Used on the homepage and the Team page, so both read the same way. */

function LeaderCard({ leader, priority = false }: { leader: Leader; priority?: boolean }) {
  return (
    <article className="group h-full overflow-hidden rounded-[22px] border border-accent/15 bg-white transition-all duration-500 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-cream">
        <Image
          src={leader.image}
          alt={leader.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
        />
      </div>

      <div className="p-4 sm:p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[2px] text-brand sm:text-[11px]">{leader.role}</p>

        <h3 className="mt-1.5 text-base font-bold leading-snug text-ink sm:text-lg">{leader.name}</h3>

        {/* Nothing invented: a bio appears once the CMS carries one. */}
        {leader.bio && <p className="mt-3 text-sm leading-7 text-gray-700">{leader.bio}</p>}
      </div>
    </article>
  );
}

export default function LeadershipCards({ leaders }: { leaders: Leader[] }) {
  const [lead, ...team] = leaders;

  if (!lead) return null;

  return (
    <div className="mt-12">
      {/* The President, alone on her row, the same size as everyone else */}
      <div className="mx-auto w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(20%-16px)]">
        <LeaderCard leader={lead} priority />
      </div>

      {/* The team, beneath her */}
      {team.length > 0 && (
        <ul className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
          {team.map((member) => (
            <li key={member.name}>
              <LeaderCard leader={member} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
