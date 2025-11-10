"use client";

import { useState } from "react";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Globe } from "lucide-react";

type Props = {
  variant?: "desktop" | "mobile";
};

export default function LocaleSwitcher({ variant = "desktop" }: Props) {
  const locale = useLocale();
  const pathname = usePathname() ?? "/";
  const other = locale === "ko" ? "ja" : "ko";

  const cleaned = pathname.replace(/^\/(ko|ja)(?=\/|$)/, "") || "/";
  const target = `/${other}${cleaned}`;

  const [open, setOpen] = useState(false);
  const isDesktop = variant === "desktop";

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <div className={isDesktop ? "relative inline-flex" : "relative w-full"}>
      {/* 트리거 버튼 */}
      <button
        type="button"
        onClick={toggle}
        className={
          (isDesktop ? "px-0 " : "w-full justify-start px-0 ") +
          "flex items-center gap-2 font-outfit md:text-sm " +
          "hover:opacity-50 transition-opacity duration-300 cursor-pointer"
        }
      >
        <Globe className="w-4 h-4" />
        <span>LANGUAGE</span>
      </button>

      {/* 바깥 클릭용 오버레이 (document 이벤트 대신) */}
      {/* 헤더 밖 영역 클릭 시 닫힘 */}
      <div
        aria-hidden="true"
        onClick={close}
        className={
          open
            ? "fixed inset-0 z-40 block"
            : "fixed inset-0 z-40 pointer-events-none hidden"
        }
      />

      {/* 드롭다운: 항상 렌더해두고, 클래스로만 show/hide + 애니메이션 */}
      <div
        className={
          "absolute left-0 top-full mt-2 w-full " +
          "border border-gray-200 bg-[color:var(--color-background)] shadow-md overflow-hidden z-50 " +
          // 애니메이션
          "transition-all duration-300 origin-top " +
          (open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-1 pointer-events-none")
        }
      >
        {/* 현재 언어 */}
        <div className="px-4 py-2 text-sm font-semibold bg-gray-100">
          {locale === "ko" ? "한국어" : "日本語"}
        </div>

        {/* 전환 언어 */}
        <Link
          href={target}
          onClick={close}
          className="block px-4 py-2 text-sm hover:bg-gray-100"
        >
          {other === "ko" ? "한국어" : "日本語"}
        </Link>
      </div>
    </div>
  );
}
