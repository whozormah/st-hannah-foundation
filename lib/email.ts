import { Resend } from "resend";
import { render } from "@react-email/render";

import {
  DonationReceipt,
  FoundationNotification,
  InternationalInterest,
  FoundationInternationalInterest,
} from "@/emails";

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
  };
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

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject: "Your Official Donation Receipt | St. Hannah Foundation",
    html: donorEmail,
  });

  await resend.emails.send({
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

  await resend.emails.send({
    from: fromEmail,
    to: email,
    subject:
      "You're on the List • International Giving | St. Hannah Foundation",
    html: donorEmail,
  });

  await resend.emails.send({
    from: fromEmail,
    to: donationEmail,
    subject: "🌍 New International Giving Interest",
    html: foundationEmail,
  });
}
