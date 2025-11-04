export type Product = {
  id: string;
  title_ko: string;
  title_ja: string;
  description_ko?: string;
  description_ja?: string;
  price: number;
  category:
    | "beans"
    | "drip"
    | "goods"
    | "tumbler"
    | "capsule"
    | "seasonal"
    | "gift";
  imageUrl: string;
  isActive: boolean;
  createdAt: number; // epoch
};
