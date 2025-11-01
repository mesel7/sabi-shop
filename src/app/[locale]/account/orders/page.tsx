"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useLocale, useTranslations } from "next-intl";
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

  const tOrders = useTranslations("orders");
  const tCommon = useTranslations("common");

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

  if (loading) return <div className="p-8">{tCommon("loading")}</div>;
  if (!user) return <div className="p-8">{tOrders("needLogin")}</div>;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-bold mb-4">{tOrders("title")}</h1>
      {fetching ? (
        <div>{tOrders("loading")}</div>
      ) : orders.length === 0 ? (
        <div>{tOrders("empty")}</div>
      ) : (
        orders.map((o) => (
          <div key={o.id} className="border rounded p-4 flex justify-between">
            <div>
              <p className="font-semibold">
                {tOrders("number")}: {o.id}
              </p>
              <p className="text-sm text-gray-500">
                {o.createdAt
                  ? new Date(o.createdAt).toLocaleString(
                      locale === "ko" ? "ko-KR" : "ja-JP"
                    )
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
                {tOrders("total")}: {o.total?.toLocaleString()}원
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
                {tCommon("seeDetail")}
              </Link>
            </div>
          </div>
        ))
      )}
    </section>
  );
}
