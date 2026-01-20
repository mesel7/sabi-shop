import { Link } from "@/i18n/navigation";
import { Search, X } from "lucide-react";

type Props = {
  sort: string;
  q: string;
  isSearching: boolean;
  placeholder: string;
  clearHref: string;
};

export default function SearchBar({
  sort,
  q,
  isSearching,
  placeholder,
  clearHref,
}: Props) {
  return (
    <form action="/products" method="GET" className="flex items-center gap-2">
      <input type="hidden" name="sort" value={sort} />

      <div className="flex items-center gap-2">
        <input
          name="q"
          defaultValue={q}
          placeholder={placeholder}
          className="border-b border-gray-300 focus:border-[color:var(--color-foreground)] transition-colors duration-200 outline-none pb-1 text-sm"
        />

        {isSearching ? (
          <Link
            href={clearHref}
            replace
            className="text-gray-400 hover:text-[color:var(--color-foreground)] transition-colors duration-200 text-sm"
            aria-label="clear search"
          >
            <X className="w-4 h-4" />
          </Link>
        ) : null}

        <button
          type="submit"
          className="text-gray-400 hover:text-[color:var(--color-foreground)] transition-colors duration-200 cursor-pointer"
          aria-label="search"
        >
          <Search className="w-5 h-5 stroke-[1.7]" />
        </button>
      </div>
    </form>
  );
}
