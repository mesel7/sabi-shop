import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title_ko: string;
  title_ja: string;
  price: number;
  qty: number;
  imageUrl?: string;
};

export interface CartState {
  items: CartItem[];
  subtotal: number;
}

const STORAGE_KEY = "sabi_cart";

// localStorage에서 장바구니 불러오기
export const loadCartFromStorage = (): CartState => {
  if (typeof window === "undefined") {
    return { items: [], subtotal: 0 };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { items: [], subtotal: 0 };
    const parsed = JSON.parse(raw) as CartState;
    // 혹시 subtotal이 없거나 오류난 경우 보정
    const subtotal = parsed.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    return { items: parsed.items, subtotal };
  } catch (err) {
    console.warn("Failed to load cart:", err);
    return { items: [], subtotal: 0 };
  }
};

const initialState: CartState = { items: [], subtotal: 0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((i) => i.id === action.payload.id);
      if (existing) {
        existing.qty += action.payload.qty;
      } else {
        state.items.push(action.payload);
      }
      state.subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      state.subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    },
    updateQty: (state, action: PayloadAction<{ id: string; qty: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.qty = action.payload.qty;
      state.subtotal = state.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
    },
  },
});

export const { addItem, removeItem, updateQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
