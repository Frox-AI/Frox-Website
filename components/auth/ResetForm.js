"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";

export default function ResetForm({ token: initialToken = "" }) {
  const router = useRouter();
  const [token, setToken] = useState(initialToken);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      setError("Reset token is missing from the URL.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to reset password. Link may be expired.");
        return;
      }

      router.push("/auth/login?reset=success");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Choose a new password"
      subtitle="Make it long and memorable — that's the whole rule.">
      {!token ? (
        <div className="text-center py-8">
          <p className="text-red-400 mb-6">Invalid or missing reset token.</p>
          <Link href="/auth/forgot-password" className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Request a new link
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium text-textDim">New Password</label>
            <PasswordInput
              id="password"
              placeholder="Min. 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              showStrength
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="text-sm font-medium text-textDim">Confirm Password</label>
            <PasswordInput
              id="confirmPassword"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading || !password || !confirmPassword}
            className="w-full h-11 rounded-full grad-bg grad-flow text-white text-[14.5px] font-medium inline-flex items-center justify-center gap-2 shadow-[0_10px_30px_-14px_var(--accent)] transition-transform hover:scale-[1.015] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-ink/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Confirm New Password"
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}
