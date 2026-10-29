import { NextResponse } from "next/server";
import { getLocaleUrlToRedirect } from "./lib/i18n";
import withAuth from "next-auth/middleware";

export function proxy(request) {
  const newUrl = getLocaleUrlToRedirect(request);
  if (newUrl) {
    return NextResponse.redirect(newUrl);
  }

  if (/\/[a-z]{2}\/user.*/.test(request.nextUrl.pathname)) {
    return withAuth(request)
  }
}

export const config = {
  // Exclut l'API, tout ce qui est interne à Next (_next/*) et les fichiers (.ico, .png, ...)
  matcher: "/((?!api|_next|.*\\..*).*)",
};
