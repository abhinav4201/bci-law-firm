import {
  LayoutDashboard,
  Users,
  FileText,
  Mail,
  BookText,
  Settings,
} from "lucide-react";

// This function is the single source of truth for our navigation links.
export const getAdminNavLinks = (role: "admin" | "moderator") => {
  const allLinks = [
    {
      name: "Dashboard",
      href: "/admin/dashboard",
      icon: LayoutDashboard,
      roles: ["admin", "moderator"],
    },
    {
      name: "Blog",
      href: "/admin/posts",
      icon: FileText,
      roles: ["admin", "moderator"],
    },
    {
      name: "Legal Guides",
      href: "/admin/guides",
      icon: BookText,
      roles: ["admin", "moderator"],
    },
    {
      name: "Enquiries",
      href: "/admin/enquiries",
      icon: Mail,
      roles: ["admin", "moderator"],
    },
    { name: "Users", href: "/admin/users", icon: Users, roles: ["admin"] },
    {
      name: "Settings",
      href: "/admin/settings",
      icon: Settings,
      roles: ["admin"],
    },
  ];

  // Filter the links based on the user's role
  return allLinks.filter((link) => link.roles.includes(role));
};
