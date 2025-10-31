"use client";

import { useAuth } from "@/components/AuthProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { SHIPPING_FEE } from "@/lib/format";
import { createOrder } from "@/lib/orders";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const router = useRouter();
  const locale = useLocale() as "ko" | "ja";
  const t = useTranslations("checkout");
  const cart = useSelector((s: RootState) => s.cart);
  const shippingFee = SHIPPING_FEE[locale] ?? 2500;

  // 폼 상태 (필수만)
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [phone, setPhone] = useState("");
  const [agree, setAgree] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10">
        주문하려면 로그인해주세요.
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agree) {
      setError("약관에 동의해주세요.");
      return;
    }
    if (cart.items.length === 0) {
      setError("장바구니가 비어 있습니다.");
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
          title: i.title,
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
      setError("주문 중 오류가 발생했습니다.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">결제하기</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          <div>
            <label className="block text-sm mb-1">주문자 이름</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">연락처</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">주소</label>
            <input
              className="w-full border rounded px-3 py-2"
              value={addr}
              onChange={(e) => setAddr(e.target.value)}
              required
            />
          </div>
          <label className="flex gap-2 items-center text-sm">
            <input
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
            />
            이용약관 및 개인정보 처리에 동의합니다.
          </label>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="px-4 py-2 bg-black text-white rounded disabled:opacity-60"
          >
            {submitting ? "처리중..." : "결제하기"}
          </button>
        </div>

        {/* 오른쪽 주문 요약 */}
        <div className="border rounded p-4 space-y-2 bg-gray-50">
          <h2 className="font-semibold mb-2">주문 요약</h2>
          <div className="flex justify-between text-sm">
            <span>상품금액</span>
            <span>{cart.subtotal.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>배송비</span>
            <span>{shippingFee.toLocaleString()}원</span>
          </div>
          <hr />
          <div className="flex justify-between font-semibold">
            <span>총 주문금액</span>
            <span>{(cart.subtotal + shippingFee).toLocaleString()}원</span>
          </div>
        </div>
      </form>
    </section>
  );
}
