import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Providers from "@/components/Providers";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: "ko" | "ja" }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!["ko", "ja"].includes(locale)) notFound();

  const messages = (await import(`../../../messages/${locale}.json`))
    .default as Record<string, any>;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <div className="min-h-dvh flex flex-col">
          <Header />
          {/* 헤더가 fixed이니까 그 높이(64px)만큼 여백 확보 */}
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
