import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import ProductCard from "@/features/products/components/ProductCard";
import { PRODUCTS } from "@/site/products.mock";

export default async function SeasonalBeans() {
  const t = await getTranslations("home");

  const beans = PRODUCTS.filter((p) => p.category === "beans" && p.isActive)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);

  return (
    <section
      className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16"
      aria-labelledby="seasonal-beans-title"
    >
      <div className="flex flex-col items-center text-center md:flex-row md:items-center md:text-left relative">
        <h2
          id="seasonal-beans-title"
          className="text-2xl font-semibold font-outfit mb-2 md:mb-0 md:absolute md:left-1/2 md:-translate-x-1/2"
        >
          {t("featured.title")}
        </h2>

        <Link
          href="/products"
          className="text-sm text-gray-500 hover:text-[color:var(--color-foreground)] transition-colors duration-200 md:ml-auto"
        >
          {t("featured.more")}
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {beans.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </section>
  );
}
