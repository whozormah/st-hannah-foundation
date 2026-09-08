import { Resend } from "resend";
import { render } from "@react-email/render";

import {
  DonationReceipt,
  FoundationNotification,
  InternationalInterest,
  FoundationInternationalInterest,
  InKindDonation,
  FoundationInKindDonation,
  VolunteerApplication,
  FoundationVolunteerApplication,
  AidApplication,
  FoundationAidApplication,
  ContactEnquiry,
  FoundationContactEnquiry,
  FoundationNewsletterSignup,
} from "@/emails";
import type { InKindDonationDetails } from "@/emails/FoundationInKindDonation";
import type { VolunteerApplicationDetails } from "@/emails/FoundationVolunteerApplication";
import type { AidApplicationDetails } from "@/emails/FoundationAidApplication";
import type { ContactEnquiryDetails } from "@/emails/FoundationContactEnquiry";

import { formatCurrency, formatDate } from "./formatter";
import { generateReceiptNumber } from "./receipt";

/**
 * Resolved lazily, never at module scope: importing this file must stay free of
 * side effects so `next build` can collect page data for the routes that use it
 * without the production environment variables being present.
 */
function getEmailConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.FROM_EMAIL;
  const donationEmail = process.env.DONATION_EMAIL;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY environment variable is not configured.");
  }

  if (!fromEmail) {
    throw new Error("FROM_EMAIL environment variable is not configured.");
  }

  if (!donationEmail) {
    throw new Error("DONATION_EMAIL environment variable is not configured.");
  }

  return {
    resend: new Resend(apiKey),
    fromEmail,
    donationEmail,
    // Optional dedicated inboxes; they fall back to the address already
    // configured so no extra setup is needed to start receiving submissions.
    volunteerEmail: process.env.VOLUNTEER_EMAIL || donationEmail,
    applicationsEmail: process.env.APPLICATIONS_EMAIL || donationEmail,
    contactEmail: process.env.CONTACT_EMAIL || donationEmail,
  };
}

/**
 * Resend resolves with { data, error } instead of rejecting, so an unchecked
 * call reports success even when nothing was delivered. Every send goes
 * through here so a failure actually surfaces to the caller.
 */
async function deliver(
  resend: Resend,
  payload: Parameters<Resend["emails"]["send"]>[0],
) {
  const { error } = await resend.emails.send(payload);

  if (error) {
    throw new Error(`Email delivery failed: ${error.message}`);
  }
}

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "http://localhost:3000"
  );
}

interface DonationEmailProps {
  name: string;
  email: string;
  phone: string;
  amount: number;
  currency: string;
  purpose: string;
  reference: string;
}

export async function sendDonationEmails({
  name,
  email,
  phone,
  amount,
  currency,
  purpose,
  reference,
}: DonationEmailProps) {
  const { resend, fromEmail, donationEmail } = getEmailConfig();

  const receiptNumber = generateReceiptNumber(reference);

  const formattedAmount = formatCurrency(amount, currency);

  const formattedDate = formatDate(new Date());

  const receiptUrl = `${getSiteUrl()}/donate/receipt/${reference}`;

  const donorEmail = await render(
    DonationReceipt({
      name,
      amount: formattedAmount,
      purpose,
      reference: receiptNumber,
      date: formattedDate,
      receiptUrl,
    }),
  );

  const foundationEmail = await render(
    FoundationNotification({
      name,
      email,
      phone,
      amount: formattedAmount,
      purpose,
      reference: receiptNumber,
      date: formattedDate,
    }),
  );

  await deliver(resend, {
    from: fromEmail,
    to: email,
    subject: "Your Official Donation Receipt | St. Hannah Foundation",
    html: donorEmail,
  });

  await deliver(resend, {
    from: fromEmail,
    to: donationEmail,
    subject: `New Donation Received • ${formattedAmount}`,
    html: foundationEmail,
  });
}

interface InternationalInterestEmailProps {
  email: string;
}

export async function sendInternationalInterestEmails({
  email,
}: InternationalInterestEmailProps) {
  const { resend, fromEmail, donationEmail } = getEmailConfig();

  const formattedDate = formatDate(new Date());

  const donorEmail = await render(
    InternationalInterest({
      email,
      date: formattedDate,
    }),
  );

  const foundationEmail = await render(
    FoundationInternationalInterest({
      email,
      date: formattedDate,
    }),
  );

  await deliver(resend, {
    from: fromEmail,
    to: email,
    subject:
      "You're on the List • International Giving | St. Hannah Foundation",
    html: donorEmail,
  });

  await deliver(resend, {
    from: fromEmail,
    to: donationEmail,
    subject: "🌍 New International Giving Interest",
    html: foundationEmail,
  });
}

