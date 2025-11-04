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

  // contact 눌렀을 때 메일 열기
  const handleContactClick = () => {
    if (typeof window === "undefined") return;
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=cejhans1520@gmail.com",
      "_blank"
    );
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href={`/${locale}`} className="font-bold font-outfit">
          SABI SHOP
        </Link>

        <nav className="flex items-center gap-6">
          {/* 기존 메뉴 */}
          {mainMenu.map((m) => (
            <Link
              key={m.id}
              href={`/${locale}${m.path}`}
              className="text-sm font-outfit hover:opacity-50 transition-opacity duration-300"
            >
              {tNav(m.id as any)}
            </Link>
          ))}

          {/* contact */}
          <button
            type="button"
            onClick={handleContactClick}
            className="text-sm font-outfit hover:opacity-50 transition-opacity duration-300 cursor-pointer"
          >
            CONTACT
          </button>

          {/* 장바구니 */}
          <Link
            href={`/${locale}/cart`}
            className="text-sm flex items-center group hover:opacity-50 transition-opacity duration-300"
          >
            {tNav("cart")}
            {isClient && count > 0 && (
              <span
                className="
                  ml-1 text-[0.625rem]
                  bg-[color:var(--color-foreground)] text-white
                  w-4 h-4
                  flex items-center justify-center
                  rounded-full
                  font-outfit
                "
              >
                {count}
              </span>
            )}
          </Link>

          {/* 로그인 / 내 주문 / 로그아웃 */}
          {user ? (
            <>
              <Link
                href={`/${locale}/account/orders`}
                className="text-sm hover:opacity-50 transition-opacity duration-300"
              >
                {tHeader("myOrders")}
              </Link>
              <button
                onClick={logout}
                className="text-sm whitespace-nowrap cursor-pointer hover:opacity-50 transition-opacity duration-300"
              >
                {tHeader("logout")}
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowAuth("login")}
              className="text-sm hover:opacity-50 transition-opacity duration-300 cursor-pointer"
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
