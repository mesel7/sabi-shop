"use client";

import React, { useId, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useAuth } from "@/lib/auth/AuthProvider";
import type { RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";

import { useTranslations, useLocale } from "next-intl";
import { useRouter } from "@/i18n/navigation";

import { SHIPPING_FEE } from "@/lib/format";
import { createOrder } from "@/lib/orders";

import { Check } from "lucide-react";
import { Button } from "@/shared/ui/button/Button.client";
import OrderSummary from "./OrderSummary";

export default function CheckoutPage() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const locale = useLocale() as "ko" | "ja";
  const tCheckout = useTranslations("checkout");
  const tCommon = useTranslations("common");

  const cart = useSelector((s: RootState) => s.cart);

  const shippingFee = SHIPPING_FEE[locale] ?? 2500;

  // form
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ids
  const nameId = useId();
  const phoneId = useId();
  const addrId = useId();
  const agreeId = useId();

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
        userId: user!.uid,
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
        // name, addr, phone을 실제로 저장한다면 createOrder 타입에 추가해도 됨
      });

      dispatch(clearCart());

      router.push(`/order/success?id=${orderId}`);
    } catch (err) {
      console.error(err);
      setError(tCommon("notFound"));
    } finally {
      setSubmitting(false);
    }
  };

  // 로그인 필요 UI
  if (!user) {
    return (
      <section
        className="max-w-4xl mx-auto px-4 py-20 text-center"
        aria-label="Checkout"
      >
        <p>{tCheckout("needLogin")}</p>
      </section>
    );
  }

  return (
    <section
      className="max-w-4xl mx-auto px-4 py-10"
      aria-labelledby="checkout-title"
    >
      <h1 id="checkout-title" className="text-2xl font-bold mb-6">
        {tCheckout("title")}
      </h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label htmlFor={nameId} className="block text-sm mb-1">
              {tCheckout("name")}
            </label>
            <input
              id={nameId}
              className="w-full border border-gray-300 px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div>
            <label htmlFor={phoneId} className="block text-sm mb-1">
              {tCheckout("phone")}
            </label>
            <input
              id={phoneId}
              className="w-full border border-gray-300 px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              autoComplete="tel"
            />
          </div>

          <div>
            <label htmlFor={addrId} className="block text-sm mb-1">
              {tCheckout("address")}
            </label>
            <input
              id={addrId}
              className="w-full border border-gray-300 px-3 py-2"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              required
              autoComplete="street-address"
            />
          </div>

          {/* mobile summary */}
          <div className="md:hidden mt-4">
            <OrderSummary
              subtotal={cart.subtotal}
              shippingFee={shippingFee}
              tCheckout={tCheckout}
            />
          </div>

          {/* custom checkbox */}
          <label
            htmlFor={agreeId}
            className="flex gap-2 items-center text-sm cursor-pointer select-none mt-4"
          >
            <span
              className={`
                inline-flex items-center justify-center
                w-4 h-4 border
                ${
                  agree
                    ? "bg-[color:var(--color-foreground)] border-[color:var(--color-foreground)]"
                    : "border-gray-500 bg-[color:var(--color-background)]"
                }
                transition-colors
              `}
              aria-hidden="true"
            >
              {agree && (
                <Check
                  className="w-3 h-3 text-[color:var(--color-background)]"
                  aria-hidden="true"
                />
              )}
            </span>

            <span>{tCheckout("agree")}</span>

            <input
              id={agreeId}
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="sr-only"
              aria-label="Agree to terms"
            />
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button
            type="submit"
            variant="primary"
            full
            disabled={submitting}
            className="mt-2 md:w-auto"
          >
            {submitting ? tCommon("loading") : tCheckout("placeOrder")}
          </Button>
        </div>

        {/* desktop summary */}
        <div className="hidden md:block">
          <OrderSummary
            subtotal={cart.subtotal}
            shippingFee={shippingFee}
            tCheckout={tCheckout}
          />
        </div>
      </form>
    </section>
  );
}
