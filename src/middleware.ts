import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/modules/translations/i18n/routing";
import { NextFetchEvent, NextRequest } from "next/server";

const isProtectedRoute = createRouteMatcher(["/(en|es)/app(.*)", "/app(.*)"]);

const intl = createMiddleware({
  ...routing,
  localeDetection: true,
  localePrefix: "always",
});

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  return clerkMiddleware(async (auth, req) => {
    const { nextUrl } = req;
    const pathname = nextUrl.pathname;

    // const localeMatch = pathname.match(/^\/(en|es)\//);
    // const locale = localeMatch ? localeMatch[1] : "en";

    const userAgent = req.headers.get("user-agent") || "";
    const isBot = /bot|crawler|spider|linkedin|facebook|twitter|whatsapp/i.test(
      userAgent
    );

    if (
      isBot &&
      (pathname === "/" || pathname === "/en" || pathname === "/es")
    ) {
      return intl(req);
    }

    // if (pathname === "/" || pathname === "/en" || pathname === "/es") {
    //   const redirectUrl = nextUrl.clone();
    //   redirectUrl.pathname = `/${locale}/app`;
    //   return NextResponse.redirect(redirectUrl);
    // }

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
