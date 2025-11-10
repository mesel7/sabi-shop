import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["ko", "ja"],
  defaultLocale: "ko",
  localePrefix: "as-needed",
});

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)"],
};
