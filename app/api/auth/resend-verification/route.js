import { NextResponse } from "next/server";

const users = globalThis._froxUsers || (globalThis._froxUsers = []);
const verificationCodes = globalThis._froxVerificationCodes || (globalThis._froxVerificationCodes = new Map());
const rateLimits = globalThis._froxRateLimits || (globalThis._froxRateLimits = new Map());

function checkRateLimit(key, max = 3, windowMs = 120000) {
  const now = Date.now();
  const entry = rateLimits.get(key) || { count: 0, reset: now + windowMs };
  if (now > entry.reset) {
    entry.count = 0;
    entry.reset = now + windowMs;
  }
  entry.count++;
  rateLimits.set(key, entry);
  return entry.count <= max;
}

export async function POST(request) {
  try {
    const { email } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(`resend:${ip}`)) {
      return NextResponse.json({ error: "Too many requests. Please wait before requesting a new code." }, { status: 429 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = users.find((u) => u.email === normalizedEmail);

    if (!user || user.verified) {
      return NextResponse.json({ message: "If an account exists, a new code has been sent." });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    verificationCodes.set(normalizedEmail, { code: otp, expires: Date.now() + 10 * 60 * 1000 });

    console.log(`[Frox Auth] New verification code for ${normalizedEmail}: ${otp}`);

    return NextResponse.json({ message: "If an account exists, a new code has been sent." });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
