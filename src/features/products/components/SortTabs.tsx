import { Link } from "@/i18n/navigation";
import type { Sort } from "../model/query";

type Props = {
  sort: Sort;
  buildQuery: (overrides: Record<string, string | undefined>) => string;
  labels: {
    new: string;
    priceAsc: string;
    priceDesc: string;
  };
};

export default function SortTabs({ sort, buildQuery, labels }: Props) {
  return (
    <nav className="mb-6 flex gap-6 text-sm" aria-label="Sort options">
      <Link
        href={buildQuery({ sort: "new" })}
        replace
        aria-current={sort === "new" ? "page" : undefined}
        className={`pb-1 transition-colors duration-200 ${
          sort === "new"
            ? "font-semibold border-b-2 border-[color:var(--color-foreground)] text-[color:var(--color-foreground)]"
            : "text-gray-500 hover:text-[color:var(--color-foreground)]"
        }`}
      >
        {labels.new}
      </Link>

      <Link
        href={buildQuery({ sort: "price_asc" })}
        replace
        aria-current={sort === "price_asc" ? "page" : undefined}
        className={`pb-1 transition-colors duration-200 ${
          sort === "price_asc"
            ? "font-semibold border-b-2 border-[color:var(--color-foreground)] text-[color:var(--color-foreground)]"
            : "text-gray-500 hover:text-[color:var(--color-foreground)]"
        }`}
      >
        {labels.priceAsc}
      </Link>

      <Link
        href={buildQuery({ sort: "price_desc" })}
        replace
        aria-current={sort === "price_desc" ? "page" : undefined}
        className={`pb-1 transition-colors duration-200 ${
          sort === "price_desc"
            ? "font-semibold border-b-2 border-[color:var(--color-foreground)] text-[color:var(--color-foreground)]"
            : "text-gray-500 hover:text-[color:var(--color-foreground)]"
        }`}
      >
        {labels.priceDesc}
      </Link>
    </nav>
  );
}
