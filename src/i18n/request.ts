import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ locale }) => {
  const current = (locale ?? "ko") as "ko" | "ja";
  const messages = (await import(`../../messages/${current}.json`)).default;
  return {
    locale: current,
    messages,
  };
});
