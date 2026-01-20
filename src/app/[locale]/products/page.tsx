import ProductsPage from "@/features/products";
import type { ProductsSearchParams } from "@/features/products/model/query";

type Props = {
  searchParams: Promise<ProductsSearchParams>;
};

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <main className="flex-1 pt-16">
      <ProductsPage searchParams={sp} />
    </main>
  );
}
