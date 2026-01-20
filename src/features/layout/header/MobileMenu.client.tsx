"use client";

import { Link } from "@/i18n/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useAuth } from "@/lib/auth/AuthProvider";
import LocaleSwitcher from "@/shared/ui/LocaleSwitcher.client";
import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";

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

export default function MobileMenu({
  mainMenu,
  navLabels,
  headerLabels,
}: Props) {
  const count = useSelector((s: RootState) =>
    s.cart.items.reduce((n, i) => n + i.qty, 0),
  );

  const { user, logout } = useAuth();
  const [showAuth, setShowAuth] = useState<null | "login" | "signup">(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  const handleContactClick = () => {
    window.open(
      "https://mail.google.com/mail/?view=cm&fs=1&to=cejhans1520@gmail.com",
      "_blank",
    );
  };

  return (
    <>
      <button
        type="button"
        className="flex items-center justify-center hover:opacity-50 transition-opacity duration-300 cursor-pointer"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 bg-white">
          <div className="pt-4 pb-8 px-4 max-w-7xl mx-auto">
            <div className="flex flex-col divide-y divide-gray-200">
              {mainMenu.map((m) => (
                <Link
                  key={m.id}
                  href={`${m.path}`}
                  onClick={closeMobile}
                  className="font-outfit flex items-center justify-between py-4 text-base hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                >
                  <span>{navLabels[m.id]}</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              ))}

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

              <Link
                href="/cart"
                onClick={closeMobile}
                className="flex items-center justify-between py-4 text-base hover:opacity-50 transition-opacity duration-300 cursor-pointer"
              >
                <span>{navLabels.cart}</span>
                <span className="flex items-center gap-2">
                  {count > 0 && (
                    <span className="text-[0.625rem] bg-[color:var(--color-foreground)] text-white w-4 h-4 flex items-center justify-center rounded-full font-outfit">
                      {count}
                    </span>
                  )}
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>

              {user ? (
                <>
                  <Link
                    href="/account/orders"
                    onClick={closeMobile}
                    className="flex items-center justify-between py-4 text-base hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                  >
                    <span>{headerLabels.myOrders}</span>
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      closeMobile();
                    }}
                    className="flex items-center justify-between py-4 text-base text-left hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                  >
                    <span>{headerLabels.logout}</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setShowAuth("login");
                    closeMobile();
                  }}
                  className="flex items-center justify-between py-4 text-base text-left hover:opacity-50 transition-opacity duration-300 cursor-pointer"
                >
                  <span>{headerLabels.login}</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              )}

              <div className="flex items-center gap-2 py-4">
                <LocaleSwitcher variant="mobile" />
              </div>
            </div>
          </div>
        </div>
      )}

      <AuthModalHost showAuth={showAuth} onClose={() => setShowAuth(null)} />
    </>
  );
}
