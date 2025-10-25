import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import Providers from "@/components/Providers";
import Header from "@/components/Header";

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;
  if (!["ko", "ja"].includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
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
      </body>
    </html>
  );
}