export async function sendInKindDonationEmails(
  details: InKindDonationDetails & { reference: string },
) {
  const { resend, fromEmail, donationEmail } = getEmailConfig();

  const formattedDate = formatDate(new Date());

  const donorEmail = await render(
    InKindDonation({
      name: details.fullName,
      category: details.category,
      description: details.description,
      reference: details.reference,
      date: formattedDate,
    }),
  );

  const foundationEmail = await render(
    FoundationInKindDonation({
      ...details,
      date: formattedDate,
    }),
  );

  await deliver(resend, {
    from: fromEmail,
    to: details.email,
    subject: "We\'ve Received Your Donation Offer | St. Hannah Foundation",
    html: donorEmail,
  });

  await deliver(resend, {
    from: fromEmail,
    to: donationEmail,
    replyTo: details.email,
    subject: `New In-Kind Donation Offer • ${details.category}`,
    html: foundationEmail,
  });
}

export async function sendVolunteerApplicationEmails(
  details: VolunteerApplicationDetails & { reference: string },
) {
  const { resend, fromEmail, volunteerEmail } = getEmailConfig();

  const formattedDate = formatDate(new Date());

  const applicantEmail = await render(
    VolunteerApplication({
      name: details.fullName,
      areaOfInterest: details.areaOfInterest,
      reference: details.reference,
      date: formattedDate,
    }),
  );

  const foundationEmail = await render(
    FoundationVolunteerApplication({
      ...details,
      date: formattedDate,
    }),
  );

  await deliver(resend, {
    from: fromEmail,
    to: details.email,
    subject: "We\'ve Received Your Volunteer Application | St. Hannah Foundation",
    html: applicantEmail,
  });

  await deliver(resend, {
    from: fromEmail,
    to: volunteerEmail,
    replyTo: details.email,
    subject: `New Volunteer Application • ${details.fullName}`,
    html: foundationEmail,
  });
}

export async function sendAidApplicationEmails(
  details: AidApplicationDetails,
  reference: string,
) {
  const { resend, fromEmail, applicationsEmail } = getEmailConfig();

  const formattedDate = formatDate(new Date());

  const applicantEmail = await render(
    AidApplication({
      name: details.fullName,
      supportType: details.supportType,
      reference,
      date: formattedDate,
    }),
  );

  const foundationEmail = await render(
    FoundationAidApplication({
      details,
      reference,
      date: formattedDate,
    }),
  );

  await deliver(resend, {
    from: fromEmail,
    to: details.email,
    subject: "We\'ve Received Your Support Application | St. Hannah Foundation",
    html: applicantEmail,
  });

  await deliver(resend, {
    from: fromEmail,
    to: applicationsEmail,
    replyTo: details.email,
    subject: `New Support Application • ${details.supportType || "General"}`,
    html: foundationEmail,
  });
}

export async function sendContactEnquiryEmails(
  details: ContactEnquiryDetails & { reference: string },
) {
  const { resend, fromEmail, contactEmail } = getEmailConfig();

  const formattedDate = formatDate(new Date());

  const senderEmail = await render(
    ContactEnquiry({
      name: details.name,
      subject: details.subject,
      reference: details.reference,
      date: formattedDate,
    }),
  );

  const foundationEmail = await render(
    FoundationContactEnquiry({
      ...details,
      date: formattedDate,
    }),
  );

  await deliver(resend, {
    from: fromEmail,
    to: details.email,
    subject: "We\'ve Received Your Message | St. Hannah Foundation",
    html: senderEmail,
  });

  await deliver(resend, {
    from: fromEmail,
    to: contactEmail,
    replyTo: details.email,
    subject: `${details.enquiry} • ${details.subject}`,
    html: foundationEmail,
  });
}

export async function sendNewsletterSignupEmail(email: string) {
  const { resend, fromEmail, contactEmail } = getEmailConfig();

  const html = await render(
    FoundationNewsletterSignup({
      email,
      date: formatDate(new Date()),
    }),
  );

  await deliver(resend, {
    from: fromEmail,
    to: contactEmail,
    replyTo: email,
    subject: "New Newsletter Subscriber",
    html,
  });
}
