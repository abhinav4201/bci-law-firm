import { UserManagementClient } from "@/components/admin/UserManagementClient";
import { adminAuth } from "@/lib/firebaseAdmin";

// Server component to fetch initial user list
export default async function ManageUsersPage() {
  const listUsersResult = await adminAuth.listUsers(100);
  const initialUsers = listUsersResult.users.map((user) => ({
    uid: user.uid,
    email: user.email || "No email",
    displayName: user.displayName || "No name",
    role: (user.customClaims?.role as string) || "user",
  }));

  return (
    <div>
      <h1 className='text-3xl font-bold mb-6'>User Management</h1>
      <UserManagementClient initialUsers={initialUsers} />
    </div>
  );
}
