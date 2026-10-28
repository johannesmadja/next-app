import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { availableLocales, defaultLocale } from "./locales";

export const getPreferredLocale = (request) => {
  const headers = { "accept-language": request.headers.get("accept-language") ?? "" };
  const languages = new Negotiator({ headers }).languages();

  try {
    return match(languages, availableLocales, defaultLocale);
  } catch {
    return defaultLocale;
  }
};

export const getLocaleUrlToRedirect = (request) => {
    const pathname = request.nextUrl.pathname; 
    const isMissingLocale = availableLocales.every((locale) => !pathname.startsWith(`/${locale}`) && pathname != `/${locale}`);

    if (isMissingLocale) {
        const locale = getPreferredLocale(request); 
        return new URL(`/${locale}${pathname}`, request.url);
    }
}
