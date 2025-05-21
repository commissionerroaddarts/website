import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;

  console.log("Middleware triggered for path:", pathname, req.cookies);
  // Allow public routes to be accessed without auth
  const publicPaths = ["/login", "/signup"];

  if (publicPaths.some((path) => pathname.startsWith(path))) {
    // If user is logged in, redirect them away from login/signup/plans
    if (refreshToken) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    return NextResponse.next();
  }

  // Auth check for protected routes
  if (!refreshToken) {
    if (pathname.startsWith("/add-establishment")) {
      return NextResponse.redirect(new URL("/plans", req.url));
    }

    if (pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/checkout")) {
      return NextResponse.redirect(new URL("/plans", req.url));
    }

    // Default redirect
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/add-establishment/:path*",
};
