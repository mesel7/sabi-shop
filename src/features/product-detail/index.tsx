import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { PRODUCTS } from "@/site/products.mock";
import ProductDetailActions from "./ProductDetailActions.client";

type Props = { id: string };

export default async function ProductDetailPage({ id }: Props) {
  const locale = (await getLocale()) as "ko" | "ja";
  const t = await getTranslations("productDetail");

  const p = PRODUCTS.find((x) => x.id === id && x.isActive);
  if (!p) notFound();

  const displayTitle = locale === "ja" ? p.title_ja : p.title_ko;
  const desc = locale === "ja" ? p.description_ja : p.description_ko;

  return (
    <section
      className="mx-auto max-w-4xl px-4 py-10"
      aria-label="Product detail"
    >
      <div className="grid gap-10 md:grid-cols-2">
        <div className="relative aspect-square bg-gray-100">
          <Image
            src={p.imageUrl}
            alt={displayTitle}
            width={1024}
            height={1024}
            className="h-full w-full object-contain"
            priority
          />
        </div>

        <ProductDetailActions
          p={{
            id: p.id,
            price: p.price,
            imageUrl: p.imageUrl,
            title_ko: p.title_ko,
            title_ja: p.title_ja,
          }}
          displayTitle={displayTitle}
          desc={desc}
          labels={{
            addToCart: t("addToCart"),
            buyNow: t("buyNow"),
            addedToCart: t("addedToCart"),
          }}
        />
      </div>

      <hr className="my-10 text-gray-200" />

      <div className="prose max-w-none text-sm text-gray-700">
        <h2 className="mb-2 text-base font-semibold">{t("detailTitle")}</h2>
        <p>{desc ?? t("emptyDescription")}</p>
      </div>
    </section>
  );
}
