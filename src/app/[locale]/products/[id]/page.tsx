import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/site/products.mock";
import ProductDetailClient from "./ProductDetailClient";

type Props = {
  params: Promise<{ locale: "ko" | "ja"; id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const { id, locale } = await params; // 서버에서 Promise 해제
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

        {/* 클라이언트 컴포넌트에 값만 전달 */}
        <ProductDetailClient
          locale={locale}
          p={{ id: p.id, price: p.price, imageUrl: p.imageUrl }}
          title={title}
          desc={desc}
        />
      </div>

      <hr className="my-10" />
      <div className="prose max-w-none text-sm text-gray-700">
        <h2 className="text-base font-semibold mb-2">상세정보 / 詳細</h2>
        <p>{desc ?? "상품 상세 설명이 준비 중입니다。"}</p>
      </div>
    </section>
  );
}
