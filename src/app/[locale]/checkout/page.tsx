"use client";

import { useAuth } from "@/components/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { useLocale, useTranslations } from "next-intl";
import { useId, useState } from "react";
import { formatCurrency, SHIPPING_FEE } from "@/lib/format";
import { createOrder } from "@/lib/orders";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale() as "ko" | "ja";

  const tCheckout = useTranslations("checkout");
  const tCommon = useTranslations("common");
  const tAuth = useTranslations("auth");

  const cart = useSelector((s: RootState) => s.cart);
  const shippingFee = SHIPPING_FEE[locale] ?? 2500;

  // 폼 상태
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // 고유 id(유의미할 필요는 없고 구분만 가능하게)
  const nameId = useId();
  const phoneId = useId();
  const addrId = useId();
  const agreeId = useId();

  if (!user) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p>{tCheckout("needLogin")}</p>
      </section>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setError(tCheckout("errorAgree"));
      return;
    }
    if (cart.items.length === 0) {
      setError(tCheckout("errorEmptyCart"));
      return;
    }

    setSubmitting(true);
    setError("");

    try {
      const subtotal = cart.subtotal;
      const total = subtotal + shippingFee;

      const orderId = await createOrder({
        userId: user.uid,
        items: cart.items.map((i) => ({
          productId: i.id,
          title_ko: i.title_ko,
          title_ja: i.title_ja,
          price: i.price,
          qty: i.qty,
          imageUrl: i.imageUrl,
        })),
        subtotal,
        shippingFee,
        total,
      });

      // 주문 성공, 장바구니 비우기
      dispatch(clearCart());

      // 성공하면 완료 화면으로
      router.push(`/${locale}/order/success?id=${orderId}`);
    } catch (err: any) {
      console.error(err);
      setError(tCommon("notFound"));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">{tCheckout("title")}</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label htmlFor={nameId} className="block text-sm mb-1">
              {tCheckout("name")}
            </label>
            <input
              id={nameId}
              className="w-full border border-gray-300 rounded-xs px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor={phoneId} className="block text-sm mb-1">
              {tCheckout("phone")}
            </label>
            <input
              id={phoneId}
              className="w-full border border-gray-300 rounded-xs px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor={addrId} className="block text-sm mb-1">
              {tCheckout("address")}
            </label>
            <input
              id={addrId}
              className="w-full border border-gray-300 rounded-xs px-3 py-2"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              required
            />
          </div>
          <label htmlFor={agreeId} className="flex gap-2 items-center text-sm">
            <input
              id={agreeId}
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            {tCheckout("agree")}
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="rounded-xs px-4 py-2 bg-[color:var(--color-foreground)]
              text-[color:var(--color-background)]
              hover:opacity-75 transition-opacity duration-300 cursor-pointer disabled:opacity-75"
          >
            {submitting ? tCommon("loading") : tCheckout("placeOrder")}
          </button>
        </div>

        <div className="p-4 space-y-2">
          <h2 className="font-semibold mb-2">{tCheckout("summary")}</h2>
          <div className="flex justify-between text-sm">
            <span>{tCheckout("products")}</span>
            <span className="font-outfit">{formatCurrency(cart.subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>{tCheckout("delivery")}</span>
            <span className="font-outfit">{formatCurrency(shippingFee)}</span>
          </div>
          <hr className="text-gray-200" />
          <div className="flex justify-between font-semibold">
            <span>{tCheckout("total")}</span>
            <span className="font-outfit">
              {formatCurrency(cart.subtotal + shippingFee)}
            </span>
          </div>
        </div>
      </form>
    </section>
  );
}
