import { NextResponse } from "next/server";

const users = globalThis._froxUsers || (globalThis._froxUsers = []);
const resetTokens = globalThis._froxResetTokens || (globalThis._froxResetTokens = new Map());
const rateLimits = globalThis._froxRateLimits || (globalThis._froxRateLimits = new Map());

function checkRateLimit(key, max = 3, windowMs = 300000) {
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

    if (!checkRateLimit(`forgot:${ip}`)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
    }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = users.find((u) => u.email === normalizedEmail);

    if (user) {
      const token = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map((b) => b.toString(16).padStart(2, "0"))
        .join("");
      resetTokens.set(token, { email: normalizedEmail, expires: Date.now() + 15 * 60 * 1000 });
      console.log(`[Frox Auth] Password reset link: /auth/reset-password?token=${token}`);
    }

    return NextResponse.json({ message: "If an account exists with this email, a reset link has been sent." });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
