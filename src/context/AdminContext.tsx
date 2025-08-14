"use client";

import { createContext, useContext, ReactNode } from "react";

// Define the shape of the user data we'll have in the admin panel
type AdminUser = {
  uid: string;
  displayName: string;
  email: string;
  role: "admin" | "moderator";
};

const AdminContext = createContext<AdminUser | null>(null);

// This is the provider that will wrap our admin layout
export const AdminProvider = ({
  user,
  children,
}: {
  user: AdminUser;
  children: ReactNode;
}) => {
  return <AdminContext.Provider value={user}>{children}</AdminContext.Provider>;
};

// This is a custom hook to easily access the admin user's data
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === null) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};
