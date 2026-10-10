"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import AuthLayout from "@/components/auth/AuthLayout";
import OtpInput from "@/components/auth/OtpInput";

const RESEND_COOLDOWN = 60;

export default function VerifyEmailPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);
  const [resent, setResent] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    const saved = sessionStorage.getItem("frox_verify_email");
    if (saved) {
      setEmail(saved);
    } else {
      router.push("/auth/login");
    }
    return () => clearInterval(timerRef.current);
  }, [router]);

  useEffect(() => {
    if (cooldown <= 0) return;
    timerRef.current = setInterval(() => setCooldown((c) => c - 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [cooldown]);

  useEffect(() => {
    if (otp.length === 6) handleVerify();
  }, [otp]);

  const handleVerify = async () => {
    if (otp.length !== 6 || !email || loading) return;
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 429) {
          setError("Too many attempts. Please request a new code.");
        } else {
          setError(data.error || "Invalid verification code");
        }
        setOtp("");
        return;
      }

      sessionStorage.removeItem("frox_verify_email");
      const justSignedUp = sessionStorage.getItem("frox_just_signed_up") === "1";
      sessionStorage.removeItem("frox_just_signed_up");
      router.push(justSignedUp ? "/chat?onboard=1" : "/dashboard");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email || cooldown > 0) return;
    setError("");
    setResent(false);

    try {
      const res = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setResent(true);
        setCooldown(RESEND_COOLDOWN);
      } else if (res.status === 429) {
        setError("Too many requests. Please wait before requesting a new code.");
      }
    } catch {
      setError("Failed to resend. Please try again.");
    }
  };

  return (
    <AuthLayout title="Check your inbox"
      subtitle="We sent you a 6-digit code to confirm your email.">
      <div className="flex flex-col items-center justify-center space-y-6 mb-8 text-center">
        <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-2">
          <svg className="w-8 h-8 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>
        <div>
          <p className="text-sm text-textDim">Verification code sent to</p>
          <p className="font-mono text-accent font-medium mt-1">{email}</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/25 text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={(e) => { e.preventDefault(); handleVerify(); }} className="space-y-8 flex flex-col items-center">
        <OtpInput value={otp} onChange={setOtp} length={6} disabled={loading} />

        <button
          type="submit"
          className="w-full h-11 rounded-full grad-bg grad-flow text-white text-[14.5px] font-medium inline-flex items-center justify-center gap-2 shadow-[0_10px_30px_-14px_var(--accent)] transition-transform hover:scale-[1.015] active:scale-[0.99] disabled:opacity-50 disabled:hover:scale-100"
          disabled={loading || otp.length !== 6}
        >
          {loading ? (
            <span className="w-5 h-5 border-2 border-ink/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <svg className="w-4.5 h-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              Verify
            </>
          )}
        </button>

        <div className="text-center">
          {resent && !error && (
            <p className="text-sm text-green-400 mb-2">A new code has been sent to your email.</p>
          )}
          <p className="text-center text-sm text-textDim">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0 || loading}
              className="text-accent hover:text-accent/80 font-medium disabled:opacity-50 disabled:text-textFaint transition-colors"
            >
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
            </button>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
