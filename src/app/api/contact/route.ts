import { NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Validate the request body against the Zod schema
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      // If validation fails, return a detailed error response
      return NextResponse.json(
        { errors: validation.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, phone } = validation.data;

    // Here, you would integrate your email sending service (e.g., Resend, Nodemailer)
    console.log("Validated Enquiry Received:");
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Phone:", phone);

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
