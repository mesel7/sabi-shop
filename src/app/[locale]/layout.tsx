import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import AppProviders from "@/shared/providers/AppProviders";
import Header from "@/features/layout/header";
import Footer from "@/features/layout/footer";

import { Noto_Sans_JP, Noto_Sans_KR, Outfit } from "next/font/google";
import type { Metadata, Viewport } from "next";
import { setRequestLocale } from "next-intl/server";

const locales = ["ko", "ja"] as const;

const notoJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-jp",
});

const notoKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  variable: "--font-noto-kr",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

// 공통 메타데이터 (언어 상관 없이 공용)
export const metadata: Metadata = {
  title: "SABI SHOP",
  description: "SABI SHOP - WABI SABI Minimal Coffee Shop",
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
  openGraph: {
    title: "SABI SHOP",
    description: "SABI SHOP - WABI SABI Minimal Coffee Shop",
    siteName: "SABI SHOP",
    images: [
      {
        url: "/logo512.png",
        width: 512,
        height: 512,
        alt: "SABI SHOP",
      },
    ],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

type Props = {
  children: React.ReactNode;
  // Next 15 스타일: params는 Promise
  params: Promise<{ locale: (typeof locales)[number] }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  // 반드시 await
  const { locale } = await params;

  if (!locales.includes(locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`../../../messages/${locale}.json`))
    .default as Record<string, any>;

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${notoJP.variable} ${notoKR.variable} ${outfit.variable}`}
    >
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AppProviders>
            <div className="min-h-dvh flex flex-col">
              <Header />
              {children}
              <Footer />
            </div>
          </AppProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
