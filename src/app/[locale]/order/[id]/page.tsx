"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useLocale } from "next-intl";
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
  const { user, loading } = useAuth();
  const router = useRouter();

  const [order, setOrder] = useState<{
    id: string;
    data: OrderData;
  } | null>(null);
  const [fetching, setFetching] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const orderId = params?.id;

  useEffect(() => {
    // 로그인 안 돼 있으면 그냥 패스, 아래에서 로그인 요구 문구 보여줌
    if (!orderId) return;
    const run = async () => {
      setFetching(true);
      try {
        const ref = doc(db, "orders", orderId);
        const snap = await getDoc(ref);
        if (!snap.exists()) {
          setNotFound(true);
          return;
        }
        const data = snap.data() as OrderData;

        // createdAt이 Timestamp면 toDate() 해서 ISO로
        const createdAt =
          data.createdAt && data.createdAt.toDate
            ? data.createdAt.toDate()
            : undefined;

        setOrder({
          id: snap.id,
          data: {
            ...data,
            createdAt,
          },
        });
      } finally {
        setFetching(false);
      }
    };
    run();
  }, [orderId]);

  // 아직 auth 상태 로딩 중
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-sm text-gray-500">
        로딩 중...
      </div>
    );
  }

  // 비로그인 사용자 막기
  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
        <p>로그인 후 주문을 확인할 수 있습니다.</p>
        <Link
          href={`/${locale}`}
          className="inline-block px-4 py-2 border rounded"
        >
          홈으로
        </Link>
      </div>
    );
  }

  // 파이어스토어에서 해당 주문이 없음
  if (notFound) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
        <p>해당 주문을 찾을 수 없습니다.</p>
        <Link
          href={`/${locale}/account/orders`}
          className="inline-block px-4 py-2 border rounded"
        >
          주문내역
        </Link>
      </div>
    );
  }

  // 아직 가져오는 중
  if (fetching || !order) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-sm text-gray-500">
        주문 정보를 불러오는 중입니다...
      </div>
    );
  }

  // 내 주문인지 검증
  if (order.data.userId !== user.uid) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 space-y-4">
        <p>이 주문에 접근할 권한이 없습니다.</p>
        <Link
          href={`/${locale}/account/orders`}
          className="inline-block px-4 py-2 border rounded"
        >
          주문내역
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
      <h1 className="text-2xl font-bold mb-6">주문 상세 / 注文詳細</h1>

      <div className="border rounded-lg p-6 bg-white">
        <dl className="grid grid-cols-3 gap-y-2 text-sm">
          <dt className="text-gray-500">주문번호</dt>
          <dd className="col-span-2 font-mono">{order.id}</dd>

          <dt className="text-gray-500">주문일시</dt>
          <dd className="col-span-2">{createdAtText}</dd>

          <dt className="text-gray-500">상태</dt>
          <dd className="col-span-2">{data.status ?? "결제완료"}</dd>
        </dl>

        <hr className="my-4" />

        <h2 className="font-semibold mb-2">상품</h2>
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
            <span>상품금액</span>
            <span>{formatCurrency(locale, data.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span>배송비</span>
            <span>{formatCurrency(locale, data.shippingFee)}</span>
          </div>
          <div className="flex justify-between font-semibold pt-1">
            <span>총액</span>
            <span>{formatCurrency(locale, data.total)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        <Link
          href={`/${locale}`}
          className="px-4 py-2 border rounded hover:border-black"
        >
          홈으로
        </Link>
        <Link
          href={`/${locale}/account/orders`}
          className="px-4 py-2 bg-black text-white rounded"
        >
          주문내역
        </Link>
      </div>
    </section>
  );
}
