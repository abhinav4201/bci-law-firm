"use client";

import Link from "next/link";
import { LayoutDashboard, Users, FileText, X, LogOut } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/firebase";

interface AdminMobileNavProps {
  userRole: "admin" | "moderator";
  isOpen: boolean;
  onClose: () => void;
}

export const AdminMobileNav = ({
  userRole,
  isOpen,
  onClose,
}: AdminMobileNavProps) => {
  const pathname = usePathname();
  const router = useRouter();

  if (!isOpen) return null;

  const handleLogout = async () => {
    await auth.signOut();
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/");
  };

  const navLinks = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Posts", href: "/admin/posts", icon: FileText },
    ...(userRole === "admin"
      ? [{ name: "Users", href: "/admin/users", icon: Users }]
      : []),
  ];

  return (
    <div className='fixed inset-0 z-50 md:hidden' onClick={onClose}>
      <div className='absolute inset-0 bg-white/30 backdrop-blur-sm'></div>
      <div
        className='relative bg-white shadow-lg w-4/5 max-w-xs h-full p-6 flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className='absolute top-4 right-4 p-1 text-gray-500'
        >
          <X size={24} />
        </button>
        <h2 className='text-xl font-bold mb-8'>Admin Menu</h2>
        <nav className='flex-grow'>
          <ul className='space-y-2'>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`flex items-center p-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? "bg-brand-primary text-white"
                        : "text-gray-700 hover:bg-gray-100"
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
        <button
          onClick={handleLogout}
          className='flex items-center p-3 w-full rounded-lg text-base font-medium text-gray-700 hover:bg-gray-100'
        >
          <LogOut className='h-5 w-5 mr-3' />
          Logout
        </button>
      </div>
    </div>
  );
};
