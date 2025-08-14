import { UserManagementClient } from "@/components/admin/UserManagementClient";
import { adminAuth } from "@/lib/firebaseAdmin";

export default async function ManageUsersPage() {
  const listUsersResult = await adminAuth.listUsers(100);
  const initialUsers = listUsersResult.users.map((user) => ({
    uid: user.uid,
    email: user.email || "No email provided",
    displayName: user.displayName || "Anonymous User",
    role: (user.customClaims?.role as string) || "user",
  }));

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>User Management</h1>
      {/* No longer needs to pass the current user down */}
      <UserManagementClient initialUsers={initialUsers} />
    </div>
  );
}
