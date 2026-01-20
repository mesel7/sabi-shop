"use client";
import { Provider } from "react-redux";
import { store } from "@/store";
import { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth/AuthProvider";

export default function AppProviders({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
