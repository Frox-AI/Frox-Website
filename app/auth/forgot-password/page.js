"use client";
import { useState } from "react";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      if (res.status === 429) {
        setError("Too many attempts. Please wait before trying again.");
      } else if (res.ok || res.status === 404) {
        // Always show success to prevent email enumeration
        setSubmitted(true);
      } else {
        setError("Failed to process request. Please try again.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Reset your password"
      subtitle="We'll email you a secure link to get back in.">
      {!submitted ? (
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-textDim">Work Email</label>
            <input
              id="email"
              type="email"
              placeholder="admin@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              className="w-full h-11 px-4 rounded-lg bg-bgElev border border-border text-text text-sm font-mono outline-none focus:border-accent/60 transition-colors disabled:opacity-50"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading || !email}
            className="w-full h-11 rounded-full grad-bg grad-flow text-white text-[14.5px] font-medium inline-flex items-center justify-center gap-2 shadow-[0_10px_30px_-14px_var(--accent)] transition-transform hover:scale-[1.015] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-ink/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Send reset link"
            )}
          </button>

          <div className="text-center mt-6">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-textDim hover:text-text transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Return to login
            </Link>
          </div>
        </form>
      ) : (
        <div className="text-center space-y-6 py-4">
          <div className="p-4 bg-accent/10 rounded-lg border border-accent/20 inline-block mb-2">
            <p className="text-accent font-mono text-sm">Dispatched to {email}</p>
          </div>
          <h3 className="text-xl font-bold">Check your inbox</h3>
          <p className="text-textDim">
            If an account exists with this email, we&apos;ve sent instructions to reset your password. The link expires in 15 minutes.
          </p>
          <div className="pt-6">
            <Link href="/auth/login" className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Return to login
            </Link>
          </div>
        </div>
      )}
    </AuthLayout>
  );
}
