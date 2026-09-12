import type { ReactNode } from "react";
import Link from "next/link";

import legal from "@/public/data/legal.json";
import settings from "@/public/data/site-settings.json";

type Section = {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
  table?: string;
  after?: string[];
};

type Document = {
  version: string;
  lastUpdated: string;
  effectiveDate: string | null;
  sections: Section[];
};

export const isApproved = legal.status === "approved";

// Every value the Foundation has still to confirm is null in legal.json.
// While the documents are drafts those render as a visible marker; once they
// are approved a missing value fails the build, so a policy can never go live
// with a blank where the data protection contact should be.
const values: Record<string, string | null> = {
  displayName: settings.foundationName,
  registeredName: legal.registeredName,
  email: settings.email,
  nigeriaAddress: settings.nigeriaOffice.address,
  usaAddress: settings.usaOffice.address,
  dpoName: legal.dataProtectionContact.name,
  dpoEmail: legal.dataProtectionContact.email,
  emailProviderName: legal.emailProvider.name,
  emailProviderLocation: legal.emailProvider.location,
  governingLaw: legal.terms.governingLaw,
};

function unconfirmed(what: string): ReactNode {
  if (isApproved) {
    throw new Error(
      `legal.json: "${what}" must be set before the legal documents are approved.`,
    );
  }

  return (
    <mark className="rounded bg-amber-100 px-1.5 py-0.5 font-semibold text-amber-900">
      to be confirmed
    </mark>
  );
}

function renderText(text: string): ReactNode[] {
  return text.split(/(\{\{\w+\}\})/).map((part, index) => {
    const token = part.match(/^\{\{(\w+)\}\}$/)?.[1];

    if (!token) return part;

    if (token === "privacyPolicy") {
      return (
        <Link
          key={index}
          href="/privacy"
          className="font-semibold text-brand underline underline-offset-4"
        >
          Privacy Policy
        </Link>
      );
    }

    if (!(token in values)) {
      throw new Error(`legal.json: unknown value "{{${token}}}".`);
    }

    const value = values[token];

    return value ? (
      <span key={index}>{value}</span>
    ) : (
      <span key={index}>{unconfirmed(token)}</span>
    );
  });
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function Rows({ rows }: { rows: { label: string; body: ReactNode }[] }) {
  return (
    <div className="mt-6 divide-y divide-gray-200 border-y border-gray-200">
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid gap-2 py-5 md:grid-cols-[13rem_1fr] md:gap-8"
        >
          <h3 className="text-lg font-bold text-ink">
            {renderText(row.label)}
          </h3>
          <div className="text-lg leading-8 text-gray-700">{row.body}</div>
        </div>
      ))}
    </div>
  );
}

function Table({ name }: { name: string }) {
  if (name === "collection") {
    return (
      <Rows
        rows={legal.privacy.collection.map((row) => ({
          label: row.where,
          body: (
            <>
              <p>{row.what}</p>
              <p className="mt-2">
                <span className="font-semibold text-ink">Why: </span>
                {row.why}
              </p>
            </>
          ),
        }))}
      />
    );
  }

  if (name === "processors") {
    return (
      <Rows
        rows={legal.privacy.processors.map((row) => ({
          label: row.name,
          body: (
            <>
              <p>{row.role}</p>
              <p className="mt-2">
                <span className="font-semibold text-ink">Location: </span>
                {renderText(row.location)}
              </p>
            </>
          ),
        }))}
      />
    );
  }

  if (name !== "retention") {
    throw new Error(`legal.json: unknown table "${name}".`);
  }

  return (
    <Rows
      rows={legal.privacy.retention.map((row) => ({
        label: row.record,
        body: row.period ?? unconfirmed(`retention period for ${row.record}`),
      }))}
    />
  );
}

export default function LegalDocument({ document }: { document: Document }) {
  return (
    <section className="bg-white py-14 md:py-24">
      <div className="container-custom">
        <div className="mx-auto max-w-3xl">
          {!isApproved && (
            <p
              role="note"
              className="mb-10 rounded-2xl border border-amber-300 bg-amber-50 px-6 py-5 text-lg leading-8 text-amber-900"
            >
              <span className="font-bold">Draft. </span>
              {legal.draftNotice}
            </p>
          )}

          <p className="text-base text-gray-600">
            Version {document.version} · Last updated{" "}
            {formatDate(document.lastUpdated)} · In effect from{" "}
            {document.effectiveDate
              ? formatDate(document.effectiveDate)
              : unconfirmed("effectiveDate")}
          </p>

          <nav
            aria-label="On this page"
            className="mt-8 rounded-2xl bg-cream px-6 py-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[4px] text-brand">
              On this page
            </p>
            <ol className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2">
              {document.sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-lg text-gray-700 underline-offset-4 hover:text-brand hover:underline"
                  >
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          {document.sections.map((section) => (
            <section key={section.id} id={section.id} className="mt-14">
              <h2 className="text-2xl font-bold leading-tight text-ink md:text-3xl">
                {section.heading}
              </h2>

              {section.paragraphs?.map((text, index) => (
                <p key={index} className="mt-5 text-lg leading-8 text-gray-700">
                  {renderText(text)}
                </p>
              ))}

              {section.items && (
                <ul className="mt-5 list-disc space-y-3 pl-6 text-lg leading-8 text-gray-700 marker:text-brand">
                  {section.items.map((text, index) => (
                    <li key={index}>{renderText(text)}</li>
                  ))}
                </ul>
              )}

              {section.table && <Table name={section.table} />}

              {section.after?.map((text, index) => (
                <p key={index} className="mt-5 text-lg leading-8 text-gray-700">
                  {renderText(text)}
                </p>
              ))}
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
