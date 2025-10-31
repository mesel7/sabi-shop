"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useLocale } from "next-intl";
import Link from "next/link";
import { db } from "@/lib/firebase";

type OrderDoc = {
  id: string;
  createdAt: string;
  total: number;
  status: string;
  items: { title: string; qty: number }[];
};

export default function MyOrdersPage() {
  const { user, loading } = useAuth();
  const locale = useLocale() as "ko" | "ja";
  const [orders, setOrders] = useState<OrderDoc[]>([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchOrders = async () => {
      setFetching(true);
      const q = query(
        collection(db, "orders"),
        where("userId", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const list: OrderDoc[] = snap.docs.map((d) => {
        const data = d.data() as any;
        return {
          id: d.id,
          createdAt: data.createdAt?.toDate
            ? data.createdAt.toDate().toISOString()
            : "",
          total: data.total,
          status: data.status,
          items: data.items ?? [],
        };
      });
      setOrders(list);
      setFetching(false);
    };
    fetchOrders();
  }, [user]);

  if (loading) return <div className="p-8">로딩중...</div>;
  if (!user)
    return <div className="p-8">로그인 후 주문 내역을 확인할 수 있습니다.</div>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-bold mb-4">내 주문</h1>
      {fetching ? (
        <div>불러오는 중...</div>
      ) : orders.length === 0 ? (
        <div>주문이 없습니다.</div>
      ) : (
        orders.map((o) => (
          <div key={o.id} className="border rounded p-4 flex justify-between">
            <div>
              <p className="font-semibold">주문번호: {o.id}</p>
              <p className="text-sm text-gray-500">
                {o.createdAt
                  ? new Date(o.createdAt).toLocaleString("ko-KR")
                  : "-"}
              </p>
              <ul className="mt-2 text-sm text-gray-700">
                {o.items.map((it, idx) => (
                  <li key={idx}>
                    {it.title} × {it.qty}
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-semibold">
                총액: {o.total?.toLocaleString()}원
              </p>
            </div>
            <div className="flex flex-col gap-2 items-end">
              <span className="text-xs border rounded px-2 py-1">
                {o.status}
              </span>
              <Link
                href={`/${locale}/order/${o.id}`}
                className="text-xs underline text-gray-500"
              >
                상세보기
              </Link>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
