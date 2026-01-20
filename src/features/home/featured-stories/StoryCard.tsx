import Image from "next/image";
import type { Story } from "@/types";

type Props = {
  s: Story;
  locale: "ko" | "ja";
};

export default function StoryCard({ s, locale }: Props) {
  const title = locale === "ja" ? s.title_ja : s.title_ko;

  return (
    <article className="group overflow-hidden">
      <div className="relative aspect-square bg-gray-100">
        {s.imageUrl ? (
          <Image
            src={s.imageUrl}
            alt={title}
            width={512}
            height={512}
            className="h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-75"
          />
        ) : null}
      </div>

      <div className="flex flex-col px-2 py-4">
        <p className="mt-1 text-sm font-outfit">{s.date}</p>
        <h3 className="text-sm">{title}</h3>
      </div>
    </article>
  );
}
