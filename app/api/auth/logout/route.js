import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST() {
  const res = NextResponse.json({ message: "Logged out successfully" });
  cookies().delete("frox_access");
  cookies().delete("frox_refresh");
  return res;
}
