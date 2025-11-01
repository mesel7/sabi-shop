import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/site/products.mock";
import { getTranslations } from "next-intl/server";

type Props = {
  params: Promise<{ locale: "ko" | "ja" }>;
  searchParams: Promise<{ sort?: "new" | "price_asc" | "price_desc" }>;
};

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { sort: sortParam } = await searchParams;

  const tProducts = await getTranslations({ locale, namespace: "products" });

  const sort = (sortParam ?? "new") as "new" | "price_asc" | "price_desc";

  // 상품 정렬 로직
  let list = PRODUCTS.filter((p) => p.isActive);
  list = [...list].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    return b.createdAt - a.createdAt;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      {/* 정렬 버튼 */}
      <div className="mb-6 flex items-center gap-2 text-sm">
        <a
          href={`/${locale}/products?sort=new`}
          className={`px-2 py-1 border rounded ${
            sort === "new"
              ? "bg-black text-white border-black"
              : "hover:border-black"
          }`}
        >
          {tProducts("sortNew")}
        </a>
        <a
          href={`/${locale}/products?sort=price_asc`}
          className={`px-2 py-1 border rounded ${
            sort === "price_asc"
              ? "bg-black text-white border-black"
              : "hover:border-black"
          }`}
        >
          {tProducts("sortPriceAsc")}
        </a>
        <a
          href={`/${locale}/products?sort=price_desc`}
          className={`px-2 py-1 border rounded ${
            sort === "price_desc"
              ? "bg-black text-white border-black"
              : "hover:border-black"
          }`}
        >
          {tProducts("sortPriceDesc")}
        </a>
      </div>

      {/* 상품 목록 */}
      {list.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          {tProducts("empty")}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </section>
  );
}
