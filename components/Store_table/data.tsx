export type Payment = {
  id: string;
  store: string;
  dateFrom: string;
  dateTo: string;
  initial_amount: number;
  approved_amount: number;
  comments: "Approved" | string;
  status:
    | "pending"
    | "pending approval"
    | "approved"
    | "processing"
    | "under review"
    | "paid"
    | "sent"
    | "received";
  proofs: string;
  type:
    | "operations"
    | "maintenance"
    | "welfare"
    | "marketing"
    | "regulatory expenses";
  date: Date;
};

export const paymentsData: Payment[] = [
  {
    id: "728ed52f",
    store: "Shop Q",
    dateFrom: "2026-04-21",
    dateTo: "2026-04-21",
    initial_amount: 100,
    approved_amount: 90,
    comments: "Wrong Invoice For Rice",
    status: "pending",
    proofs: "proof1.png",
    type: "operations",
    date: new Date(2026, 3, 10),
  },
  {
    id: "489e1d42",
    store: "Shop B",
    dateFrom: "2026-04-20",
    dateTo: "2026-04-21",
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "processing",
    proofs: "proof2.png",
    type: "welfare",
    date: new Date(2026, 3, 10),
  },
  {
    id: "489e1d43",
    store: "Shop B",
    dateFrom: "2026-04-21",
    dateTo: "2026-04-21",
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "received",
    proofs: "proof2.png",
    type: "regulatory expenses",
    date: new Date(),
  },
  {
    id: "489e1d44",
    store: "Shop B",
    dateFrom: "2026-04-21",
    dateTo: "2026-04-21",
    initial_amount: 100,
    approved_amount: 100,
    comments: "Approved",
    status: "pending approval",
    proofs: "proof2.png",
    type: "marketing",
    date: new Date(),
  },
  {
    id: "489e1d45",
    store: "KFC 37 LIBERATION",
    dateFrom: "2026-04-21",
    dateTo: "2026-04-21",
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "approved",
    proofs: "proof2.png",
    type: "maintenance",
    date: new Date(),
  },
  {
    id: "489e1d46",
    store: "KFC BEKWAI",
    dateFrom: "2026-04-21",
    dateTo: "2026-04-21",
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "under review",
    proofs: "proof2.png",
    type: "operations",
    date: new Date(),
  },
  {
    id: "489e1d47",
    store: "KFC OSU",
    dateFrom: "2026-04-21",
    dateTo: "2026-04-21",
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "sent",
    proofs: "proof2.png",
    type: "operations",
    date: new Date(),
  },
  {
    id: "489e1d48",
    store: "Shop B",
    dateFrom: "2026-04-21",
    dateTo: "2026-04-21",
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "paid",
    proofs: "proof2.png",
    type: "operations",
    date: new Date(),
  },
];
