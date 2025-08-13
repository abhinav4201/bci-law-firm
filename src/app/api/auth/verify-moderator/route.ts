import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebaseAdmin";
// We no longer need bcrypt here

export async function POST(request: Request) {
  try {
    const { password } = await request.json();

    if (!password) {
      return NextResponse.json(
        { success: false, error: "Password is required" },
        { status: 400 }
      );
    }

    const configDoc = await adminDb.collection("config").doc("passwords").get();
    if (!configDoc.exists) {
      throw new Error("Password config not found");
    }
    const moderatorPasswordFromDb = configDoc.data()?.moderatorPassword;

    // Direct string comparison instead of hashing
    const isMatch = password === moderatorPasswordFromDb;

    return NextResponse.json({ success: isMatch });
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
