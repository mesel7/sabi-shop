import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

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
          <main className="flex-1">{children}</main>
          <footer className="border-t text-sm text-gray-500 py-8">
            <div className="max-w-7xl mx-auto px-4">© Sabi Shop</div>
          </footer>
        </div>
      </Providers>
    </NextIntlClientProvider>
  );
}
