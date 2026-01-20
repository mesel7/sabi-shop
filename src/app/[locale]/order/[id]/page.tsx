import OrderDetailPage from "@/features/order/detail";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;
  return (
    <main className="flex-1 pt-16">
      <OrderDetailPage id={id} />
    </main>
  );
}
