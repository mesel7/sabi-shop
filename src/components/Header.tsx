"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { mainMenu } from "@/site/menu.config";
import LocaleSwitcher from "./LocaleSwitcher";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "./AuthProvider";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { useIsClient } from "@/hooks/useIsClient";

export default function Header() {
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");

  const locale = useLocale();
  const count = useSelector((s: RootState) =>
    s.cart.items.reduce((n, i) => n + i.qty, 0)
  );

  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState<null | "login" | "signup">(null);
  const isClient = useIsClient();

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-bold">
          Sabi Shop
        </Link>
        <nav className="flex items-center gap-6">
          {mainMenu.map((m) => (
            <Link key={m.id} href={`/${locale}${m.path}`} className="text-sm">
              {tNav(m.id as any)}
            </Link>
          ))}

          {/* 장바구니 */}
          <Link href={`/${locale}/cart`} className="text-sm flex items-center">
            {tNav("cart")}
            {isClient && count > 0 && (
              <span className="ml-1 text-xs rounded bg-black text-white px-1.5">
                {count}
              </span>
            )}
          </Link>

          {/* 로그인 / 내 주문 / 로그아웃 */}
          {user ? (
            <>
              <Link href={`/${locale}/account/orders`} className="text-sm">
                {tHeader("myOrders")}
              </Link>
              <button
                onClick={logout}
                className="text-sm text-gray-500 whitespace-nowrap"
              >
                {tHeader("logout")}
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuth("login")}
              className="text-sm text-gray-500"
            >
              {tHeader("login")}
            </button>
          )}

          <LocaleSwitcher />
        </nav>
      </div>

      {showAuth && (
        <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} />
      )}
    </header>
  );
}
