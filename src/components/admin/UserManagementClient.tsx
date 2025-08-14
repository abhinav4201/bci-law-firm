/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { ConfirmationModal } from "./ConfirmationModal"; // Import the new modal
import { useAdmin } from "@/context/AdminContext";

type User = {
  uid: string;
  email: string;
  displayName: string;
  role: string;
};

type ModalState = {
  isOpen: boolean;
  uid: string | null;
  newRole: string | null;
};

export function UserManagementClient({
  initialUsers,
}: {
  initialUsers: User[];
}) {
  const [users, setUsers] = useState(initialUsers);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [modalState, setModalState] = useState<ModalState>({
    isOpen: false,
    uid: null,
    newRole: null,
  });

   const currentUser = useAdmin();
  // This function now just opens the modal
  const handleRoleChangeSelect = (uid: string, newRole: string) => {
    setModalState({ isOpen: true, uid, newRole });
  };

  // This function runs when the user confirms the action in the modal
  const confirmRoleChange = async () => {
    const { uid, newRole } = modalState;
    if (!uid || !newRole) return;

    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(`/api/admin/users/${uid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) {
        throw new Error("Failed to update the role. Please try again.");
      }

      setUsers(users.map((u) => (u.uid === uid ? { ...u, role: newRole } : u)));
      alert("User role has been updated successfully!");
    } catch (err: any) {
      setError(err.message);
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ConfirmationModal
        isOpen={modalState.isOpen}
        onClose={() =>
          setModalState({ isOpen: false, uid: null, newRole: null })
        }
        onConfirm={confirmRoleChange}
        title='Change User Role'
        message={`Are you sure you want to change this user's role to "${modalState.newRole}"? This action can be reversed later.`}
      />
      <div className='bg-white p-6 rounded-lg shadow-md'>
        {error && <p className='text-red-600 mb-4'>{error}</p>}
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead className='border-b-2 border-gray-200'>
              <tr>
                <th className='p-3 font-semibold'>Display Name</th>
                <th className='p-3 font-semibold'>Email</th>
                <th className='p-3 font-semibold'>Current Role</th>
                <th className='p-3 font-semibold text-center'>Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.uid}
                  className='border-b border-gray-200 hover:bg-gray-50'
                >
                  <td className='p-3'>{user.displayName}</td>
                  <td className='p-3'>{user.email}</td>
                  <td className='p-3 capitalize'>{user.role}</td>
                  <td className='p-3 text-center'>
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChangeSelect(user.uid, e.target.value)
                      }
                      disabled={isLoading || user.uid === currentUser.uid}
                      className='p-2 border border-gray-300 rounded-md disabled:bg-gray-200 disabled:cursor-not-allowed'
                      title={
                        user.uid === currentUser.uid
                          ? "You cannot change your own role."
                          : "Change user role"
                      }
                    >
                      <option value='admin'>Admin</option>
                      <option value='moderator'>Moderator</option>
                      <option value='user'>User</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
