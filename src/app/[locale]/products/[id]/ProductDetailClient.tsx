"use client";

import { useDispatch } from "react-redux";
import { addItem } from "@/store/cartSlice";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/format";
import { useTranslations } from "next-intl";
import { Button } from "@/components/Button";

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

      <div
        className="
    mt-8
    flex flex-col gap-3 items-stretch
    md:flex-row md:items-center md:gap-4
  "
      >
        <Button
          onClick={handleAddCart}
          variant="outline"
          full
          className="md:w-auto"
        >
          {tProductDetail("addToCart")}
        </Button>

        <Button
          onClick={handleBuyNow}
          variant="primary"
          full
          className="md:w-auto"
        >
          {tProductDetail("buyNow")}
        </Button>
      </div>
    </div>
  );
}
