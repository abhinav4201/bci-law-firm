import { NextResponse } from "next/server";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ uid: string }> }
) {
  try {
    const { uid } = await params;
    const { role } = await request.json();

    // Validate the role to ensure it's one of the allowed types
    if (!["admin", "moderator", "user"].includes(role)) {
      return NextResponse.json(
        { error: "Invalid role specified." },
        { status: 400 }
      );
    }

    // Set the custom claim, which is the source of truth for security rules
    await adminAuth.setCustomUserClaims(uid, { role });

    // Update the Firestore document to keep the UI in sync
    await adminDb.collection("users").doc(uid).update({ role });

    return NextResponse.json({
      success: true,
      message: `User role updated to ${role}.`,
    });
  } catch (error) {
    console.error(`Error updating role for user:`, error);
    return NextResponse.json(
      { error: "Failed to update user role." },
      { status: 500 }
    );
  }
}
