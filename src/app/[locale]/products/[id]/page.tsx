import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/site/products.mock";
import { formatCurrency } from "@/lib/format";

type Props = {
  params: Promise<{ locale: "ko" | "ja"; id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const { id, locale } = await params;

  const p = PRODUCTS.find((x) => x.id === id && x.isActive);
  if (!p) notFound();

  const title = locale === "ja" ? p.title_ja : p.title_ko;
  const desc = locale === "ja" ? p.description_ja : p.description_ko;

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="relative aspect-square bg-gray-100 rounded">
          <Image
            src={p.imageUrl}
            alt={title}
            fill
            className="object-contain p-6"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">{title}</h1>
          <p className="mt-2 text-gray-600">
            {formatCurrency(locale, p.price)}
          </p>
          {desc && <p className="mt-4 text-gray-500">{desc}</p>}

          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 rounded border hover:border-black">
              장바구니 / カートに入れる
            </button>
            <button className="px-4 py-2 rounded bg-black text-white">
              바로구매 / 購入する
            </button>
          </div>
        </div>
      </div>

      <hr className="my-10" />
      <div className="prose max-w-none text-sm text-gray-700">
        <h2 className="text-base font-semibold mb-2">상세정보 / 詳細</h2>
        <p>{desc ?? "상품 상세 설명이 준비 중입니다。"} </p>
      </div>
    </section>
  );
}
