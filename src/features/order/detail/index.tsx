"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { doc, getDoc } from "firebase/firestore";

import { useAuth } from "@/lib/auth/AuthProvider";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { db } from "@/lib/firebase";
import { ButtonLink } from "@/shared/ui/button/ButtonLink";

type Props = { id: string };

type OrderData = {
  userId: string;
  items: {
    title_ko: string;
    title_ja: string;
    qty: number;
    price: number;
    imageUrl?: string;
  }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: string;
  createdAt?: any;
};

export default function OrderDetailPage({ id }: Props) {
  const locale = (useLocale() as "ko" | "ja") ?? "ko";

  const tOrderDetail = useTranslations("orderDetail");
  const tCommon = useTranslations("common");

  const { user, loading } = useAuth();

  const [order, setOrder] = useState<{ id: string; data: OrderData } | null>(
    null,
  );
  const [fetching, setFetching] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!id) return;
    if (loading) return;

    if (!user) {
      setOrder(null);
      setNotFound(true);
      setFetching(false);
      return;
    }

    const fetchOrder = async () => {
      setFetching(true);
      setNotFound(false);

      try {
        const ref = doc(db, "orders", id);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setOrder(null);
          setNotFound(true);
          return;
        }

        const data = snap.data() as OrderData;
        const createdAt =
          data.createdAt && data.createdAt.toDate
            ? data.createdAt.toDate()
            : undefined;

        setOrder({
          id: snap.id,
          data: { ...data, createdAt },
        });
      } catch (err) {
        console.warn("order load warning:", err);
        setOrder(null);
        setNotFound(true);
      } finally {
        setFetching(false);
      }
    };

    fetchOrder();
  }, [id, user, loading]);

  if (loading || fetching) {
    return (
      <section
        className="mx-auto px-4 py-10 md:max-w-md text-center"
        aria-label="Order detail"
      >
        <p>{tCommon("loading")}</p>
      </section>
    );
  }

  if (notFound || !order) {
    return (
      <section
        className="mx-auto px-4 py-10 md:max-w-md text-center"
        aria-label="Order not found"
      >
        <p>{tOrderDetail("notFound")}</p>

        <div className="mt-8 flex justify-center">
          <ButtonLink
            href="/account/orders"
            variant="primary"
            className="md:w-auto"
            full
          >
            {tOrderDetail("toOrders")}
          </ButtonLink>
        </div>
      </section>
    );
  }

  const { data } = order;

  const createdAtText = data.createdAt
    ? formatDateTime(locale, data.createdAt)
    : "-";

  return (
    <section
      className="mx-auto px-4 py-10 md:max-w-md"
      aria-labelledby="order-detail-title"
    >
      <h1 id="order-detail-title" className="text-2xl font-bold mb-8">
        {tOrderDetail("title")}
      </h1>

      <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
        <dl className="grid grid-cols-3 gap-y-2 text-sm py-4">
          <dt>{tOrderDetail("orderId")}</dt>
          <dd className="col-span-2 font-outfit break-all">{order.id}</dd>

          <dt>{tOrderDetail("createdAt")}</dt>
          <dd className="col-span-2 font-outfit">{createdAtText}</dd>

          <dt>{tOrderDetail("status")}</dt>
          <dd className="col-span-2">
            {data.status ? data.status : tOrderDetail("defaultStatus")}
          </dd>
        </dl>

        <div className="py-4 text-sm space-y-2">
          <div className="font-semibold">{tOrderDetail("items")}</div>
          <ul className="space-y-2">
            {data.items?.map((it, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span className="flex-1">
                  {locale === "ja" ? it.title_ja : it.title_ko} ✕ {it.qty}
                </span>
                <span className="font-outfit">
                  {formatCurrency(it.price * it.qty)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-2 text-sm py-4">
          <div className="flex justify-between">
            <span>{tOrderDetail("products")}</span>
            <span className="font-outfit">{formatCurrency(data.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>{tOrderDetail("shipping")}</span>
            <span className="font-outfit">
              {formatCurrency(data.shippingFee)}
            </span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>{tOrderDetail("total")}</span>
            <span className="font-outfit">{formatCurrency(data.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col md:flex-row gap-3">
        <ButtonLink href="/" variant="outline" full className="md:w-auto">
          {tOrderDetail("toHome")}
        </ButtonLink>
        <ButtonLink
          href="/account/orders"
          variant="primary"
          full
          className="md:w-auto"
        >
          {tOrderDetail("toOrders")}
        </ButtonLink>
      </div>
    </section>
  );
}
