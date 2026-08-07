import { NextResponse } from "next/server";

export function middleware() {
  // Middleware Next.js minimal pour ALTIORA CONNECT
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
