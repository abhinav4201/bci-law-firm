import { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth, adminDb } from "@/lib/firebaseAdmin";
import { AdminLayoutClient } from "@/components/admin/AdminLayoutClient";
import { AdminProvider } from "@/context/AdminContext"; // Import the new provider

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
      uid: decodedClaims.uid,
      displayName: userData.displayName,
      email: userData.email,
      role: userData.role,
    };

    return (
      // The fetched user data is passed to the provider here
      <AdminProvider user={user}>
        <AdminLayoutClient user={user}>{children}</AdminLayoutClient>
      </AdminProvider>
    );
  } catch (error) {
    console.error("Admin layout auth error:", error);
    redirect("/");
  }
}
