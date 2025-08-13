/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebaseAdmin";

// POST: Create a session cookie
export async function POST(request: Request) {
  const { idToken } = await request.json();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days

  try {
    const sessionCookie = await adminAuth.createSessionCookie(idToken, {
      expiresIn,
    });
    (await cookies()).set("session", sessionCookie, {
      httpOnly: true,
      secure: true,
      maxAge: expiresIn,
    });
    return NextResponse.json({ status: "success" });
  } catch (error) {
    return NextResponse.json({ status: "error" }, { status: 401 });
  }
}

// DELETE: Clear the session cookie on logout
export async function DELETE() {
  (await cookies()).delete("session");
  return NextResponse.json({ status: "success" });
}
