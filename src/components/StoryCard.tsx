"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Story } from "@/types";

export default function StoryCard({ s }: { s: Story }) {
  const locale = useLocale() as "ko" | "ja";
  const t = useTranslations("home");
  const title = locale === "ja" ? s.title_ja : s.title_ko;

  return (
    <div className="block group overflow-hidden">
      <div className="aspect-square bg-gray-100 relative">
        {s.imageUrl ? (
          <Image
            src={s.imageUrl}
            alt={title}
            fill
            className="object-contain p-6 group-hover:opacity-50 transition-opacity duration-300"
          />
        ) : null}
      </div>
      <div className="p-4 flex flex-col">
        <p className="text-sm mt-1 font-outfit">{s.date}</p>
        <h3 className="text-sm">{title}</h3>
      </div>
    </div>
  );
}
