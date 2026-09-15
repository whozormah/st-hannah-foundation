import { getFoundation } from "@/lib/cms";
import Rays from "@/components/shared/Rays";

interface FoundationData {
  badge: string;
  title: string;
  description: string;
  vision: string;
  mission: string;
}

/* The Foundation's introduction, vision and mission, set as an editorial
   manifesto (CR-014): the introduction opens with a drop cap, and the vision
   and mission are two staggered panels, each with its name in a large outline
   down its edge — the same outline the event appeal gives its year.
   Every word is the Foundation's, from About the Foundation in the CMS; the
   outlined names are decoration, hidden from screen readers. The panels rise
   gently into place on scroll where browsers support it (see .reveal-rise). */

export default async function VisionMission() {
  const foundation: FoundationData = await getFoundation();

  return (
    <section className="relative overflow-hidden bg-cream py-16 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/3 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(217,164,65,0.18),transparent_65%)]"
      />

      <div className="container-custom relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* The introduction */}
          <div className="lg:col-span-5 lg:pt-6">
            <div className="lg:sticky lg:top-28">
              <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[4px] text-brand">
                <Rays />
                {foundation.badge}
              </p>

              <h2 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight text-ink md:text-5xl lg:text-6xl">
                {foundation.title}
              </h2>

              <div aria-hidden className="mt-8 h-[3px] w-20 rounded-full bg-gradient-to-r from-brand to-accent" />

              <p className="mt-8 text-lg leading-9 text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-display first-letter:text-7xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-brand">
                {foundation.description}
              </p>
            </div>
          </div>

          {/* Vision and mission, layered */}
          <div className="lg:col-span-7">
            <article className="reveal-rise relative overflow-hidden rounded-[36px] bg-white px-7 pb-12 pt-10 shadow-[0_30px_80px_-40px_rgba(132,66,4,0.35)] sm:pb-16 sm:pl-12 sm:pr-32 sm:pt-12 lg:mr-10">
              {/* The name runs down the panel's edge, like a book's spine,
                  clear of the statement; phones leave it out. */}
              <span
                aria-hidden
                className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 select-none font-display text-[5.5rem] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(132,66,4,0.22)] [writing-mode:vertical-rl] sm:block"
              >
                Vision
              </span>

              <h3 className="relative text-sm font-semibold uppercase tracking-[4px] text-brand">Our Vision</h3>

              <p className="relative mt-6 font-display text-xl italic leading-[1.6] text-ink sm:text-3xl sm:leading-[1.45]">
                {foundation.vision}
              </p>
            </article>

            <article className="reveal-rise relative -mt-8 overflow-hidden rounded-[36px] bg-gradient-to-br from-[#2E1B05] via-brand-dark to-brand px-7 pb-12 pt-10 text-white shadow-[0_40px_90px_-30px_rgba(46,27,5,0.7)] sm:pb-14 sm:pl-12 sm:pr-32 sm:pt-12 lg:-mt-10 lg:ml-10">
              <span
                aria-hidden
                className="pointer-events-none absolute right-5 top-1/2 hidden -translate-y-1/2 select-none font-display text-[5.5rem] font-bold leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(245,210,122,0.4)] [writing-mode:vertical-rl] sm:block"
              >
                Mission
              </span>

              <h3 className="relative text-sm font-semibold uppercase tracking-[4px] text-accent-soft">Our Mission</h3>

              <p className="relative mt-6 font-display text-xl leading-[1.6] sm:text-3xl sm:leading-[1.45]">
                {foundation.mission}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
