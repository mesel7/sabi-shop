import { ButtonLink } from "@/shared/ui/button/ButtonLink";

export default function ProductDetailNotFound() {
  return (
    <section
      className="mx-auto max-w-4xl px-4 py-10"
      aria-label="Product not found"
    >
      <div className="border border-gray-200 bg-white p-6 md:p-8">
        <h1 className="text-2xl font-bold">
          상품을 찾을 수 없어요
          <span className="ml-2 text-base font-normal text-gray-500">
            / 商品が見つかりません
          </span>
        </h1>

        <p className="mt-3 text-sm text-gray-600 leading-6">
          삭제되었거나 판매가 종료된 상품일 수 있습니다.
          <br />
          削除された、または販売終了の商品である可能性があります。
        </p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <ButtonLink href="/products">상품 목록으로 / 商品一覧へ</ButtonLink>
          <ButtonLink href="/">홈으로 / ホームへ</ButtonLink>
        </div>
      </div>
    </section>
  );
}
