import { notFound } from "next/navigation";
import Link from "next/link";
import { formatCurrency, formatDateTime } from "@/lib/format";
import { MOCK_ORDERS } from "@/site/orders.mock";

type Props = {
  params: Promise<{ locale: "ko" | "ja"; id: string }>;
};

export default async function OrderDetailPage({ params }: Props) {
  const { locale, id } = await params; // 서버에서 Promise 해제
  const order = MOCK_ORDERS.find((o) => o.id === id);
  if (!order) notFound();

  return (
    <section className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">주문 상세 / 注文詳細</h1>

      <div className="border rounded-lg p-6 bg-white">
        <dl className="grid grid-cols-3 gap-y-2 text-sm">
          <dt className="text-gray-500">주문번호</dt>
          <dd className="col-span-2 font-mono">{order.id}</dd>

          <dt className="text-gray-500">주문일시</dt>
          <dd className="col-span-2">
            {formatDateTime(locale as "ko" | "ja", order.createdAt)}
          </dd>

          <dt className="text-gray-500">상태</dt>
          <dd className="col-span-2">결제완료</dd>
        </dl>

        <hr className="my-4" />

        <h2 className="font-semibold mb-2">상품</h2>
        <ul className="space-y-1 text-sm">
          {order.items.map((it, i) => (
            <li key={i} className="flex justify-between">
              <span>
                {it.title} × {it.qty}
              </span>
              {/* 금액을 항목별로 안 갖고 있으니 총액만 하단에서 표기 */}
            </li>
          ))}
        </ul>

        <hr className="my-4" />

        <div className="flex justify-between font-semibold">
          <span>총액</span>
          <span>{formatCurrency(locale as "ko" | "ja", order.total)}</span>
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
