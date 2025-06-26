import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { baseUrl } from "./constants/baseUrl";

const AUTH_PAGES = ["/login", "/signup"];
const PROTECTED_ROUTES = ["/profile", /*"/dashboard",*/ "/settings"];
const PLAN_REQUIRED_ROUTES = ["/add-establishment", "/edit-establishment"];

async function verifyToken(request: NextRequest) {
  try {
    const response = await fetch(`${baseUrl}/auth/verify-token`, {
      method: "GET",
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
      credentials: "include",
    });

    if (!response.ok) return null;

    const { user, permissions, subscription } = await response.json();
    return { user, permissions, subscription };
  } catch (err) {
    console.error("Token verification failed:", err);
    return null;
  }
}

async function isAuthorizedToEditBusiness(slug: string, request: NextRequest) {
  try {
    const response = await fetch(
      `${baseUrl}/businesses/check-edit-business/${slug}`,
      {
        method: "GET",
        headers: {
          cookie: request.headers.get("cookie") ?? "",
        },
        credentials: "include",
      }
    );

    const result = await response.json();
    return result?.success === true;
  } catch (err) {
    console.error("Edit business authorization failed:", err);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthPage = AUTH_PAGES.some((route) => pathname.startsWith(route));
  const isProtectedRoute = PROTECTED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );
  const isPlanRoute = PLAN_REQUIRED_ROUTES.some((route) =>
    pathname.startsWith(route)
  );

  const tokenData = await verifyToken(request);
  const isAuthenticated = !!tokenData?.user;

  // Redirect logged-in users away from auth pages
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Redirect non-authenticated users from protected routes
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Restrict add/edit-establishment if not subscribed
  if (isPlanRoute) {
    if (!isAuthenticated || !tokenData?.subscription) {
      return NextResponse.redirect(new URL("/plans", request.url));
    }

    // Check ownership for edit-establishment/[slug]
    if (pathname.startsWith("/edit-establishment/")) {
      const slug = pathname.split("/edit-establishment/")[1];
      const authorized = await isAuthorizedToEditBusiness(slug, request);

      if (!authorized) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    }
  }

  // Add user headers for authenticated requests
  if (isAuthenticated) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", tokenData.user._id);
    requestHeaders.set("x-user-plan", tokenData.subscription?.plan ?? "");
    requestHeaders.set(
      "x-user-maxListings",
      String(tokenData.permissions?.maxListings ?? 0)
    );

    return NextResponse.next({
      request: { headers: requestHeaders },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    // "/dashboard/:path*",
    "/settings/:path*",
    "/login/:path*",
    "/signup/:path*",
    "/add-establishment/:path*",
    "/edit-establishment/:path*",
    "/plans/:path*",
  ],
};
