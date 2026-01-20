import { getRequestConfig } from "next-intl/server";

const SUPPORTED_LOCALES = ["ko", "ja"] as const;
type Locale = (typeof SUPPORTED_LOCALES)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const raw = (await requestLocale) ?? "ko";
  const locale: Locale = SUPPORTED_LOCALES.includes(raw as Locale)
    ? (raw as Locale)
    : "ko";

  const messages = (await import(`../../messages/${locale}.json`)).default;

  return {
    locale,
    messages,
  };
});
