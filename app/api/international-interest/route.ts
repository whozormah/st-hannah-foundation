import { NextRequest, NextResponse } from "next/server";

import { sendInternationalInterestEmails } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        { status: 400 },
      );
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    await sendInternationalInterestEmails({
      email,
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you! We'll notify you as soon as international giving becomes available.",
    });
  } catch (error) {
    console.error("International Interest Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      {
        status: 500,
      },
    );
  }
}
