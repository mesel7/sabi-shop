"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "@/store";
import { updateQty, removeItem, clearCart } from "@/store/cartSlice";
import { formatCurrency, SHIPPING_FEE } from "@/lib/format";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

import { X } from "lucide-react";
import { Button } from "@/shared/ui/button/Button.client";
import { ButtonLink } from "@/shared/ui/button/ButtonLink";

export default function CartPage() {
  const dispatch = useDispatch();

  const locale = useLocale() as "ko" | "ja";
  const tCart = useTranslations("cart");

  const { items, subtotal } = useSelector((s: RootState) => s.cart);

  const shipping = SHIPPING_FEE[locale];
  const total = subtotal + shipping;

  return (
    <section
      className="max-w-4xl mx-auto px-4 py-10"
      aria-labelledby="cart-title"
    >
      <h1 id="cart-title" className="text-2xl font-bold mb-8">
        {tCart("title")}
      </h1>

      {items.length === 0 ? (
        <div className="py-20 text-center">
          <p>{tCart("empty")}</p>

          <Link href="/products" className="mt-8 inline-block">
            {tCart("goShop")}
          </Link>
        </div>
      ) : (
        <>
          {/* 상품 목록 */}
          <div className="border-t border-b border-gray-200 divide-y divide-gray-200">
            {items.map((it) => {
              const title = locale === "ja" ? it.title_ja : it.title_ko;

              return (
                <div
                  key={it.id}
                  className="flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between"
                >
                  {/* 좌측: 썸네일 + 정보 */}
                  <div className="flex items-center gap-4">
                    <img
                      src={it.imageUrl}
                      alt={title}
                      className="w-20 h-20 object-contain bg-gray-100"
                    />
                    <div>
                      <p className="font-medium">{title}</p>
                      <p className="text-sm text-gray-500 font-outfit">
                        {formatCurrency(it.price)}
                      </p>
                    </div>
                  </div>
                  {/* 우측: 수량, 금액, 삭제 */}
                  <div className="flex items-center gap-2 self-end md:self-auto">
                    {/* input: no visible label -> aria-label */}
                    <input
                      type="number"
                      min={1}
                      max={99}
                      inputMode="numeric"
                      value={it.qty}
                      onChange={(e) =>
                        dispatch(
                          updateQty({
                            id: it.id,
                            qty: Number(e.target.value),
                          }),
                        )
                      }
                      className="w-14 border border-gray-300 text-center"
                      aria-label="Quantity"
                    />

                    <p className="w-20 text-right font-outfit">
                      {formatCurrency(it.price * it.qty)}
                    </p>

                    {/* icon-only button -> aria-label */}
                    <button
                      type="button"
                      onClick={() => dispatch(removeItem(it.id))}
                      className="text-gray-400 hover:text-[color:var(--color-foreground)] transition-colors duration-300 cursor-pointer flex items-center justify-center"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 총합계 영역 */}
          <div className="mt-10 text-center">
            <div className="flex flex-col items-center gap-6 md:flex-row md:justify-center md:items-end md:gap-8">
              {/* 상품 합계 */}
              <div className="flex flex-col items-center">
                <p className="text-2xl leading-none font-outfit">
                  {formatCurrency(subtotal)}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {tCart("subtotal")}
                </p>
              </div>
              {/* + (데스크탑에서만 수식 느낌) */}
              <span className="hidden md:inline text-xl mb-6 font-outfit">
                +
              </span>
              {/* 배송비 */}
              <div className="flex flex-col items-center">
                <p className="text-2xl leading-none font-outfit">
                  {shipping === 0
                    ? tCart("freeShipping")
                    : formatCurrency(shipping)}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {tCart("shipping")}
                </p>
              </div>

              <span className="hidden md:inline text-xl mb-6 font-outfit">
                =
              </span>
              {/* 총액 */}
              <div className="flex flex-col items-center">
                <p className="text-2xl leading-none font-outfit">
                  {formatCurrency(total)}
                </p>
                <p className="text-sm text-gray-400 mt-2">{tCart("total")}</p>
              </div>
            </div>

            <hr className="w-full border-t border-gray-200 my-6" />

            <div className="flex flex-col gap-3 items-stretch justify-center md:flex-row md:gap-4">
              <Button
                type="button"
                onClick={() => dispatch(clearCart())}
                variant="outline"
                className="w-full md:w-auto"
              >
                {tCart("clear")}
              </Button>

              <ButtonLink
                href="/checkout"
                variant="primary"
                className="w-full md:w-auto"
              >
                {tCart("checkout")}
              </ButtonLink>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
