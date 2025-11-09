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
            width={512}
            height={512}
            className="w-full h-full object-contain group-hover:opacity-75 transition-opacity duration-300"
          />
        ) : null}
      </div>
      <div className="px-2 py-4 flex flex-col">
        <p className="text-sm mt-1 font-outfit">{s.date}</p>
        <h3 className="text-sm">{title}</h3>
      </div>
    </div>
  );
}
