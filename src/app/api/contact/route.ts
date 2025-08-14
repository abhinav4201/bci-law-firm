import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";
import { adminDb } from "@/lib/firebaseAdmin";
import { serverTimestamp } from "firebase/firestore";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone } = validation.data;

    // --- NEW: Save to Firestore ---
    await adminDb.collection("enquiries").add({
      name,
      email,
      phone,
      submittedAt: serverTimestamp(),
    });
    // --- END NEW ---

    // You can still add your email sending service here later
    console.log("Validated Enquiry Received and Saved:", validation.data);

    return NextResponse.json({
      message: "Your message has been sent successfully.",
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
