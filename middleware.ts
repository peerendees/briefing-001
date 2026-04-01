import { NextRequest, NextResponse } from "next/server";

// Statisches Token — die Passwortprüfung findet ausschließlich in /api/login statt.
// Die Middleware prüft nur ob das Token-Cookie gesetzt ist.
const COOKIE_NAME = "briefing_auth";
const VALID_TOKEN = "granted";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Login-Route, API-Routen und statische Assets immer durchlassen
  if (
    pathname === "/login" ||
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon")
  ) {
    return NextResponse.next();
  }

  // Cookie prüfen — gesetzt von /api/login nach erfolgreicher Passwortprüfung
  const cookie = req.cookies.get(COOKIE_NAME);
  if (cookie?.value === VALID_TOKEN) {
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
