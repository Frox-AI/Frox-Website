"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthLayout from "@/components/auth/AuthLayout";
import PasswordInput from "@/components/auth/PasswordInput";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fullName || !email || !password || !agree) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email: email.toLowerCase().trim(), password }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError("Too many attempts. Please wait before trying again.");
        } else {
          setError(data.error || "Registration failed");
        }
        return;
      }

      sessionStorage.setItem("frox_verify_email", email.toLowerCase().trim());
      sessionStorage.setItem("frox_just_signed_up", "1");
      router.push("/auth/verify-email");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Create your account"
      subtitle="$10 in free credit. No card required.">
      <form onSubmit={handleSubmit} className="space-y-5">
        {error && (
          <div className="px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="fullName" className="text-sm font-medium text-textDim">Full Name</label>
          <input
            id="fullName"
            placeholder="Jane Doe"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={loading}
            className="w-full h-11 px-4 rounded-lg bg-bgElev border border-border text-text text-sm outline-none focus:border-accent/60 transition-colors disabled:opacity-50"
            required
          />
        </div>

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

        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-textDim">Password</label>
          <PasswordInput
            id="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
            showStrength
          />
        </div>

        <label className="flex items-start gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-border bg-bgElev accent-accent"
          />
          <span className="text-sm text-textDim">
            I agree to the{" "}
            <Link href="/legal/terms" className="text-accent hover:underline">Terms of Service</Link>
            {" "}and{" "}
            <Link href="/legal/privacy" className="text-accent hover:underline">Privacy Policy</Link>
          </span>
        </label>

        <button
          type="submit"
          disabled={loading || !fullName || !email || !password || !agree}
          className="w-full h-11 rounded-full grad-bg grad-flow text-white text-[14.5px] font-medium inline-flex items-center justify-center gap-2 shadow-[0_10px_30px_-14px_var(--accent)] transition-transform hover:scale-[1.015] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-ink/30 border-t-white rounded-full animate-spin" />
          ) : (
            "Create Account"
          )}
        </button>

        <p className="text-center text-[14px] text-textDim mt-6">
          Already have an account?{" "}
          <Link href="/auth/login" className="text-accent font-medium hover:underline underline-offset-4">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
