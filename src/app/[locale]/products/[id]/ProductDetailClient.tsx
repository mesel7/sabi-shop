"use client";

import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { useTranslations } from "next-intl";

type Props = {
  locale: "ko" | "ja";
  p: {
    id: string;
    price: number;
    imageUrl: string;
    title_ko: string;
    title_ja: string;
  };
  desc?: string;
};

export default function ProductDetailClient({ locale, p, desc }: Props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const tProductDetail = useTranslations("productDetail");
  const displayTitle = locale === "ja" ? p.title_ja : p.title_ko;

  const handleAddCart = () => {
    dispatch(
      addItem({
        id: p.id,
        title_ko: p.title_ko,
        title_ja: p.title_ja,
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
      <h1 className="text-2xl font-bold">{displayTitle}</h1>
      <p className="mt-2 text-gray-500 font-outfit">
        {formatCurrency(p.price)}
      </p>
      {desc && <p className="mt-4 text-gray-500">{desc}</p>}

      <div className="mt-6 flex gap-3">
        <button
          onClick={handleAddCart}
          className="px-4 py-2 rounded-xs border border-gray-200
            hover:border-[color:var(--color-foreground)]
            transition-colors duration-300 cursor-pointer"
        >
          {tProductDetail("addToCart")}
        </button>

        <button
          onClick={handleBuyNow}
          className="px-4 py-2 rounded-xs bg-[color:var(--color-foreground)]
            text-[color:var(--color-background)]
            hover:opacity-75 transition-opacity duration-300 cursor-pointer"
        >
          {tProductDetail("buyNow")}
        </button>
      </div>
    </div>
  );
}
