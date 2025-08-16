import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function POST(request: Request) {
  const sessionCookie = (await cookies()).get("session")?.value;
  if (!sessionCookie) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    );

    // --- SECURITY CHECK: Only allow admins to perform this action ---
    if (decodedClaims.role !== "admin") {
      return NextResponse.json(
        {
          error:
            "Forbidden: You do not have permission to perform this action.",
        },
        { status: 403 }
      );
    }

    const { moderatorPassword } = await request.json();

    if (
      !moderatorPassword ||
      typeof moderatorPassword !== "string" ||
      moderatorPassword.length < 8
    ) {
      return NextResponse.json(
        { error: "Password must be a string of at least 8 characters." },
        { status: 400 }
      );
    }

    // Update the password in Firestore
    const configRef = adminDb.collection("config").doc("passwords");
    await configRef.set({ moderatorPassword }, { merge: true });

    return NextResponse.json({
      success: true,
      message: "Moderator password updated successfully.",
    });
  } catch (error) {
    console.error("Error updating config:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
