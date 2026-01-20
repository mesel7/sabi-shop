import { formatCurrency } from "@/lib/format";

type Props = {
  subtotal: number;
  shippingFee: number;
  tCheckout: (key: string) => string; // next-intl의 t 함수 타입을 단순화
};

export default function OrderSummary({
  subtotal,
  shippingFee,
  tCheckout,
}: Props) {
  return (
    <div className="py-4 md:px-4 space-y-2">
      <h2 className="font-semibold mb-2">{tCheckout("summary")}</h2>

      <div className="flex justify-between text-sm">
        <span>{tCheckout("products")}</span>
        <span className="font-outfit">{formatCurrency(subtotal)}</span>
      </div>

      <div className="flex justify-between text-sm">
        <span>{tCheckout("delivery")}</span>
        <span className="font-outfit">{formatCurrency(shippingFee)}</span>
      </div>

      <hr className="text-gray-200" />

      <div className="flex justify-between font-semibold">
        <span>{tCheckout("total")}</span>
        <span className="font-outfit">
          {formatCurrency(subtotal + shippingFee)}
        </span>
      </div>
    </div>
  );
}
