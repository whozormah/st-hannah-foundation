import galleryData from "@/public/data/gallery.json";
import siteStats from "@/public/data/stats.json";

const photographs = galleryData.length;
const areas = new Set(galleryData.map((item) => item.category)).size;

// Counted from the gallery itself, or taken from stats.json. The previous
// figures (500+ photos, 120+ outreach events, 25+ communities) were hardcoded
// and contradicted both.
const stats = [
  { number: String(photographs), label: "Photographs" },
  { number: String(areas), label: "Programme areas" },
  { number: siteStats.gallery.outreachEvents, label: "Outreach events" },
  { number: siteStats.gallery.yearsOfService, label: "Years of service" },
];

export default function GalleryStats() {
  return (
    <section className="bg-cream py-16">
      <div className="container-custom">
        <dl className="grid gap-8 rounded-[28px] border border-accent/15 bg-white px-10 py-10 shadow-sm sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <dt className="sr-only">{stat.label}</dt>

              <dd>
                <span className="block text-4xl font-bold text-brand md:text-5xl">
                  {stat.number}
                </span>

                <span
                  aria-hidden
                  className="mx-auto my-4 block h-px w-10 bg-accent"
                />

                <span className="text-sm font-semibold uppercase tracking-[3px] text-gray-500">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
