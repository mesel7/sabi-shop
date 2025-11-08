"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { formatCurrency } from "@/lib/format";
import type { Product } from "@/types";

export default function ProductCard({ p }: { p: Product }) {
  const locale = useLocale() as "ko" | "ja";
  const title = locale === "ja" ? p.title_ja : p.title_ko;

  return (
    <Link
      href={`/${locale}/products/${p.id}`}
      className="block group overflow-hidden"
    >
      <div className="aspect-square bg-gray-100 relative">
        {/* 이미지 비었을 때를 대비한 fill */}
        <Image
          src={p.imageUrl}
          alt={title}
          width={512}
          height={512}
          className="w-full h-full object-contain group-hover:opacity-75 transition-opacity duration-300"
        />
      </div>
      <div className="p-4 flex flex-col items-center text-center">
        <h3 className="text-sm">{title}</h3>
        <p className="text-sm mt-1 font-outfit">{formatCurrency(p.price)}</p>
      </div>
    </Link>
  );
}
