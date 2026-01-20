import type { Product } from "@/types";
import type { Sort } from "./query";

export function getCategoryOptions(products: Product[]) {
  const categories = Array.from(
    new Set(products.map((p) => p.category)),
  ).sort();
  return ["all", ...categories];
}

export function filterAndSortProducts(args: {
  products: Product[];
  q: string; // trimmed
  currentCategory: string; // "all" | category
  sort: Sort;
}) {
  const { products, q, currentCategory, sort } = args;

  const baseList = products.filter((p) => p.isActive);

  let list = baseList;

  if (q !== "") {
    const keyword = q.toLowerCase();
    list = baseList.filter((p) => {
      return (
        p.title_ko.toLowerCase().includes(keyword) ||
        p.title_ja.toLowerCase().includes(keyword)
      );
    });
  }

  if (currentCategory !== "all") {
    list = list.filter((p) => p.category === currentCategory);
  }

  list = [...list].sort((a, b) => {
    if (sort === "price_asc") return a.price - b.price;
    if (sort === "price_desc") return b.price - a.price;
    return b.createdAt - a.createdAt;
  });

  return list;
}
