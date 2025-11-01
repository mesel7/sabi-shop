"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const locale = useLocale() as "ko" | "ja";

  const tOrderSuccess = useTranslations("orderSuccess");

  const orderId = params.get("id");

  return (
    <section className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="border rounded-lg p-8 shadow-sm bg-white">
        <h1 className="text-2xl font-bold mb-4">{tOrderSuccess("title")}</h1>
        <p className="text-gray-600 mb-2">{tOrderSuccess("desc")}</p>
        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            {tOrderSuccess("orderId")}:{" "}
            <span className="font-mono">{orderId}</span>
          </p>
        )}
        <div className="flex justify-center gap-3">
          <Link
            href={`/${locale}`}
            className="px-4 py-2 border rounded hover:border-black"
          >
            {tOrderSuccess("toHome")}
          </Link>
          <Link
            href={`/${locale}/account/orders`}
            className="px-4 py-2 bg-black text-white rounded"
          >
            {tOrderSuccess("toOrders")}
          </Link>
        </div>
      </div>
    </section>
  );
}
