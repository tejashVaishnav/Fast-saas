// middleware.ts

import { Ratelimit } from "@upstash/ratelimit";
import { headers } from "next/headers";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { redis } from "./lib/upstash";

// Define the middleware function
const rateLimit = new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(100, "120s"),
  });
  
export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // You can log the request here
  console.log("Request received:", req.url);

 

  const ip = headers().get("x-forwarded-for");
  const {
    limit,
    remaining,
    success: limitReached,
  } = await rateLimit.limit(ip!);

  if (!limitReached) {
    return new NextResponse(
      JSON.stringify({ error: "Max limit Reached Please wait for sometime." }),
      {
        status: 400,
      }
    );
  }
  console.log(limit, remaining, limitReached);
  // Perform some action on the request, for example, adding a custom header
  const res = NextResponse.next();
  res.headers.set("X-Custom-Header", "My custom header value");

  // Optionally, you can redirect or rewrite the request
  // return NextResponse.redirect(new URL('/some-path', req.url));
  // return NextResponse.rewrite(new URL('/some-path', req.url));

  return res;
}

// Define the config to specify when the middleware should run
export const config = {
  matcher: "/api/:path*", // Apply the middleware to all API routes
};
