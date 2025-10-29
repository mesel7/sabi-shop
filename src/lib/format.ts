export const SHIPPING_FEE = { ko: 2500, ja: 300 };

export function formatCurrency(locale: "ko" | "ja", value: number) {
  const currency = locale === "ja" ? "JPY" : "KRW";
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatDateTime(
  locale: "ko" | "ja",
  iso: string | number | Date
) {
  const d = new Date(iso);
  return d.toLocaleString(locale === "ja" ? "ja-JP" : "ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
