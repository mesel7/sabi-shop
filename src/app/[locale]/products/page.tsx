import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/site/products.mock";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

type Props = {
  params: Promise<{ locale: "ko" | "ja" }>;
  searchParams: Promise<{
    sort?: "new" | "price_asc" | "price_desc";
    category?: string;
    q?: string;
  }>;
};

export default async function ProductsPage({ params, searchParams }: Props) {
  const { locale } = await params;
  const { sort: sortParam, category: categoryParam, q } = await searchParams;

  const tProducts = await getTranslations({ locale, namespace: "products" });

  const sort = (sortParam ?? "new") as "new" | "price_asc" | "price_desc";
  const isSearching = !!(q && q.trim() !== "");
  const currentCategory = categoryParam ?? "all";

  // 실제 상품 카테고리
  const categories = Array.from(
    new Set(PRODUCTS.map((p) => p.category))
  ).sort();
  const categoryOptions = ["all", ...categories];

  const tCategory = (key: string) => tProducts(`categories.${key}`);

  // 기본 상품
  const baseList = PRODUCTS.filter((p) => p.isActive);

  // 검색: 전체에서 먼저
  let list = baseList;
  if (isSearching) {
    const keyword = q!.trim().toLowerCase();
    list = baseList.filter((p) => {
      const ko = p.title_ko?.toLowerCase() ?? "";
      const ja = p.title_ja?.toLowerCase() ?? "";
      return ko.includes(keyword) || ja.includes(keyword);
    });
  }

  // 검색 결과 안에서 카테고리
  if (currentCategory !== "all") {
    list = list.filter((p) => p.category === currentCategory);
  }

  // 정렬
  list = [...list].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    return b.createdAt - a.createdAt;
  });

  // 쿼리 빌더
  const buildQuery = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams();

    const finalSort = overrides.sort ?? sort;
    const finalQ =
      overrides.q !== undefined ? overrides.q : isSearching ? q!.trim() : "";
    const finalCategory =
      overrides.category !== undefined ? overrides.category : currentCategory;

    if (finalSort) params.set("sort", finalSort);
    if (finalQ && finalQ !== "") params.set("q", finalQ);
    if (finalCategory && finalCategory !== "all") {
      params.set("category", finalCategory);
    }

    const qs = params.toString();
    return qs ? `/${locale}/products?${qs}` : `/${locale}/products`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        {/* 카테고리 */}
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((cat) => (
            <Link
              key={cat}
              href={buildQuery({ category: cat })}
              replace
              className={`px-3 py-1 rounded-full text-sm border transition-colors duration-300 ${
                currentCategory === cat
                  ? "bg-[color:var(--color-foreground)] text-white border-[color:var(--color-foreground)]"
                  : "border-gray-200 hover:border-[color:var(--color-foreground)]"
              }`}
            >
              {tCategory(cat)}
            </Link>
          ))}
        </div>

        {/* 검색창 */}
        <form
          action={`/${locale}/products`}
          method="GET"
          className="flex items-center gap-2"
        >
          <input type="hidden" name="sort" value={sort} />
          {/* 검색은 전체에서 하니까 category는 안 보냄 */}

          <div className="flex items-center gap-2">
            <input
              name="q"
              defaultValue={q ?? ""}
              placeholder={tProducts("searchPlaceholder")}
              className="border-b border-gray-300 focus:border-[color:var(--color-foreground)] transition-colors duration-300 outline-none pb-1 text-sm"
            />
            {/* X 버튼: 검색/카테고리 초기화 */}
            {isSearching ? (
              <Link
                href={`/${locale}/products?sort=${sort}`}
                replace
                className="text-gray-400 hover:text-[color:var(--color-foreground)] transition-colors duration-300 text-sm"
                aria-label="clear search"
              >
                ✕
              </Link>
            ) : null}
            {/* 돋보기 아이콘 */}
            <button
              type="submit"
              className="text-gray-400 hover:text-[color:var(--color-foreground)] transition-colors duration-300 cursor-pointer"
              aria-label="search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-4.35-4.35m0-6.4a6.25 6.25 0 1 1-12.5 0 6.25 6.25 0 0 1 12.5 0Z"
                />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* 정렬 */}
      <div className="mb-6 flex gap-6 text-sm">
        <Link
          href={buildQuery({ sort: "new" })}
          replace
          className={`pb-1 transition-colors duration-300 ${
            sort === "new"
              ? "font-semibold border-b-2 border-[color:var(--color-foreground)] text-[color:var(--color-foreground)]"
              : "text-gray-500 hover:text-[color:var(--color-foreground)]"
          }`}
        >
          {tProducts("sortNew")}
        </Link>
        <Link
          href={buildQuery({ sort: "price_asc" })}
          replace
          className={`pb-1 transition-colors duration-300 ${
            sort === "price_asc"
              ? "font-semibold border-b-2 border-[color:var(--color-foreground)] text-[color:var(--color-foreground)]"
              : "text-gray-500 hover:text-[color:var(--color-foreground)]"
          }`}
        >
          {tProducts("sortPriceAsc")}
        </Link>
        <Link
          href={buildQuery({ sort: "price_desc" })}
          replace
          className={`pb-1 transition-colors duration-300 ${
            sort === "price_desc"
              ? "font-semibold border-b-2 border-[color:var(--color-foreground)] text-[color:var(--color-foreground)]"
              : "text-gray-500 hover:text-[color:var(--color-foreground)]"
          }`}
        >
          {tProducts("sortPriceDesc")}
        </Link>
      </div>

      {/* 검색 결과 */}
      {isSearching ? (
        <p className="mb-4 text-sm text-gray-500">
          {tProducts("searchResult", {
            keyword: q,
            count: list.length,
          })}
        </p>
      ) : null}

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
