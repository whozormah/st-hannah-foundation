import { NextRequest, NextResponse } from "next/server";

import { sendContactEnquiryEmails } from "@/lib/email";
import { generateReferenceNumber } from "@/lib/receipt";

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const name = String(body?.name ?? "").trim();
    const email = String(body?.email ?? "").trim();
    const subject = String(body?.subject ?? "").trim();
    const message = String(body?.message ?? "").trim();
    const enquiry = String(body?.enquiry ?? "").trim() || "General Enquiry";

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const reference = generateReferenceNumber("SHC");

    await sendContactEnquiryEmails({
      reference,
      name,
      email,
      subject,
      enquiry,
      message,
    });

    return NextResponse.json({
      success: true,
      reference,
      message: "Thank you. Your message has been sent.",
    });
  } catch (error) {
    console.error("Contact Enquiry Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
