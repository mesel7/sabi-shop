"use client";

import { configureStore } from "@reduxjs/toolkit";
import cartReducer, { loadCartFromStorage } from "./cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: loadCartFromStorage(),
  },
});

// 상태 변경 시 localStorage에 자동 저장
store.subscribe(() => {
  if (typeof window === "undefined") return;
  const state = store.getState();
  localStorage.setItem("sabi_cart", JSON.stringify(state.cart));
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
