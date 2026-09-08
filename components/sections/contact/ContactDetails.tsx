import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";

import settings from "@/public/data/site-settings.json";

// site-settings.json is the single source for these; the offices section reads
// the same values rather than repeating them.
export const contact = {
  email: settings.email,
  phone: settings.phone,
  nigeria: settings.nigeriaOffice.address,
  usa: settings.usaOffice.address,
  responseTime: "Within 24–48 business hours",
};

// The committed number is a placeholder (+2340000000000). Publishing it, or a
// wa.me link built from it, would send people nowhere, so it is hidden until a
// real number is configured.
export const hasRealPhone = /[1-9]/.test(contact.phone.replace(/^\+?\d{1,4}/, ""));

const whatsappNumber = contact.phone.replace(/\D/g, "");

function Row({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 border-b border-accent/15 pb-6 last:border-0 last:pb-0">
      <span
        aria-hidden
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-cream-warm text-brand"
      >
        {icon}
      </span>

      <div className="min-w-0">
        <h3 className="font-bold text-ink">{label}</h3>

        <div className="mt-1 leading-8 text-gray-700">{children}</div>
      </div>
    </div>
  );
}

export default function ContactDetails() {
  return (
    <div className="rounded-[32px] bg-cream p-8 lg:p-10">
      <span className="text-sm font-semibold uppercase tracking-[4px] text-brand">
        Contact Information
      </span>

      <h2 className="mt-4 text-3xl font-bold leading-tight text-ink md:text-4xl">
        Let&apos;s start a conversation
      </h2>

      <div className="mt-9 space-y-6">
        <Row icon={<Mail size={22} />} label="Email">
          <a
            href={`mailto:${contact.email}`}
            className="break-all font-medium text-brand underline-offset-4 hover:underline"
          >
            {contact.email}
          </a>
        </Row>

        {hasRealPhone && (
          <Row icon={<Phone size={22} />} label="Phone">
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              {contact.phone}
            </a>
          </Row>
        )}

        {/* The full addresses live in the offices section below, so they are
            not repeated here. */}
        <Row icon={<MapPin size={22} />} label="Offices">
          <a
            href="#offices"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            Lagos, Nigeria and Chicago, USA
          </a>
        </Row>

        <Row icon={<Clock size={22} />} label="Response time">
          {contact.responseTime}
        </Row>
      </div>

      {hasRealPhone && (
        <div className="mt-9 rounded-[24px] bg-brand p-7 text-white">
          <div className="flex items-center gap-3">
            <MessageCircle size={24} aria-hidden />

            <h3 className="text-xl font-bold">Need a faster reply?</h3>
          </div>

          <p className="mt-4 leading-8 text-white/90">
            Message our team on WhatsApp for quick enquiries.
          </p>

          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-brand transition hover:scale-105"
          >
            Chat on WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
