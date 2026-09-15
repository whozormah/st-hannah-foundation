import Image from "next/image";
import { ArrowUpRight, Download, MapPin } from "lucide-react";

import EventBackdrop from "@/components/blocks/EventBackdrop";
import EventCountdown from "@/components/blocks/EventCountdown";
import EventFilm from "@/components/blocks/EventFilm";
import EventGive from "@/components/blocks/EventGive";
import { getEvent, lagosDay } from "@/lib/cms";

/* CR-013: a fundraising event, told like an event poster. The picture fills
   the section; the name is set large with the year in outline; a live
   countdown ticks to the day; the date and venue sit on a ticket stub. It
   follows the calendar in Lagos: a countdown before the day, "Happening
   today" on it, and a thank-you with the recap afterwards. Hidden if the
   event is missing or unpublished (PUB-06). */

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://sthannahfoundation.org";
const LAGOS_OFFSET = "+01:00"; // West Africa Time, no daylight saving

function daysBetween(from: string, to: string) {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

const format = (day: string, options: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(new Date(`${day}T00:00:00Z`));

/** "10:00 am", "2pm" or "14:30" → "HH:MM"; anything else means no set time. */
function clock(time: string) {
  const match = time.trim().match(/^(\d{1,2})(?:[:.](\d{2}))?\s*(am|pm)?$/i);

  if (!match) return null;

  let hours = Number(match[1]);
  const minutes = Number(match[2] ?? 0);
  const meridiem = match[3]?.toLowerCase();

  if (meridiem === "pm" && hours < 12) hours += 12;
  if (meridiem === "am" && hours === 12) hours = 0;
  if (hours > 23 || minutes > 59) return null;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
}

export default async function EventAppeal({ eventId }: { eventId: number | null }) {
  const event = eventId ? await getEvent(eventId) : null;

  if (!event?.poster) return null;

  // A server component rendered afresh for every visit (CR-007): reading the
  // clock here is the point, and it is read once for everything below.
  // eslint-disable-next-line react-hooks/purity
  const now = Date.now();
  const days = daysBetween(lagosDay(new Date(now)), event.day);
  const phase = days > 0 ? "upcoming" : days === 0 ? "today" : "past";
  const target = `${event.day}T${clock(event.time) ?? "00:00"}:00${LAGOS_OFFSET}`;
  const longDate = format(event.day, { day: "numeric", month: "long", year: "numeric" });
  const place = event.venue.split(",").slice(-2).join(",").trim();
  const mapLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue)}`;
  const share = `https://wa.me/?text=${encodeURIComponent(
    `${event.title} — ${[longDate, event.time].filter(Boolean).join(", ")}, ${event.venue}. ${siteUrl}`,
  )}`;
  const titled = event.title.match(/^(.*\S)\s+(\d{4})$/);

  return (
    <section className="relative isolate overflow-hidden bg-[#140c05] text-white">
      <EventBackdrop poster={event.poster} loop={event.loop} caption={event.mediaCaption} />

      {/* Large screens: dark where the words are, the picture showing on the right. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 hidden bg-gradient-to-r from-[#140c05] via-[#140c05]/90 to-[#140c05]/10 lg:block"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,rgba(217,164,65,0.22),transparent_55%)]"
      />

      <div className="container-custom relative pb-16 md:pb-24 lg:py-28">
        <div className="-mt-16 grid gap-12 lg:mt-0 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end">
          <div>
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[4px] text-accent-soft sm:text-sm">
              <span aria-hidden className="h-px w-10 bg-accent-soft/70" />
              {phase === "past" ? "Thank you" : "Fundraising appeal"} · {place}
            </p>

            <h2 className="relative mt-6">
              <span className="sr-only">{event.title}</span>
              <span aria-hidden className="block">
                {titled ? (
                  <>
                    <span className="block max-w-2xl font-display text-[clamp(2.75rem,7vw,5.5rem)] font-bold leading-[0.95] tracking-tight">
                      {titled[1]}
                    </span>
                    {/* The year, stacked beneath in gold outline: a poster's second line. */}
                    <span className="-mt-1 block select-none font-display text-[clamp(4.5rem,13vw,10rem)] font-bold leading-[0.85] tracking-tight text-transparent [-webkit-text-stroke:1.5px_rgba(245,210,122,0.75)] sm:-mt-2">
                      {titled[2]}
                    </span>
                  </>
                ) : (
                  <span className="relative block max-w-2xl font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight">
                    {event.title}
                  </span>
                )}
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-lg leading-9 text-white/80">
              {phase === "past" && event.recap.thankYou ? event.recap.thankYou : event.summary}
            </p>

            {phase === "past" ? (
              event.recap.photos.length > 0 && (
                <ul className="mt-10 grid max-w-xl grid-cols-4 gap-3">
                  {event.recap.photos.slice(0, 4).map((photo) => (
                    <li key={photo.src} className="relative aspect-square overflow-hidden rounded-2xl">
                      <Image src={photo.src} alt={photo.alt} fill sizes="140px" className="object-cover" />
                    </li>
                  ))}
                </ul>
              )
            ) : (
              <EventCountdown
                target={target}
                initialRemaining={Math.max(0, Date.parse(target) - now)}
                days={days}
                dayLabel={longDate}
              />
            )}

            <EventGive
              programName={phase === "past" ? undefined : event.title}
              label={phase === "past" ? "Support the next programme" : "Give now"}
              showAmounts={phase !== "past"}
            />
          </div>

          <aside className="space-y-8 lg:pb-2">
            {event.film && <EventFilm film={event.film} poster={event.poster.src} label={event.filmLabel} />}

            {/* A ticket stub: the notches are cut out of the card itself. */}
            <div className="max-w-sm rounded-[28px] bg-cream-warm text-ink shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] [-webkit-mask-composite:source-in] [mask-composite:intersect] [mask-image:radial-gradient(circle_at_0_64%,transparent_15px,#000_16px),radial-gradient(circle_at_100%_64%,transparent_15px,#000_16px)]">
              <div className="px-7 pb-6 pt-7">
                <p className="text-xs font-semibold uppercase tracking-[4px] text-brand">
                  {phase === "past" ? "It took place on" : "Save the date"}
                </p>
                <p className="mt-3 flex items-end gap-4">
                  <span className="font-display text-7xl font-bold leading-[0.8] text-brand">
                    {format(event.day, { day: "numeric" })}
                  </span>
                  <span className="pb-1 leading-tight">
                    <span className="block font-semibold">{format(event.day, { month: "long", year: "numeric" })}</span>
                    <span className="block text-ink/60">
                      {[format(event.day, { weekday: "long" }), event.time].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                </p>
              </div>

              <div aria-hidden className="mx-6 border-t-2 border-dashed border-ink/15" />

              <div className="px-7 pb-7 pt-6">
                <p className="flex items-start gap-3 font-semibold">
                  <MapPin aria-hidden size={20} className="mt-0.5 shrink-0 text-brand" />
                  {event.venue}
                </p>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 pl-8 text-sm font-semibold text-brand underline-offset-4 hover:underline"
                >
                  Get directions
                  <ArrowUpRight aria-hidden size={16} />
                  <span className="sr-only"> (opens a map in a new tab)</span>
                </a>
              </div>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">
              {event.flyer && (
                <a
                  href={event.flyer}
                  download
                  className="inline-flex items-center gap-2 underline decoration-white/40 underline-offset-4 hover:decoration-white"
                >
                  <Download aria-hidden size={16} />
                  Download flyer
                </a>
              )}
              <a
                href={share}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-white/40 underline-offset-4 hover:decoration-white"
              >
                Share on WhatsApp
                <span className="sr-only"> (opens WhatsApp)</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
