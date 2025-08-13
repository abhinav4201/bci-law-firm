"use client";

import { Menu } from "lucide-react";
import { ReactNode, useState } from "react";
import { AdminBreadcrumb } from "./AdminBreadcrumb";
import { AdminMobileNav } from "./AdminMobileNav"; // Import the new modal
import { AdminSidebar } from "./AdminSidebar";

interface User {
  displayName: string;
  email: string;
  role: "admin" | "moderator";
}

export function AdminLayoutClient({
  user,
  children,
}: {
  user: User;
  children: ReactNode;
}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className='flex h-screen bg-gray-50/50'>
      <AdminSidebar user={user} />
      <AdminMobileNav
        userRole={user.role}
        isOpen={isMobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />
      <div className='flex-1 flex flex-col overflow-hidden'>
        <header className='md:hidden bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 flex items-center'>
          <button onClick={() => setMobileMenuOpen(true)}>
            <Menu className='h-6 w-6 text-gray-700' />
          </button>
          <h1 className='text-lg font-semibold ml-4'>Admin Panel</h1>
        </header>
        <main className='flex-1 overflow-y-auto p-4 md:p-8'>
          <AdminBreadcrumb />
          {children}
        </main>
      </div>
    </div>
  );
}
