"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateQty, removeItem, clear } from "@/store/cartSlice";
import { formatCurrency, SHIPPING_FEE } from "@/lib/format";
import { useLocale } from "next-intl";
import Link from "next/link";

export default function CartPage() {
  const dispatch = useDispatch();
  const locale = useLocale() as "ko" | "ja";
  const { items, subtotal } = useSelector((s: RootState) => s.cart);
  const shipping = SHIPPING_FEE[locale];
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
        <p>장바구니가 비었습니다 🛒</p>
        <Link
          href={`/${locale}/products`}
          className="text-black underline mt-3 inline-block"
        >
          상품 보러가기 / 商品を見る
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">장바구니 / カート</h1>

      {/* 상품 목록 */}
      <div className="space-y-4 border-t border-b divide-y">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <img
                src={it.imageUrl}
                alt={it.title}
                className="w-20 h-20 object-contain bg-gray-100 rounded"
              />
              <div>
                <p className="font-medium">{it.title}</p>
                <p className="text-sm text-gray-500">
                  {formatCurrency(locale, it.price)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="number"
                min={1}
                max={99}
                value={it.qty}
                onChange={(e) =>
                  dispatch(
                    updateQty({ id: it.id, qty: Number(e.target.value) })
                  )
                }
                className="w-14 border rounded text-center"
              />
              <p className="w-20 text-right">
                {formatCurrency(locale, it.price * it.qty)}
              </p>
              <button
                onClick={() => dispatch(removeItem(it.id))}
                className="text-gray-400 hover:text-black text-sm"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 총합계 영역 */}
      <div className="mt-8 flex flex-col items-end text-sm">
        <p>상품 합계: {formatCurrency(locale, subtotal)}</p>
        <p>배송비: {formatCurrency(locale, shipping)}</p>
        <p className="font-bold text-base mt-2">
          총액: {formatCurrency(locale, total)}
        </p>
      </div>

      {/* 버튼 */}
      <div className="mt-8 flex justify-end gap-3">
        <button
          onClick={() => dispatch(clear())}
          className="px-4 py-2 border rounded hover:border-black"
        >
          비우기 / クリア
        </button>
        <Link
          href={`/${locale}/checkout`}
          className="px-4 py-2 bg-black text-white rounded"
        >
          주문하기 / 注文する
        </Link>
      </div>
    </section>
  );
}
