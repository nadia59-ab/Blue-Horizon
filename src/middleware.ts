import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // English has dedicated unprefixed routes. Run next-intl only for explicit
  // locale prefixes, avoiding rewrites between the English route group and
  // the [locale] route tree.
  const firstSegment = request.nextUrl.pathname.split("/")[1];
  if (!routing.locales.includes(firstSegment as (typeof routing.locales)[number])) {
    return NextResponse.next();
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
