import type { StoryFigure } from "@/lib/cms";

/* The story's confirmed figures, in a band beneath its opening (CR-021). */
export default function StoryFigures({ stats }: { stats: StoryFigure[] }) {
  if (!stats.length) return null;

  return (
    <section aria-label="Impact figures" className="bg-white pb-16">
      <div className="container-custom max-w-6xl">
        <dl className="flex flex-wrap justify-center gap-x-16 gap-y-10 rounded-[32px] bg-gradient-to-br from-[#2E1B05] via-brand-dark to-brand px-6 py-12 text-white sm:px-12">
          {stats.map((figure) => (
            <div key={`${figure.value}-${figure.label}`} className="flex min-w-[10rem] flex-col-reverse text-center">
              <dt className="mt-3 text-sm font-semibold uppercase tracking-[3px] text-white/80">
                {figure.label}
              </dt>
              <dd className="font-display text-5xl font-bold tabular-nums text-accent-soft md:text-6xl">
                {figure.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
