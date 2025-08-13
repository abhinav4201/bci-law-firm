"use client";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export const handleLogout = async () => {
  const router = useRouter();
  await auth.signOut();
  await fetch("/api/auth/session", { method: "DELETE" });
  router.push("/");
};
