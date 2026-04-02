import { NextRequest, NextResponse } from "next/server";

// Passwortschutz deaktiviert — alle Anfragen durchlassen
// TODO: Passwortschutz reaktivieren
export function middleware(req: NextRequest) {
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
