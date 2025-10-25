import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CartItem = {
  id: string;
  title: string;
  price: number;
  qty: number;
  imageUrl?: string;
};
type State = { items: CartItem[]; subtotal: number };

const initial: State = { items: [], subtotal: 0 };
const calc = (items: CartItem[]) =>
  items.reduce((s, i) => s + i.price * i.qty, 0);

const slice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    addItem(state, { payload }: PayloadAction<CartItem>) {
      const it = state.items.find((i) => i.id === payload.id);
      if (it) it.qty += payload.qty;
      else state.items.push(payload);
      state.subtotal = calc(state.items);
    },
    updateQty(state, { payload }: PayloadAction<{ id: string; qty: number }>) {
      const it = state.items.find((i) => i.id === payload.id);
      if (it) it.qty = payload.qty;
      state.subtotal = calc(state.items);
    },
    removeItem(state, { payload }: PayloadAction<string>) {
      state.items = state.items.filter((i) => i.id !== payload);
      state.subtotal = calc(state.items);
    },
    clear(state) {
      state.items = [];
      state.subtotal = 0;
    },
  },
});

export const { addItem, updateQty, removeItem, clear } = slice.actions;
export default slice.reducer;
