export type Sort = "new" | "price_asc" | "price_desc";

export type ProductsSearchParams = {
  sort?: string;
  category?: string;
  q?: string;
};

export type ProductsQueryState = {
  sort: Sort;
  currentCategory: string; // "all" | category
  q: string; // trimmed
  isSearching: boolean;
};

const VALID_SORT: Sort[] = ["new", "price_asc", "price_desc"];

export function normalizeProductsQuery(
  sp: ProductsSearchParams,
): ProductsQueryState {
  const sortCandidate = sp.sort;
  const sort: Sort = VALID_SORT.includes(sortCandidate as Sort)
    ? (sortCandidate as Sort)
    : "new";

  const currentCategory = sp.category ?? "all";
  const q = (sp.q ?? "").trim();
  const isSearching = q !== "";

  return { sort, currentCategory, q, isSearching };
}

export function createProductsHrefBuilder(args: {
  sort: Sort;
  currentCategory: string;
  q: string;
}) {
  const { sort, currentCategory, q } = args;

  return function buildQuery(
    overrides: Partial<{ sort: Sort; category: string; q: string }>,
  ) {
    const params = new URLSearchParams();

    const finalSort = overrides.sort ?? sort;
    const finalQ = overrides.q !== undefined ? overrides.q : q;
    const finalCategory = overrides.category ?? currentCategory;

    if (finalSort) params.set("sort", finalSort);
    if (finalQ && finalQ !== "") params.set("q", finalQ);
    if (finalCategory && finalCategory !== "all") {
      params.set("category", finalCategory);
    }

    const qs = params.toString();
    return qs ? `/products?${qs}` : `/products`;
  };
}
