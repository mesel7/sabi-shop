import ProductCard from "@/features/products/components/ProductCard";
import { PRODUCTS } from "@/site/products.mock";
import { getTranslations } from "next-intl/server";

import CategoryChips from "./components/CategoryChips";
import SearchBar from "./components/SearchBar";
import SortTabs from "./components/SortTabs";

import { filterAndSortProducts, getCategoryOptions } from "./model/filter";
import {
  createProductsHrefBuilder,
  normalizeProductsQuery,
  type ProductsSearchParams,
} from "./model/query";

type Props = {
  searchParams: ProductsSearchParams;
};

export default async function ProductsPage({ searchParams }: Props) {
  const tProducts = await getTranslations("products");

  const { sort, currentCategory, q, isSearching } =
    normalizeProductsQuery(searchParams);

  const categoryOptions = getCategoryOptions(PRODUCTS);
  const tCategory = (key: string) => tProducts(`categories.${key}`);

  const buildQuery = createProductsHrefBuilder({
    sort,
    currentCategory,
    q,
  });

  const list = filterAndSortProducts({
    products: PRODUCTS,
    q,
    currentCategory,
    sort,
  });

  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16"
      aria-label="Products list"
    >
      <div className="mb-6 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <CategoryChips
          categoryOptions={categoryOptions}
          currentCategory={currentCategory}
          tCategory={tCategory}
          buildQuery={buildQuery}
        />

        <SearchBar
          sort={sort}
          q={q}
          isSearching={isSearching}
          placeholder={tProducts("searchPlaceholder")}
          clearHref={buildQuery({ q: "", category: "all" })}
        />
      </div>

      <SortTabs
        sort={sort}
        buildQuery={buildQuery}
        labels={{
          new: tProducts("sortNew"),
          priceAsc: tProducts("sortPriceAsc"),
          priceDesc: tProducts("sortPriceDesc"),
        }}
      />

      {isSearching ? (
        <p className="mb-4 text-sm text-gray-500">
          {tProducts("searchResult", { keyword: q, count: list.length })}
        </p>
      ) : null}

      {list.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          {tProducts("empty")}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {list.map((p) => (
            <ProductCard key={p.id} p={p} />
          ))}
        </div>
      )}
    </section>
  );
}
