import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import { mainMenu } from "@/site/menu.config";

import HeaderActions from "./HeaderActions.client";
import MobileMenu from "./MobileMenu.client";

type NavLabels = {
  [key: string]: string;
  cart: string;
};

type HeaderLabels = {
  myOrders: string;
  logout: string;
  login: string;
};

export default async function Header() {
  const tNav = await getTranslations("nav");
  const tHeader = await getTranslations("header");

  const navLabels: NavLabels = {
    cart: tNav("cart"),
    ...Object.fromEntries(mainMenu.map((m) => [m.id, tNav(m.id as any)])),
  } as NavLabels;

  const headerLabels: HeaderLabels = {
    myOrders: tHeader("myOrders"),
    logout: tHeader("logout"),
    login: tHeader("login"),
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[color:var(--color-background)]">
      <div className="px-4 h-16 flex items-center justify-between relative">
        {/* Logo (server) */}
        <Link
          href="/"
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

        {/* Desktop island */}
        <div className="hidden md:block ml-auto">
          <HeaderActions
            mainMenu={mainMenu.map((m) => ({ id: m.id, path: m.path }))}
            navLabels={navLabels}
            headerLabels={headerLabels}
          />
        </div>

        {/* Mobile island */}
        <div className="md:hidden ml-auto">
          <MobileMenu
            mainMenu={mainMenu.map((m) => ({ id: m.id, path: m.path }))}
            navLabels={navLabels}
            headerLabels={headerLabels}
          />
        </div>
      </div>
    </header>
  );
}
