import { Link } from "@/i18n/navigation";

type Props = {
  categoryOptions: string[];
  currentCategory: string;
  tCategory: (key: string) => string;
  buildQuery: (overrides: Record<string, string | undefined>) => string;
};

export default function CategoryChips({
  categoryOptions,
  currentCategory,
  tCategory,
  buildQuery,
}: Props) {
  return (
    <nav aria-label="Categories" className="flex flex-wrap gap-2">
      {categoryOptions.map((cat) => {
        const isActive = currentCategory === cat;

        return (
          <Link
            key={cat}
            href={buildQuery({ category: cat })}
            replace
            aria-current={isActive ? "page" : undefined}
            className={`px-3 py-1 rounded-full text-sm border transition-colors duration-200 ${
              isActive
                ? "bg-[color:var(--color-foreground)] text-white border-[color:var(--color-foreground)]"
                : "border-gray-200 hover:border-[color:var(--color-foreground)]"
            }`}
          >
            {tCategory(cat)}
          </Link>
        );
      })}
    </nav>
  );
}
