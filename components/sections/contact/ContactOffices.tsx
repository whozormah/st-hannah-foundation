import { MapPin } from "lucide-react";

import { contact } from "./ContactDetails";

const offices = [
  {
    label: "Headquarters",
    name: "Nigeria",
    address: contact.nigeria,
  },
  {
    label: "International office",
    name: "United States",
    address: contact.usa,
  },
];

// Built from the same address the offices list shows, so the pin and the text
// cannot drift apart.
const mapQuery = encodeURIComponent(contact.nigeria);

export default function ContactOffices() {
  return (
    <section id="offices" className="bg-cream py-14 md:py-24">
      <div className="container-custom">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
            Our Presence
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
            Where to find us
          </h2>

          <p className="mt-5 text-lg leading-9 text-gray-700">
            Our programmes serve communities across Nigeria, supported by a
            network of partners and volunteers abroad.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr_1.6fr]">
          {offices.map((office) => (
            <div
              key={office.name}
              className="rounded-[28px] bg-white p-8 shadow-sm"
            >
              <span
                aria-hidden
                className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cream-warm text-brand"
              >
                <MapPin size={22} />
              </span>

              <span className="mt-6 block text-sm font-semibold uppercase tracking-[3px] text-brand">
                {office.label}
              </span>

              <h3 className="mt-2 text-2xl font-bold text-ink">
                {office.name}
              </h3>

              <address className="mt-4 not-italic leading-8 text-gray-700">
                {office.address}
              </address>
            </div>
          ))}

          <div className="overflow-hidden rounded-[28px] border border-gray-100 shadow-sm">
            <iframe
              title="Map showing the St. Hannah Foundation office in Bariga, Lagos"
              src={`https://maps.google.com/maps?q=${mapQuery}&z=15&ie=UTF8&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[340px] w-full lg:h-full lg:min-h-[340px]"
              style={{ border: 0 }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
