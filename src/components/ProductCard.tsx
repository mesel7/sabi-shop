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
      className="block group rounded-md overflow-hidden border hover:shadow-sm transition"
    >
      <div className="aspect-square bg-gray-100 relative">
        {/* 이미지 비었을 때를 대비한 fill */}
        <Image
          src={p.imageUrl}
          alt={title}
          fill
          className="object-contain p-6 group-hover:scale-[1.02] transition"
        />
      </div>
      <div className="p-4">
        <h3 className="text-sm text-gray-800">{title}</h3>
        <p className="mt-1 text-gray-500">{formatCurrency(locale, p.price)}</p>
      </div>
    </Link>
  );
}
