import { NextRequest, NextResponse } from "next/server";

import { sendInKindDonationEmails } from "@/lib/email";
import {
  deliverNotifications,
  nextReference,
  persistSubmission,
  storeSubmissionPhoto,
} from "@/lib/submissions";

const REQUIRED_FIELDS = [
  "fullName",
  "email",
  "phone",
  "category",
  "description",
] as const;

const EMAIL_PATTERN = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const missing = REQUIRED_FIELDS.filter(
      (field) => !String(body?.[field] ?? "").trim(),
    );

    if (missing.length) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    if (!EMAIL_PATTERN.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 },
      );
    }

    const reference = await nextReference("SHF");

    /* OPS-03: the photograph the form asks for is finally stored, in the
       private collection rather than any public path (SEC-07). A rejected or
       oversized image must not cost the donor their submission, so a failure
       here is logged and the offer is saved regardless. */
    const photo = await storeSubmissionPhoto(body.image, reference);

    const details = {
      fullName: body.fullName,
      email: body.email,
      phone: body.phone,
      category: body.category,
      description: body.description,
      quantity: body.quantity ?? "",
      condition: body.condition ?? "",
      location: body.customLocation?.trim() || body.location || "",
      deliveryMethod: body.deliveryMethod ?? "",
      pickupAddress: body.pickupAddress,
      contactMethod: body.contactMethod,
      pickupDate: body.pickupDate,
      pickupTime: body.pickupTime,
      pickupInstructions: body.pickupInstructions,
      destination: body.destination,
      acknowledgeDonation: body.acknowledgeDonation ?? "No",
    };

    // OPS-01: saved before anything is sent.
    await persistSubmission("in-kind-offers", {
      reference,
      ...details,
      ...(photo ? { photo } : {}),
      status: "new",
    });

    await deliverNotifications("in-kind", reference, () =>
      sendInKindDonationEmails({ reference, ...details }),
    );

    return NextResponse.json({
      success: true,
      reference,
      message:
        "Thank you. Your donation offer has been received and our team will be in touch shortly.",
    });
  } catch (error) {
    console.error("In-Kind Donation Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 },
    );
  }
}
