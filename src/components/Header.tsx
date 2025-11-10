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
import { Menu, X, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const tNav = useTranslations("nav");
  const tHeader = useTranslations("header");
  const locale = useLocale();

  const count = useSelector((s: RootState) =>
    s.cart.items.reduce((n, i) => n + i.qty, 0)
  );

  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState<null | "login" | "signup">(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isClient = useIsClient();

  const handleContactClick = () => {
    if (typeof window === "undefined") return;
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=cejhans1520@gmail.com",
      "_blank"
    );
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* 상단 헤더 */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[color:var(--color-background)]">
        <div className="px-4 h-16 flex items-center justify-between relative">
          <Link
            href={`/${locale}`}
            onClick={closeMobile}
            className="
              absolute left-1/2 -translate-x-1/2
              md:static md:translate-x-0
              flex items-center justify-center
            "
          >
            <Image
              src="/logo192.png"
              alt="SABI SHOP"
              width={32}
              height={32}
              className="w-8 h-8"
              priority
            />
          </Link>

          {/* 데스크탑 메뉴 */}
          <nav className="hidden md:flex items-center gap-6 ml-auto text-sm">
            {mainMenu.map((m) => (
              <Link
                key={m.id}
                href={`/${locale}${m.path}`}
                className="font-outfit hover:opacity-50 transition-opacity duration-300 cursor-pointer"
              >
                {tNav(m.id as any)}
              </Link>
            ))}

            <button
              type="button"
              onClick={handleContactClick}
              className="font-outfit hover:opacity-50 transition-opacity duration-300 cursor-pointer"
            >
              CONTACT
            </button>

            <Link
              href={`/${locale}/cart`}
              className="flex items-center gap-1 hover:opacity-50 transition-opacity duration-300 cursor-pointer"
            >
              {tNav("cart")}
              {isClient && count > 0 && (
                <span
                  className="
                    text-[0.625rem]
                    bg-[color:var(--color-foreground)] text-white
                    w-4 h-4 flex items-center justify-center
                    rounded-full font-outfit
                  "
                >
                  {count}
                </span>
              )}
            </Link>

            {user ? (
              <>
                <Link
                  href={`/${locale}/account/orders`}
                  className="hover:opacity-50 transition-opacity duration-300 cursor-pointer whitespace-nowrap"
                >
                  {tHeader("myOrders")}
                </Link>
                <button
                  onClick={logout}
                  className="hover:opacity-50 transition-opacity duration-300 cursor-pointer whitespace-nowrap"
                >
                  {tHeader("logout")}
                </button>
              </>
            ) : (
              <button
                onClick={() => setShowAuth("login")}
                className="hover:opacity-50 transition-opacity duration-300 cursor-pointer whitespace-nowrap"
              >
                {tHeader("login")}
              </button>
            )}

            <div className="flex items-center gap-2">
              <LocaleSwitcher variant="desktop" />
            </div>
          </nav>

          {/* 모바일 햄버거 / X 버튼 */}
          <button
            type="button"
            className="md:hidden ml-auto flex items-center justify-center hover:opacity-50 transition-opacity duration-300 cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
          >
            {mobileOpen ? (
              <X className="w-6 h-6 md:w-8 md:h-8" />
            ) : (
              <Menu className="w-6 h-6 md:w-8 md:h-8" />
            )}
          </button>
        </div>
      </header>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-white">
          <div className="pt-4 pb-8 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col divide-y divide-gray-200">
              {/* SHOP */}
              {mainMenu.map((m) => (
                <Link
                  key={m.id}
                  href={`/${locale}${m.path}`}
                  onClick={closeMobile}
                  className="font-outfit flex items-center justify-between py-4 text-base hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                >
                  <span>{tNav(m.id as any)}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ))}

              {/* CONTACT */}
              <button
                type="button"
                onClick={() => {
                  handleContactClick();
                  closeMobile();
                }}
                className="font-outfit flex items-center justify-between py-4 text-base text-left hover:opacity-50 transition-opacity duration-300 cursor-pointer"
              >
                <span>CONTACT</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              {/* CART */}
              <Link
                href={`/${locale}/cart`}
                onClick={closeMobile}
                className="flex items-center justify-between py-4 text-base hover:opacity-50 transition-opacity duration-300 cursor-pointer"
              >
                <span>{tNav("cart")}</span>
                <span className="flex items-center gap-2">
                  {isClient && count > 0 && (
                    <span className="text-[0.625rem] bg-[color:var(--color-foreground)] text-white w-4 h-4 flex items-center justify-center rounded-full font-outfit">
                      {count}
                    </span>
                  )}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>

              {/* 로그인 / 주문 / 로그아웃 */}
              {user ? (
                <>
                  <Link
                    href={`/${locale}/account/orders`}
                    onClick={closeMobile}
                    className="flex items-center justify-between py-4 text-base hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                  >
                    <span>{tHeader("myOrders")}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      closeMobile();
                    }}
                    className="flex items-center justify-between py-4 text-base text-left hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                  >
                    <span>{tHeader("logout")}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowAuth("login");
                    closeMobile();
                  }}
                  className="flex items-center justify-between py-4 text-base text-left hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                >
                  <span>{tHeader("login")}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              {/* 언어 */}
              <div className="flex items-center gap-2 py-4">
                <LocaleSwitcher variant="mobile" />
              </div>
            </div>
          </div>
        </div>
      )}

      {showAuth && (
        <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} />
      )}
    </>
  );
}
