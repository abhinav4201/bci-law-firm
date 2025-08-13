"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  uid: string;
  email: string;
  displayName: string;
  role: string;
};

export function UserManagementClient({
  initialUsers,
}: {
  initialUsers: User[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const router = useRouter();

  const handleRoleChange = async (uid: string, newRole: string) => {
    // This functionality would require another API route to set custom claims.
    // This is a complex and security-sensitive operation.
    alert(`In a real app, this would change user ${uid} to role ${newRole}.`);
  };

  return (
    <div className='bg-white p-6 rounded-lg shadow'>
      <div className='overflow-x-auto'>
        <table className='w-full text-left'>
          <thead>
            <tr className='border-b'>
              <th className='p-2'>Display Name</th>
              <th className='p-2'>Email</th>
              <th className='p-2'>Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.uid} className='border-b hover:bg-gray-50'>
                <td className='p-2 font-medium'>{user.displayName}</td>
                <td className='p-2'>{user.email}</td>
                <td className='p-2 capitalize'>{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
