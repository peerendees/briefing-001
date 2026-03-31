import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.BRIEFING_PASSWORD ?? "changeme";
const COOKIE_NAME = "briefing_auth";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 Stunden

export async function POST(req: NextRequest) {
  const { password } = await req.json();

  if (password !== PASSWORD) {
    return NextResponse.json({ error: "Falsches Passwort" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(COOKIE_NAME, PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return res;
}
