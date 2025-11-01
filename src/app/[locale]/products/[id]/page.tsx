import Image from "next/image";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/site/products.mock";
import ProductDetailClient from "./ProductDetailClient";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: "ko" | "ja"; id: string }>;
};

export default async function ProductDetail({ params }: Props) {
  const { id, locale } = await params;

  const tProductDetail = await getTranslations({
    locale,
    namespace: "productDetail",
  });

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

        <ProductDetailClient
          locale={locale}
          p={{ id: p.id, price: p.price, imageUrl: p.imageUrl }}
          title={title}
          desc={desc}
        />
      </div>

      <hr className="my-10" />
      <div className="prose max-w-none text-sm text-gray-700">
        <h2 className="text-base font-semibold mb-2">
          {tProductDetail("detailTitle")}
        </h2>
        <p>{desc ?? tProductDetail("emptyDescription")}</p>
      </div>
    </section>
  );
}
