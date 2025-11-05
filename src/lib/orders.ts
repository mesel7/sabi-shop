import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

export type OrderItemInput = {
  productId: string;
  title_ko: string;
  title_ja: string;
  price: number;
  qty: number;
  imageUrl?: string;
};

export async function createOrder(input: {
  userId: string;
  items: OrderItemInput[];
  subtotal: number;
  shippingFee: number;
  total: number;
}) {
  const docRef = await addDoc(collection(db, "orders"), {
    ...input,
    status: "paid-mock",
    createdAt: serverTimestamp(),
  });

  return docRef.id; // 주문번호
}
