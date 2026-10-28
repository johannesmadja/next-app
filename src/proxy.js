import { NextResponse } from "next/server";
import { getLocaleUrlToRedirect } from "./lib/i18n";

export function proxy(request) {
  const newUrl = getLocaleUrlToRedirect(request);
  if (newUrl) {
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
