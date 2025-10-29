"use client";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store";
import { clear } from "@/store/cartSlice";
import { useLocale } from "next-intl";
import { formatCurrency, SHIPPING_FEE } from "@/lib/format";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const locale = useLocale() as "ko" | "ja";
  const { items, subtotal } = useSelector((s: RootState) => s.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  const shipping = SHIPPING_FEE[locale];
  const total = subtotal + shipping;

  // 폼 상태
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    memo: "",
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.agree) {
      alert("약관에 동의해야 결제 가능합니다.");
      return;
    }

    if (!form.name || !form.email || !form.phone || !form.address) {
      alert("필수 입력 항목을 모두 채워주세요.");
      return;
    }

    // Firestore 연동 전 Mock 저장
    const orderId = "ORD-" + Math.floor(Math.random() * 1000000);
    console.log("주문 생성:", {
      orderId,
      items,
      subtotal,
      shipping,
      total,
      form,
      status: "paid-mock",
      createdAt: new Date().toISOString(),
    });

    // 장바구니 초기화 + 완료 페이지로 이동
    dispatch(clear());
    router.push(`/${locale}/order/success?id=${orderId}`);
  };

  if (items.length === 0) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-500">
        <p>장바구니가 비어있습니다 🛒</p>
      </section>
    );
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8">주문 / チェックアウト</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-8">
        {/* 왼쪽 - 입력폼 */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">이름 / お名前</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">이메일 / メール</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              연락처 / 電話番号
            </label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">주소 / 住所</label>
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">
              배송 메모 / メモ
            </label>
            <textarea
              name="memo"
              value={form.memo}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 mt-1"
              rows={3}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="agree"
              checked={form.agree}
              onChange={handleChange}
              className="w-4 h-4"
            />
            <span className="text-sm text-gray-600">
              이용약관 및 개인정보 처리방침에 동의합니다。
            </span>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white rounded py-2 mt-4 hover:opacity-80"
          >
            결제하기 / 決済する
          </button>
        </div>

        {/* 오른쪽 - 주문 요약 */}
        <div className="border rounded p-4 bg-gray-50">
          <h2 className="font-semibold mb-4">주문 요약 / 注文内容</h2>
          <ul className="space-y-2 text-sm">
            {items.map((it) => (
              <li key={it.id} className="flex justify-between">
                <span>
                  {it.title} × {it.qty}
                </span>
                <span>{formatCurrency(locale, it.price * it.qty)}</span>
              </li>
            ))}
          </ul>

          <hr className="my-3" />
          <p className="flex justify-between text-sm">
            <span>상품 합계</span>
            <span>{formatCurrency(locale, subtotal)}</span>
          </p>
          <p className="flex justify-between text-sm">
            <span>배송비</span>
            <span>{formatCurrency(locale, shipping)}</span>
          </p>
          <p className="flex justify-between font-bold mt-2">
            <span>총액</span>
            <span>{formatCurrency(locale, total)}</span>
          </p>
        </div>
      </form>
    </section>
  );
}
