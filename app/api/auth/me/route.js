import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const users = globalThis._froxUsers || (globalThis._froxUsers = []);

export async function GET() {
  const token = cookies().get("frox_access")?.value;
  if (!token) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const user = users.find((u) => u.id === token);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  return NextResponse.json({
    user: { id: user.id, email: user.email, fullName: user.fullName, verified: user.verified },
  });
}
