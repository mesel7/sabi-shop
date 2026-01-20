import OrderSuccessPage from "@/features/order/success";

type Props = {
  // [id] 같은 동적 세그먼트 폴더가 없음
  searchParams: Promise<{ id?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const sp = await searchParams;

  return (
    <main className="flex-1 pt-16">
      <OrderSuccessPage id={sp.id} />
    </main>
  );
}
