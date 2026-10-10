import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const users = globalThis._froxUsers || (globalThis._froxUsers = []);
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

function generateToken() {
  return Array.from(crypto.getRandomValues(new Uint8Array(24)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function POST(request) {
  try {
    const { email, password, remember } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(`login:${ip}`)) {
      return NextResponse.json({ error: "Too many login attempts. Please try again later." }, { status: 429 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = users.find((u) => u.email === normalizedEmail);

    if (!user || user.passwordHash !== hashPassword(password)) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    if (!user.verified) {
      return NextResponse.json({ error: "Email not verified. Please check your inbox." }, { status: 403 });
    }

    const accessToken = generateToken();
    const refreshToken = generateToken();
    const expiry = remember ? 30 : 7;

    refreshTokens.push({
      token: refreshToken,
      userId: user.id,
      expires: Date.now() + expiry * 24 * 60 * 60 * 1000,
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
      maxAge: 60 * 60 * 24 * expiry,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
