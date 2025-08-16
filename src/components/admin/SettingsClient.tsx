/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, FormEvent } from "react";

export function SettingsClient() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (password.length < 8) {
      setMessage({
        type: "error",
        text: "Password must be at least 8 characters long.",
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match." });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moderatorPassword: password }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "An unknown error occurred.");
      }

      setMessage({ type: "success", text: result.message });
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='max-w-2xl'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-2xl font-bold mb-4 text-brand-primary'>
          Update Moderator Password
        </h2>
        <p className='text-muted mb-6'>
          This password is required for users to log in with the &quot;Moderator&quot;
          role. Changing it will immediately affect all future moderator logins.
        </p>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label
              htmlFor='new-password'
              className='block text-sm font-medium text-gray-700'
            >
              New Moderator Password
            </label>
            <input
              type='password'
              id='new-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary'
              required
              minLength={8}
            />
          </div>
          <div>
            <label
              htmlFor='confirm-password'
              className='block text-sm font-medium text-gray-700'
            >
              Confirm New Password
            </label>
            <input
              type='password'
              id='confirm-password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-brand-primary focus:ring-brand-primary'
              required
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-md text-sm ${
                message.type === "success"
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {message.text}
            </div>
          )}

          <div className='flex justify-end'>
            <button
              type='submit'
              disabled={isLoading}
              className='bg-brand-primary text-white px-6 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:bg-gray-400'
            >
              {isLoading ? "Updating..." : "Update Password"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
