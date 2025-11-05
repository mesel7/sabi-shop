"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { updateQty, removeItem, clearCart } from "@/store/cartSlice";
import { formatCurrency, SHIPPING_FEE } from "@/lib/format";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { useIsClient } from "@/hooks/useIsClient";

export default function CartPage() {
  const dispatch = useDispatch();
  const locale = useLocale() as "ko" | "ja";

  const tCart = useTranslations("cart");
  const tCommon = useTranslations("common");

  const { items, subtotal } = useSelector((s: RootState) => s.cart);
  const shipping = SHIPPING_FEE[locale];
  const total = subtotal + shipping;

  const isClient = useIsClient();

  if (!isClient) {
    // 서버 렌더 단계에서는 아무 것도 안 그림 (Hydration mismatch 방지)
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p>{tCommon("loading")}</p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p>{tCart("empty")}</p>
        <Link href={`/${locale}/products`} className="mt-8 inline-block">
          {tCart("goShop")}
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">{tCart("title")}</h1>
      {/* 상품 목록 */}
      <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
        {items.map((it) => {
          const displayTitle = locale === "ja" ? it.title_ja : it.title_ko;
          return (
            <div key={it.id} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-4">
                <img
                  src={it.imageUrl}
                  alt={displayTitle}
                  className="w-20 h-20 object-contain bg-gray-100"
                />
                <div>
                  <p className="font-medium">{displayTitle}</p>
                  <p className="text-sm text-gray-500 font-outfit">
                    {formatCurrency(it.price)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  id={`qty-${it.id}`}
                  name={`qty-${it.id}`}
                  type="number"
                  min={1}
                  max={99}
                  value={it.qty}
                  onChange={(e) =>
                    dispatch(
                      updateQty({ id: it.id, qty: Number(e.target.value) })
                    )
                  }
                  className="w-14 rounded-xs border border-gray-300 text-center font-outfit"
                />
                <p className="w-20 text-right font-outfit">
                  {formatCurrency(it.price * it.qty)}
                </p>
                <button
                  onClick={() => dispatch(removeItem(it.id))}
                  className="text-gray-400 hover:text-[color:var(--color-foreground)] transition-colors duration-300 text-sm cursor-pointer"
                >
                  ✕
                </button>
              </div>
            </div>
          );
        })}
      </div>
      {/* 총합계 영역 */}
      <div className="mt-10 text-center">
        <div className="flex justify-center items-end gap-4">
          {/* 상품 합계 */}
          <div className="flex flex-col items-center">
            <p className="text-2xl leading-none font-outfit">
              {formatCurrency(subtotal)}
            </p>
            <p className="text-sm text-gray-400 mt-4">{tCart("subtotal")}</p>
          </div>

          {/* + */}
          <span className="text-xl mb-8 font-outfit">+</span>

          {/* 배송비 */}
          <div className="flex flex-col items-center">
            <p className="text-2xl leading-none font-outfit">
              {shipping === 0
                ? tCart("freeShipping")
                : formatCurrency(shipping)}
            </p>
            <p className="text-sm text-gray-400 mt-4">{tCart("shipping")}</p>
          </div>

          {/* = */}
          <span className="text-xl mb-8 font-outfit">=</span>

          {/* 총액 */}
          <div className="flex flex-col items-center">
            <p className="text-2xl leading-none font-outfit">
              {formatCurrency(total)}
            </p>
            <p className="text-sm text-gray-400 mt-4">{tCart("total")}</p>
          </div>
        </div>

        <hr className="w-full border-t border-gray-200 my-6" />

        {/* 버튼 */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => dispatch(clearCart())}
            className="px-4 py-2 rounded-xs border border-gray-200
            hover:border-[color:var(--color-foreground)]
            transition-colors duration-300 cursor-pointer"
          >
            {tCart("clear")}
          </button>
          <Link
            href={`/${locale}/checkout`}
            className="px-4 py-2 rounded-xs bg-[color:var(--color-foreground)]
            text-[color:var(--color-background)]
            hover:opacity-75 transition-opacity duration-300"
          >
            {tCart("checkout")}
          </Link>
        </div>
      </div>
    </section>
  );
}
