import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function authMiddleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Assuming the token includes the user's access level
  const userAccelLevel = token.userAccelLevel;

  // Define routes that require pro access
  const proRoutes = ["/api/newsletter"];

  if (
    proRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) &&
    !userAccelLevel
  ) {
    return NextResponse.redirect(new URL("/upgrade", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/cron/:path*", "/api/newsletter/:path*"],
};
