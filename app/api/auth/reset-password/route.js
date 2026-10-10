import { NextResponse } from "next/server";

const users = globalThis._froxUsers || (globalThis._froxUsers = []);
const resetTokens = globalThis._froxResetTokens || (globalThis._froxResetTokens = new Map());
const rateLimits = globalThis._froxRateLimits || (globalThis._froxRateLimits = new Map());

function checkRateLimit(key, max = 5, windowMs = 60000) {
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

function hashPassword(pw) {
  let hash = 0;
  const salted = `frox_salt_${pw}_v1`;
  for (let i = 0; i < salted.length; i++) {
    const char = salted.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(36);
}

export async function POST(request) {
  try {
    const { token, password } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(`reset:${ip}`)) {
      return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
    }

    if (!token || !password) {
      return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const record = resetTokens.get(token);
    if (!record) {
      return NextResponse.json({ error: "Invalid or expired reset token" }, { status: 400 });
    }

    if (Date.now() > record.expires) {
      resetTokens.delete(token);
      return NextResponse.json({ error: "Reset link has expired. Please request a new one." }, { status: 410 });
    }

    const user = users.find((u) => u.email === record.email);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.passwordHash = hashPassword(password);
    resetTokens.delete(token);

    return NextResponse.json({ message: "Password has been reset successfully." });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
