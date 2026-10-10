import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const users = globalThis._froxUsers || (globalThis._froxUsers = []);
const verificationCodes = globalThis._froxVerificationCodes || (globalThis._froxVerificationCodes = new Map());
const refreshTokens = globalThis._froxRefreshTokens || (globalThis._froxRefreshTokens = []);
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

function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request) {
  try {
    const { email, otp } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(`verify:${ip}`)) {
      return NextResponse.json({ error: "Too many attempts. Please request a new code." }, { status: 429 });
    }

    if (!email || !otp) {
      return NextResponse.json({ error: "Email and code are required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const record = verificationCodes.get(normalizedEmail);

    if (!record) {
      return NextResponse.json({ error: "No verification code found. Please register again." }, { status: 400 });
    }

    if (Date.now() > record.expires) {
      verificationCodes.delete(normalizedEmail);
      return NextResponse.json({ error: "Code has expired. Please request a new one." }, { status: 410 });
    }

    if (record.code !== otp) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    const user = users.find((u) => u.email === normalizedEmail);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    user.verified = true;
    verificationCodes.delete(normalizedEmail);

    const accessToken = generateToken();
    const refreshToken = generateToken();

    refreshTokens.push({
      token: refreshToken,
      userId: user.id,
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    });

    const res = NextResponse.json({
      accessToken,
      user: { id: user.id, email: user.email, fullName: user.fullName },
    });

    cookies().set("frox_access", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    cookies().set("frox_refresh", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
