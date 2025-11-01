"use client";

import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { useTranslations } from "next-intl";

type Props = {
  locale: "ko" | "ja";
  p: { id: string; price: number; imageUrl: string };
  title: string;
  desc?: string;
};

export default function ProductDetailClient({ locale, p, title, desc }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();

  const tProductDetail = useTranslations("productDetail");

  const handleAddCart = () => {
    dispatch(
      addItem({
        id: p.id,
        title,
        price: p.price,
        qty: 1,
        imageUrl: p.imageUrl,
      })
    );
    alert(tProductDetail("addedToCart"));
  };

  const handleBuyNow = () => {
    handleAddCart();
    router.push(`/${locale}/cart`);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="mt-2 text-gray-600">{formatCurrency(locale, p.price)}</p>
      {desc && <p className="mt-4 text-gray-500">{desc}</p>}

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleAddCart}
          className="px-4 py-2 rounded border hover:border-black"
        >
          {tProductDetail("addToCart")}
        </button>
        <button
          onClick={handleBuyNow}
          className="px-4 py-2 rounded bg-black text-white"
        >
          {tProductDetail("buyNow")}
        </button>
      </div>
    </div>
  );
}
