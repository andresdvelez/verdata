import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/modules/translations/i18n/routing";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/(en|es)/app(.*)", "/app(.*)"]);

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  return clerkMiddleware(async (auth, req) => {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;

    // Extract locale from the request
    const localeMatch = pathname.match(/^\/(en|es)\//);
    const locale = localeMatch ? localeMatch[1] : "en"; // Default to 'en' if no locale found

    // Redirect "/" or "/en" or "/es" to "/en/app" or "/es/app"
    if (pathname === "/" || pathname === "/en" || pathname === "/es") {
      const redirectUrl = nextUrl.clone();
      redirectUrl.pathname = `/${locale}/app`;
      return NextResponse.redirect(redirectUrl);
    }

    if (isProtectedRoute(req)) {
      await auth.protect();
    }

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
