"use client";

import { Link } from "@/i18n/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "@/lib/auth/AuthProvider";
import LocaleSwitcher from "@/shared/ui/LocaleSwitcher.client";
import { useState } from "react";

import AuthModalHost from "./AuthModalHost.client";

type MenuItem = { id: string; path: string };

type Props = {
  mainMenu: MenuItem[];
  navLabels: Record<string, string>;
  headerLabels: {
    myOrders: string;
    logout: string;
    login: string;
  };
};

export default function HeaderActions({
  mainMenu,
  navLabels,
  headerLabels,
}: Props) {
  const count = useSelector((s: RootState) =>
    s.cart.items.reduce((n, i) => n + i.qty, 0),
  );

  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState<null | "login" | "signup">(null);

  const handleContactClick = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=cejhans1520@gmail.com",
      "_blank",
    );
  };

  return (
    <>
      <nav className="flex items-center gap-6 text-sm">
        {mainMenu.map((m) => (
          <Link
            key={m.id}
            href={`${m.path}`}
            className="font-outfit hover:opacity-50 transition-opacity duration-300 cursor-pointer"
          >
            {navLabels[m.id]}
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
          href="/cart"
          className="flex items-center gap-1 hover:opacity-50 transition-opacity duration-300 cursor-pointer"
        >
          {navLabels.cart}
          {count > 0 && (
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
              href="/account/orders"
              className="hover:opacity-50 transition-opacity duration-300 cursor-pointer whitespace-nowrap"
            >
              {headerLabels.myOrders}
            </Link>
            <button
              onClick={logout}
              className="hover:opacity-50 transition-opacity duration-300 cursor-pointer whitespace-nowrap"
              type="button"
            >
              {headerLabels.logout}
            </button>
          </>
        ) : (
          <button
            onClick={() => setShowAuth("login")}
            className="hover:opacity-50 transition-opacity duration-300 cursor-pointer whitespace-nowrap"
            type="button"
          >
            {headerLabels.login}
          </button>
        )}

        <div className="flex items-center gap-2">
          <LocaleSwitcher variant="desktop" />
        </div>
      </nav>

      <AuthModalHost showAuth={showAuth} onClose={() => setShowAuth(null)} />
    </>
  );
}
