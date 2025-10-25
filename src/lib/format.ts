export const SHIPPING_FEE = { ko: 2500, ja: 300 };

export function formatCurrency(locale: "ko" | "ja", value: number) {
  const currency = locale === "ja" ? "JPY" : "KRW";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}
