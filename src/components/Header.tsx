"use client";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { mainMenu } from "@/site/menu.config";
import LocaleSwitcher from "./LocaleSwitcher";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

export default function Header() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const count = useSelector((s: RootState) =>
    s.cart.items.reduce((n, i) => n + i.qty, 0)
  );

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-bold">
          Sabi Shop
        </Link>
        <nav className="flex items-center gap-6">
          {mainMenu.map((m) => (
            <Link key={m.id} href={`/${locale}${m.path}`} className="text-sm">
              {t(m.id as any)}
            </Link>
          ))}
          <Link href={`/${locale}/cart`} className="text-sm">
            {t("cart")}{" "}
            {count > 0 && (
              <span className="ml-1 text-xs rounded bg-black text-white px-1.5">
                {count}
              </span>
            )}
          </Link>
          <LocaleSwitcher />
        </nav>
      </div>
    </header>
  );
}
