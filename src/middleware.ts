import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(request.headers.get("cookie"));
  const authPages = ["/login", "/signup"];
  const protectedRoutes = ["/profile", "/dashboard", "/settings"];

  const isAuthPage = authPages.some((route) => pathname.startsWith(route));
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  let isAuthenticated = false;
  let user: any = null;
  let permissions: any = null;
  let subscription: any = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`,
      {
        method: "GET",
        headers: {
          cookie: request.headers.get("cookie") || "",
        },
        credentials: "include",
      }
    );

    const result = await response.json();

    if (response.ok && result.user) {
      isAuthenticated = true;
      user = result.user;
      permissions = result.permissions;
      subscription = result.subscription;
    }
  } catch (err) {
    console.error("Error verifying token:", err);
  }

  if (
    (pathname.startsWith("/add-establishment") ||
      pathname.startsWith("/edit-establishment")) &&
    (!isAuthenticated || !subscription)
  ) {
    return NextResponse.redirect(new URL("/plans", request.url));
  }
  // Handle access to /edit-establishment/[slug]
  if (
    pathname.startsWith("/edit-establishment/") &&
    isAuthenticated &&
    subscription
  ) {
    const slug = pathname.split("/edit-establishment/")[1];

    try {
      const bizRes = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/businesses/check-edit-business/${slug}`,
        {
          method: "GET",
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
          credentials: "include",
        }
      );
      const { success } = await bizRes.json();
      if (!success) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
    } catch (err) {
      console.error("Business check failed:", err);
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  // ✅ Handle redirects
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Add custom headers if authenticated
  if (isAuthenticated) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-id", user._id);
    requestHeaders.set("x-user-plan", subscription?.plan ?? "");
    requestHeaders.set(
      "x-user-maxListings",
      String(permissions?.maxListings ?? 0)
    );

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/dashboard/:path*",
    "/settings/:path*",
    "/login/:path*",
    "/signup/:path*",
    "/add-establishment/:path*",
    "/edit-establishment/:path*",
    "/plans/:path*",
  ],
};
