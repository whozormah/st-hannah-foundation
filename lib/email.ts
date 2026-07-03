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

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

const FROM_EMAIL = process.env.FROM_EMAIL;
const DONATION_EMAIL = process.env.DONATION_EMAIL;

if (!FROM_EMAIL) {
  throw new Error("FROM_EMAIL environment variable is not configured.");
}

if (!DONATION_EMAIL) {
  throw new Error("DONATION_EMAIL environment variable is not configured.");
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
  const receiptNumber = generateReceiptNumber(reference);

  const formattedAmount = formatCurrency(amount, currency);

  const formattedDate = formatDate(new Date());

  const receiptUrl = `${SITE_URL}/donate/receipt/${reference}`;

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
    from: FROM_EMAIL,
    to: email,
    subject: "Your Official Donation Receipt | St. Hannah Foundation",
    html: donorEmail,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: DONATION_EMAIL,
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
    from: FROM_EMAIL,
    to: email,
    subject:
      "You're on the List • International Giving | St. Hannah Foundation",
    html: donorEmail,
  });

  await resend.emails.send({
    from: FROM_EMAIL,
    to: DONATION_EMAIL,
    subject: "🌍 New International Giving Interest",
    html: foundationEmail,
  });
}
