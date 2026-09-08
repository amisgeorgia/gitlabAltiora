import { NextResponse } from "next/server";

export function proxy() {
  // Middleware Next.js minimal pour ALTIORA CONNECT
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
