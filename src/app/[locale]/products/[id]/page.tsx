import ProductDetailPage from "@/features/product-detail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <main className="flex-1 pt-16">
      <ProductDetailPage id={id} />
    </main>
  );
}
