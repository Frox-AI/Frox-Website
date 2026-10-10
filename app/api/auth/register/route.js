import { NextResponse } from "next/server";

const users = globalThis._froxUsers || (globalThis._froxUsers = []);
const verificationCodes = globalThis._froxVerificationCodes || (globalThis._froxVerificationCodes = new Map());
const rateLimits = globalThis._froxRateLimits || (globalThis._froxRateLimits = new Map());

function checkRateLimit(key, max = 3, windowMs = 60000) {
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

const DISPOSABLE_DOMAINS = ["mailinator.com", "tempmail.com", "10minutemail.com", "guerrillamail.com", "yopmail.com"];

export async function POST(request) {
  try {
    const { fullName, email, password } = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "unknown";

    if (!checkRateLimit(`register:${ip}`)) {
      return NextResponse.json({ error: "Too many registration attempts. Please try again later." }, { status: 429 });
    }

    if (!fullName || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters" }, { status: 400 });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const domain = normalizedEmail.split("@")[1];

    if (DISPOSABLE_DOMAINS.includes(domain)) {
      return NextResponse.json({ error: "Disposable email addresses are not allowed" }, { status: 400 });
    }

    if (users.find((u) => u.email === normalizedEmail)) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const otp = String(Math.floor(100000 + Math.random() * 900000));
    const user = {
      id: crypto.randomUUID(),
      fullName,
      email: normalizedEmail,
      passwordHash: hashPassword(password),
      verified: false,
      createdAt: new Date().toISOString(),
    };

    users.push(user);
    verificationCodes.set(normalizedEmail, { code: otp, expires: Date.now() + 10 * 60 * 1000 });

    console.log(`[Frox Auth] Verification code for ${normalizedEmail}: ${otp}`);

    return NextResponse.json({ message: "Registration successful. Please verify your email." });
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
