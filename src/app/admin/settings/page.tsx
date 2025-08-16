import { SettingsClient } from "@/components/admin/SettingsClient";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { adminAuth } from "@/lib/firebaseAdmin";

// This page is protected by the layout, but we add an extra layer of protection here.
export default async function SettingsPage() {
  const sessionCookie = (await cookies()).get("session")?.value;

  if (!sessionCookie) {
    redirect("/admin/dashboard");
  }

  const decodedClaims = await adminAuth.verifySessionCookie(
    sessionCookie,
    true
  );

  // Redirect if a non-admin tries to access this page directly
  if (decodedClaims.role !== "admin") {
    redirect("/admin/dashboard");
  }

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>Admin Settings</h1>
      <SettingsClient />
    </div>
  );
}
