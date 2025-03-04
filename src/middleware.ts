import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "@/modules/translations/i18n/routing";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/app(.*)"]);

const intl = createMiddleware(routing);

export default function middleware(req: NextRequest, event: NextFetchEvent) {
  return clerkMiddleware(async (auth, req) => {
    if (isProtectedRoute(req)) {
      const { userId } = await auth();
      if (!userId) {
        return new NextResponse(null, {
          status: 302,
          headers: {
            Location: `/sign-in?redirect_url=${encodeURIComponent(req.url)}`,
          },
        });
      }
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
