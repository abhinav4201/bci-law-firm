import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient"; // Import the new client component

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    redirect("/");
  }

  try {
    const decodedClaims = await adminAuth.verifySessionCookie(
      sessionCookie,
      true
    );
    const userDoc = await adminDb
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    const userData = userDoc.data();

    if (!userData || !["admin", "moderator"].includes(userData.role)) {
      throw new Error("Insufficient permissions");
    }

    const user = {
      displayName: userData.displayName,
      email: userData.email,
      role: userData.role,
    };

    // The server component's only job is to fetch data and pass it to the client component
    return <AdminLayoutClient user={user}>{children}</AdminLayoutClient>;
  } catch (error) {
    console.error("Admin layout auth error:", error);
    redirect("/");
  }
}
