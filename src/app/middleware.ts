// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  const { pathname } = req.nextUrl;
  //   const isAuthValid = token && (await verifyJWT(token));

  if (!refreshToken) {
    // Redirect to specific login page based on route
    if (pathname.startsWith("/add-establishment")) {
      return NextResponse.redirect(new URL("/plans", req.url));
    }

    if (pathname.startsWith("/profile")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (pathname.startsWith("/checkout")) {
      return NextResponse.redirect(new URL("/plans", req.url));
    }
    // default redirect
    return NextResponse.redirect(new URL("/login", req.url));
  } else {
    if (pathname.startsWith("/login")) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
    if (pathname.startsWith("/signup")) {
      return NextResponse.redirect(new URL("/profile", req.url));
    }
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/add-listing",
    "/admin/:path*",
    "/checkout/:path*",
    "/plans/:path*",
    "/login/:path*",
    "/signup/:path*",
  ],
};
