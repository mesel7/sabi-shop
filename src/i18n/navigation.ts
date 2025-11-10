import { createNavigation } from "next-intl/navigation";

export const { Link, usePathname, useRouter } = createNavigation({
  locales: ["ko", "ja"],
  defaultLocale: "ko",
  localePrefix: "as-needed",
});
