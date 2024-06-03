import { NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export default withAuth(async function middleware(req: NextRequestWithAuth) {
  try {
    const token = await getToken({ req, secret: process.env.SECRET });
    const { pathname } = req.nextUrl;

    const adminPath =
      pathname.startsWith("/admin") || pathname.startsWith("/api/admin");
    if (token) {
      if (token.userRole !== "Administrateur" && adminPath)
        return NextResponse.rewrite(new URL("/unauthorized", req.url));
      if (token.userRole === "Administrateur" && !adminPath)
        return NextResponse.rewrite(new URL("/unauthorized", req.url));
    }

    // Protected routes, require authentication
    if (!token) {
      return NextResponse.rewrite(new URL("/", req.url)); // Redirect to login
    }
  } catch (error) {
    console.error(error);
  }
});

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*",
    "/api/location/:path*",
    "/api/utilisateur/:path*",
    "/historique",
  ],
};
