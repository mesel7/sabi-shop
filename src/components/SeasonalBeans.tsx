"use client";

import ProductCard from "@/components/ProductCard";
import { PRODUCTS } from "@/site/products.mock";

// 홈 화면에서 대표 원두 4개를 보여줌
export default function SeasonalBeans() {
  const beans = PRODUCTS.filter((p) => p.category === "beans" && p.isActive)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);
  return (
    <>
      {beans.map((p) => (
        <ProductCard key={p.id} p={p} />
      ))}
    </>
  );
}
