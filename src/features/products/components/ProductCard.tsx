import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getLocale } from "next-intl/server";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types";

type Props = { p: Product };

export default async function ProductCard({ p }: Props) {
  const locale = (await getLocale()) as "ko" | "ja";
  const title = locale === "ja" ? p.title_ja : p.title_ko;

  return (
    <Link href={`/products/${p.id}`} className="block group overflow-hidden">
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={p.imageUrl}
          alt={title}
          width={512}
          height={512}
          className="h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-75"
        />
      </div>

      <div className="flex flex-col items-center px-2 py-4 text-center">
        <h3 className="text-sm">{title}</h3>
        <p className="mt-1 text-sm font-outfit">{formatCurrency(p.price)}</p>
      </div>
    </Link>
  );
}
