export const SHIPPING_FEE = { ko: 2500, ja: 2500 };

export function formatCurrency(value: number) {
  return `₩ ${value.toLocaleString("ko-KR")}`;
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
