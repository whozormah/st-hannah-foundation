import { NextRequest } from "next/server";
import { pdf } from "@react-pdf/renderer";

import DonationReceiptPDF from "@/lib/pdf/DonationReceiptPDF";
import { formatCurrency, formatDate } from "@/lib/formatter";
import { generateReceiptNumber } from "@/lib/receipt";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: Promise<{ reference: string }>;
  },
) {
  try {
    const { reference } = await params;

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const result = await response.json();

    if (!result.status) {
      return new Response("Receipt not found.", {
        status: 404,
      });
    }

    const payment = result.data;

    const document = DonationReceiptPDF({
      name:
        payment.metadata?.full_name || payment.customer?.first_name || "Donor",

      email: payment.customer.email,

      amount: formatCurrency(payment.amount / 100, payment.currency),

      purpose: payment.metadata?.purpose || "General Donation",

      reference: generateReceiptNumber(payment.reference),

      date: formatDate(new Date(payment.paid_at)),
    });

    const pdfStream = await pdf(document).toBuffer();
    return new Response(pdfStream as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Donation-Receipt-${payment.reference}.pdf"`,
      },
    });
  } catch (error) {
    console.error(error);

    return new Response("Unable to generate receipt.", {
      status: 500,
    });
  }
}
