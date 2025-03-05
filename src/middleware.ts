import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/modules/translations/i18n/routing";
import { NextFetchEvent, NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(["/(en|es)/app(.*)", "/app(.*)"]);

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  return clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) await auth.protect();

    return intl(req);
  })(req, event);
}

export const config = {
  matcher: [
    "/(en|es)/:path*",
    "/",

    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
