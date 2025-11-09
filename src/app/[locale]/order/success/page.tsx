"use client";

import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/Button";

export default function OrderSuccessPage() {
  const params = useSearchParams();
  const locale = useLocale() as "ko" | "ja";
  const tOrderSuccess = useTranslations("orderSuccess");
  const orderId = params.get("id");

  return (
    <section className="mx-auto px-4 py-20 text-center md:max-w-md">
      <div>
        <h1 className="text-2xl font-bold mb-4">{tOrderSuccess("title")}</h1>
        <p className="text-gray-600 mb-2">{tOrderSuccess("desc")}</p>

        {orderId && (
          <p className="text-sm text-gray-500 mb-6">
            {tOrderSuccess("orderId")}:{" "}
            <span className="font-mono">{orderId}</span>
          </p>
        )}

        <div className="flex flex-col md:flex-row justify-center gap-3">
          <Button
            href={`/${locale}`}
            variant="outline"
            full
            className="md:w-auto"
          >
            {tOrderSuccess("toHome")}
          </Button>

          <Button
            href={`/${locale}/account/orders`}
            variant="primary"
            full
            className="md:w-auto"
          >
            {tOrderSuccess("toOrders")}
          </Button>
        </div>
      </div>
    </section>
  );
}
