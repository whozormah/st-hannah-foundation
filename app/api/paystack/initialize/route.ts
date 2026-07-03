import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, amount, currency, purpose } = await req.json();

    if (!name || !email || !amount || !currency || !purpose) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    const response = await fetch(
      "https://api.paystack.co/transaction/initialize",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          amount: Math.round(amount * 100), // Paystack expects the smallest currency unit
          currency,

          callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/donate/success`,

          metadata: {
            full_name: name,
            phone,
            purpose,
          },
        }),
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

    return NextResponse.json({
      success: true,
      authorization_url: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error) {
    console.error("Paystack Initialize Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to initialize payment.",
      },
      { status: 500 },
    );
  }
}
