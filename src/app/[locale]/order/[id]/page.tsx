"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/components/AuthProvider";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { db } from "@/lib/firebase";

type OrderData = {
  userId: string;
  items: { title: string; qty: number; price?: number; imageUrl?: string }[];
  subtotal: number;
  shippingFee: number;
  total: number;
  status: string;
  createdAt?: any;
};

export default function OrderDetailPage() {
  const params = useParams<{ locale: string; id: string }>();
  const locale = (useLocale() as "ko" | "ja") ?? "ko";

  const tOrderDetail = useTranslations("orderDetail");
  const tCommon = useTranslations("common");

  const { user, loading } = useAuth();

  const [order, setOrder] = useState<{ id: string; data: OrderData } | null>(
    null
  );
  const [fetching, setFetching] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const orderId = params?.id;

  useEffect(() => {
    if (!orderId) return;

    if (loading) return;

    // 로그인 안 한 상태면 그냥 없음
    if (!user) {
      setOrder(null);
      setNotFound(true);
      setFetching(false);
      return;
    }

    // 불러오기
    const fetchOrder = async () => {
      setFetching(true);
      setNotFound(false); // 이전에 notFound였더라도 다시 시도하니까 초기화

      try {
        const ref = doc(db, "orders", orderId);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          throw new Error("not-found");
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
        // 권한 없음, 문서 없음 전부 여기로
        console.warn("order load warning:", err);
        setOrder(null);
        setNotFound(true);
      } finally {
        setFetching(false);
      }
    };

    fetchOrder();
  }, [orderId, user, loading]); // user 바뀌면 다시 시도함

  // 화면 렌더링
  if (loading || fetching) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-sm text-gray-500">
        {tCommon("loading")}
      </div>
    );
  }

  if (notFound || !order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
        <p>{tOrderDetail("notFound")}</p>
        <Link
          href={`/${locale}/account/orders`}
          className="inline-block px-4 py-2 border rounded"
        >
          {tOrderDetail("toOrders")}
        </Link>
      </div>
    );
  }

  const { data } = order;
  const createdAtText = data.createdAt
    ? formatDateTime(locale, data.createdAt)
    : "-";

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">{tOrderDetail("title")}</h1>

      <div className="border rounded-lg p-6 bg-white">
        <dl className="grid grid-cols-3 gap-y-2 text-sm">
          <dt className="text-gray-500">{tOrderDetail("orderId")}</dt>
          <dd className="col-span-2 font-mono">{order.id}</dd>

          <dt className="text-gray-500">{tOrderDetail("createdAt")}</dt>
          <dd className="col-span-2">{createdAtText}</dd>

          <dt className="text-gray-500">{tOrderDetail("status")}</dt>
          <dd className="col-span-2">
            {data.status ? data.status : tOrderDetail("defaultStatus")}
          </dd>
        </dl>

        <hr className="my-4" />

        <h2 className="font-semibold mb-2">{tOrderDetail("items")}</h2>
        <ul className="space-y-1 text-sm">
          {data.items?.map((it, i) => (
            <li key={i} className="flex justify-between">
              <span>
                {it.title} × {it.qty}
              </span>
              {it.price ? (
                <span>{formatCurrency(locale, it.price * it.qty)}</span>
              ) : null}
            </li>
          ))}
        </ul>

        <hr className="my-4" />

        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span>{tOrderDetail("products")}</span>
            <span>{formatCurrency(locale, data.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>{tOrderDetail("shipping")}</span>
            <span>{formatCurrency(locale, data.shippingFee)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-1">
            <span>{tOrderDetail("total")}</span>
            <span>{formatCurrency(locale, data.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/${locale}`}
          className="px-4 py-2 border rounded hover:border-black"
        >
          {tOrderDetail("toHome")}
        </Link>
        <Link
          href={`/${locale}/account/orders`}
          className="px-4 py-2 bg-black text-white rounded"
        >
          {tOrderDetail("toOrders")}
        </Link>
      </div>
    </section>
  );
}
