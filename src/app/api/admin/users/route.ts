import { NextResponse } from "next/server";
import { adminAuth } from "@/lib/firebaseAdmin";

export async function GET() {
  try {
    const listUsersResult = await adminAuth.listUsers(100);
    const users = listUsersResult.users.map((user) => ({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: user.customClaims?.role || "user",
    }));
    return NextResponse.json(users);
  } catch (error) {
    // The 'error' variable is now used for logging
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
