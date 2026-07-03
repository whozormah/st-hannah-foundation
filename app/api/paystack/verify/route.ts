import { NextRequest, NextResponse } from "next/server";
import { sendDonationEmails } from "@/lib/email";

export async function POST(req: NextRequest) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment reference is required.",
        },
        { status: 400 },
      );
    }

    const response = await fetch(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json(
        {
          success: false,
          message: data.message,
        },
        { status: 400 },
      );
    }

    const payment = data.data;

    if (payment.status === "success") {
      try {
        await sendDonationEmails({
          name:
            payment.metadata?.full_name ||
            payment.customer?.first_name ||
            "Donor",

          email: payment.customer.email,

          phone: payment.metadata?.phone || "",

          amount: payment.amount / 100,

          currency: payment.currency,

          purpose: payment.metadata?.purpose || "General Donation",

          reference: payment.reference,
        });

        console.log("Donation emails sent successfully.");
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("Verification Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to verify payment.",
      },
      { status: 500 },
    );
  }
}
