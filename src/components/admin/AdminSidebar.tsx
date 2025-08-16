"use client";

import Link from "next/link";
// Add 'Settings' to the lucide-react import
import {
  LayoutDashboard,
  Users,
  FileText,
  LogOut,
  Mail,
  BookText,
  Settings,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

interface User {
  displayName: string;
  email: string;
  role: "admin" | "moderator";
}

export const AdminSidebar = ({ user }: { user: User }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/");
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Blog", href: "/admin/posts", icon: FileText },
    { name: "Legal Guides", href: "/admin/guides", icon: BookText },
    { name: "Enquiries", href: "/admin/enquiries", icon: Mail },
    // --- UPDATED: Conditionally add Users and Settings for Admin ---
    ...(user.role === "admin"
      ? [
          { name: "Users", href: "/admin/users", icon: Users },
          { name: "Settings", href: "/admin/settings", icon: Settings },
        ]
      : []),
  ];

  return (
    <aside className='hidden md:flex flex-col w-64 bg-white border-r border-gray-200'>
      <div className='p-4 border-b border-gray-200'>
        <h2 className='text-lg font-bold'>{user.displayName}</h2>
        <span className='text-xs bg-teal-100 text-teal-800 font-semibold px-2 py-0.5 rounded-full mt-2 inline-block capitalize'>
          {user.role}
        </span>
      </div>
      <nav className='flex-grow p-4'>
        <ul className='space-y-1'>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`flex items-center p-2 my-1 rounded-md text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-primary text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <link.icon className='h-5 w-5 mr-3' />
                  {link.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className='p-4 border-t border-gray-200'>
        {/* CORRECTED: The onClick handler is now correctly attached */}
        <button
          onClick={handleLogout}
          className='flex items-center p-2 w-full rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100'
        >
          <LogOut className='h-5 w-5 mr-3' />
          Logout
        </button>
      </div>
    </aside>
  );
};
