"use client";

import { useAuth } from "@/components/AuthProvider";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { db } from "@/lib/firebase";
import { formatCurrency } from "@/lib/format";

type OrderDoc = {
  id: string;
  createdAt: string;
  total: number;
  status: string;
  items: {
    title_ko: string;
    title_ja: string;
    qty: number;
    imageUrl?: string;
  }[];
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

  if (loading) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p>{tCommon("loading")}</p>
      </section>
    );
  }

  if (!user) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p>{tOrders("needLogin")}</p>
      </section>
    );
  }
  return (
    <section className="max-w-4xl mx-auto px-4 py-10 space-y-4">
      <h1 className="text-2xl font-bold mb-8">{tOrders("title")}</h1>
      {fetching ? (
        <div>{tOrders("loading")}</div>
      ) : orders.length === 0 ? (
        <div>{tOrders("empty")}</div>
      ) : (
        <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
          {orders.map((o) => {
            const first = o.items?.[0];
            const firstTitle =
              locale === "ja" ? first?.title_ja : first?.title_ko;
            const hasMore = (o.items?.length ?? 0) > 1;
            const thumb = first?.imageUrl || "/placeholder.png";

            return (
              <div key={o.id} className="py-4 flex justify-between">
                {/* 왼쪽 */}
                <div className="flex items-center gap-4">
                  <img
                    src={thumb}
                    alt={firstTitle}
                    className="w-20 h-20 object-contain bg-gray-100"
                  />
                  <div>
                    {/* 첫 상품명만, 뒤에 있으면 ... */}
                    <p className="font-medium">
                      {firstTitle}
                      {hasMore ? " ..." : ""}
                    </p>

                    {/* 총액 */}
                    <p className="text-sm font-outfit">
                      {formatCurrency(o.total)}
                    </p>

                    {/* 결제 일시 */}
                    <p className="text-sm text-gray-500 font-outfit">
                      {o.createdAt
                        ? new Date(o.createdAt).toLocaleString(
                            locale === "ko" ? "ko-KR" : "ja-JP"
                          )
                        : "-"}
                    </p>
                  </div>
                </div>

                {/* 오른쪽 */}
                <div className="flex flex-col gap-2 items-end">
                  <span className="text-xs rounded-xs border border-gray-300 px-2 py-1">
                    {o.status}
                  </span>
                  <Link
                    href={`/${locale}/order/${o.id}`}
                    className="text-xs text-gray-500"
                  >
                    {tCommon("seeDetail")}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
