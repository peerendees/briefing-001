import { NextRequest, NextResponse } from "next/server";

const PASSWORD = process.env.BRIEFING_PASSWORD ?? "changeme";
const COOKIE_NAME = "briefing_auth";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 Stunden

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login-Route und statische Assets immer durchlassen
  if (pathname === "/login" || pathname.startsWith("/_next") || pathname.startsWith("/favicon")) {
    return NextResponse.next();
  }

  // Cookie prüfen
  const cookie = req.cookies.get(COOKIE_NAME);
  if (cookie?.value === PASSWORD) {
    return NextResponse.next();
  }

  // Nicht authentifiziert → Login-Seite
  const loginUrl = req.nextUrl.clone();
  loginUrl.pathname = "/login";
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
