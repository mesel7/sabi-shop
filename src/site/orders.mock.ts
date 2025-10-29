export type MockOrder = {
  id: string;
  createdAt: string; // ISO 포맷
  total: number;
  status: "paid-mock";
  items: { title: string; qty: number }[];
};

export const MOCK_ORDERS: MockOrder[] = [
  {
    id: "ORD-20241001",
    createdAt: "2025-10-28T20:25:00+09:00",
    total: 42500,
    status: "paid-mock",
    items: [
      { title: "시그니처 원두", qty: 1 },
      { title: "글라스 컵", qty: 1 },
    ],
  },
  {
    id: "ORD-20241002",
    createdAt: "2025-10-27T10:12:00+09:00",
    total: 18000,
    status: "paid-mock",
    items: [{ title: "오리지널 원두", qty: 1 }],
  },
];
