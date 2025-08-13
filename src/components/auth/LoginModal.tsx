 
"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation"; // Import useRouter for redirection

export const LoginModal = () => {
  const { isLoginModalOpen, closeLoginModal, setUser } = useAuth();
  const router = useRouter(); // Initialize router
  const [view, setView] = useState<"initial" | "admin" | "moderator">(
    "initial"
  );
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      // Send token and necessary info to our backend API
      const response = await fetch("/api/auth/assign-role", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idToken,
          selectedRole: view,
          password: view === "moderator" ? password : null, // Send password only if moderator
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setUser(result.user); // Update global state
        closeModal();
        router.push("/admin/dashboard"); // Redirect to dashboard
      } else {
        // Log out the user if role assignment failed
        await auth.signOut();
        setError(data.error || "Failed to assign role. Access denied.");
      }
    } catch (err) {
      setError("Failed to sign in with Google.");
      console.error(err);
    }
  };

  const handleModeratorPassword = async () => {
    setError("");
    const response = await fetch("/api/auth/verify-moderator", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();

    if (data.success) {
      setShowGoogleSignIn(true);
    } else {
      setError("Incorrect moderator password.");
    }
  };

  const closeModal = () => {
    setView("initial");
    setPassword("");
    setError("");
    setShowGoogleSignIn(false);
    closeLoginModal();
  };

  if (!isLoginModalOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center'>
      <div className='bg-white p-8 rounded-lg shadow-xl w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Admin Access</h2>
        {view === "initial" && (
          <div className='flex flex-col space-y-4'>
            <button
              onClick={() => setView("admin")}
              className='bg-brand-primary text-white p-3 rounded-lg'
            >
              I am the Admin
            </button>
            <button
              onClick={() => setView("moderator")}
              className='bg-gray-200 p-3 rounded-lg'
            >
              I am a Moderator
            </button>
          </div>
        )}
        {view === "admin" && (
          <button
            onClick={handleGoogleSignIn}
            className='bg-red-500 text-white p-3 rounded-lg w-full'
          >
            Sign in with Google
          </button>
        )}
        {view === "moderator" && !showGoogleSignIn && (
          <div className='space-y-4'>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder='Enter Moderator Password'
              className='w-full p-3 border rounded-lg'
            />
            <button
              onClick={handleModeratorPassword}
              className='bg-brand-primary text-white p-3 rounded-lg w-full'
            >
              Verify
            </button>
          </div>
        )}
        {view === "moderator" && showGoogleSignIn && (
          <button
            onClick={handleGoogleSignIn}
            className='bg-red-500 text-white p-3 rounded-lg w-full'
          >
            Sign in with Google
          </button>
        )}
        {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
        <button
          onClick={closeModal}
          className='mt-6 w-full text-center text-gray-500'
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
