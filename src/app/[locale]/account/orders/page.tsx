"use client";

import Link from "next/link";
import { useLocale } from "next-intl";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { MOCK_ORDERS } from "@/site/orders.mock";
import { useAuth } from "@/components/AuthProvider";
import { useState } from "react";
import AuthModal from "@/components/AuthModal";

export default function MyOrdersPage() {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState(false);
  const locale = useLocale() as "ko" | "ja";

  if (loading) return <div className="p-10">로딩중...</div>;

  if (!user)
    return (
      <>
        <section className="max-w-4xl mx-auto px-4 py-10 text-center">
          <p className="mb-4">주문 내역은 로그인 후 확인할 수 있습니다.</p>
          <button
            onClick={() => setShowAuth(true)}
            className="px-4 py-2 bg-black text-white rounded"
          >
            로그인하기
          </button>
        </section>
        {showAuth && (
          <AuthModal mode="login" onClose={() => setShowAuth(false)} />
        )}
      </>
    );

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">내 주문내역 / 注文履歴</h1>

      {MOCK_ORDERS.length === 0 ? (
        <div className="text-gray-500 text-center py-20">
          <p>주문 내역이 없습니다</p>
          <Link
            href={`/${locale}/products`}
            className="mt-4 inline-block underline text-black"
          >
            상품 보러가기 / 商品を見る
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-5 hover:shadow-sm transition"
            >
              <div className="flex justify-between items-center mb-3">
                <div>
                  <p className="font-medium">주문번호: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    주문일자: {formatDateTime(locale, order.createdAt)}
                  </p>
                </div>
                <span className="text-xs border px-2 py-0.5 rounded text-gray-600">
                  {order.status === "paid-mock" ? "결제완료" : order.status}
                </span>
              </div>

              <ul className="text-sm text-gray-700 space-y-1">
                {order.items.map((it, i) => (
                  <li key={i}>
                    {it.title} × {it.qty}
                  </li>
                ))}
              </ul>

              <div className="mt-3 flex justify-between items-center text-sm">
                <p className="font-semibold">
                  총액: {formatCurrency(locale, order.total)}
                </p>
                {/* 주문 상세페이지로 이동 */}
                <Link
                  href={`/${locale}/order/${order.id}`}
                  className="text-xs underline text-gray-500 hover:text-black"
                >
                  상세보기
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
