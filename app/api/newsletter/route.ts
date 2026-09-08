import { NextRequest, NextResponse } from "next/server";

import { sendNewsletterSignupEmail } from "@/lib/email";

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !EMAIL_PATTERN.test(String(email).trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    await sendNewsletterSignupEmail(String(email).trim());

    return NextResponse.json({
      success: true,
      message: "Thank you for subscribing. You'll hear from us soon.",
    });
  } catch (error) {
    console.error("Newsletter Signup Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
