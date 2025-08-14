import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { NextResponse } from "next/server";
// We no longer need bcrypt here

export async function POST(request: Request) {
  try {
    const { idToken, selectedRole, password } = await request.json();
    if (!idToken) {
      return NextResponse.json(
        { success: false, error: "Authentication token not provided." },
        { status: 400 }
      );
    }

    const decodedToken = await adminAuth.verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    const userRef = adminDb.collection("users").doc(uid);
    const userDoc = await userRef.get();

    if (userDoc.exists) {
      return NextResponse.json({
        success: true,
        message: "User role already assigned.",
      });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    let finalRole = "user";

    if (selectedRole === "admin" && email === adminEmail) {
      finalRole = "admin";
    } else if (selectedRole === "moderator") {
      const configDoc = await adminDb
        .collection("config")
        .doc("passwords")
        .get();
      const moderatorPasswordFromDb = configDoc.data()?.moderatorPassword;

      // Direct string comparison
      if (password === moderatorPasswordFromDb) {
        finalRole = "moderator";
      } else {
        return NextResponse.json(
          { success: false, error: "Moderator password verification failed." },
          { status: 403 }
        );
      }
    }
    await adminAuth.setCustomUserClaims(uid, { role: finalRole });
    await userRef.set({
      uid,
      email,
      displayName: name || "N/A",
      photoURL: picture || null,
      role: finalRole,
    });

    return NextResponse.json({ success: true, role: finalRole });
  } catch (error) {
    console.error("Role assignment error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
