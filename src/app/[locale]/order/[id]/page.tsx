"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { useAuth } from "@/components/AuthProvider";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { db } from "@/lib/firebase";
import { Button } from "@/components/Button";

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
      <section className="mx-auto px-4 py-10 md:max-w-md text-center">
        <p>{tCommon("loading")}</p>
      </section>
    );
  }

  if (notFound || !order) {
    return (
      <section className="mx-auto px-4 py-10 md:max-w-md text-center">
        <p>{tOrderDetail("notFound")}</p>
        <Link href={`/${locale}/account/orders`} className="mt-8 inline-block">
          {tOrderDetail("toOrders")}
        </Link>
      </section>
    );
  }

  const { data } = order;
  const createdAtText = data.createdAt
    ? formatDateTime(locale, data.createdAt)
    : "-";

  return (
    <section className="mx-auto px-4 py-10 md:max-w-md">
      <h1 className="text-2xl font-bold mb-8">{tOrderDetail("title")}</h1>

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
          <div className="font-semibold">
            <span>{tOrderDetail("items")}</span>
          </div>
          <ul className="space-y-2">
            {data.items?.map((it, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span className="flex-1">
                  {locale === "ja" ? it.title_ja : it.title_ko} ✕ {it.qty}
                </span>
                {it.price ? (
                  <span className="font-outfit">
                    {formatCurrency(it.price * it.qty)}
                  </span>
                ) : null}
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

      {/* 버튼: 모바일 full, 데스크탑 가로 배치 */}
      <div className="mt-6 flex flex-col md:flex-row gap-3">
        <Button
          href={`/${locale}`}
          variant="outline"
          full
          className="md:w-auto"
        >
          {tOrderDetail("toHome")}
        </Button>
        <Button
          href={`/${locale}/account/orders`}
          variant="primary"
          full
          className="md:w-auto"
        >
          {tOrderDetail("toOrders")}
        </Button>
      </div>
    </section>
  );
}
