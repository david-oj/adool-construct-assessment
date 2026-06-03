import { auth } from "@/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  const session = await auth();

  const isAuthPage = 
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup");

  // If authenticated and on an auth page, redirect to dashboard
  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If not authenticated and on a protected page, redirect to login
  if (!session && !isAuthPage && !request.nextUrl.pathname.startsWith("/api")) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};