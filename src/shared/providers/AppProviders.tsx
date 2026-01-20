"use client";

import { ReactNode } from "react";

import { NextIntlClientProvider } from "next-intl";
import { Provider } from "react-redux";
import { AuthProvider } from "@/lib/auth/AuthProvider";
import { store } from "@/store";

type Props = {
  children: ReactNode;
  locale: string;
  messages: Record<string, any>;
};

export default function AppProviders({ children, locale, messages }: Props) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Provider store={store}>
        <AuthProvider>{children}</AuthProvider>
      </Provider>
    </NextIntlClientProvider>
  );
}
