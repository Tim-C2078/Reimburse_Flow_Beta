export type Payment = {
  id: string;
  store: string;
  range_start: Date;
  range_end: Date;
  initial_amount: number;
  approved_amount: number;
  comments: "Approved" | string;
  status:
    | "pending"
    | "processing"
    | "under review"
    | "paid"
    | "sent"
    | "received";
  proofs: string;
  date: Date;
};

export const paymentsData: Payment[] = [
  {
    id: "728ed52f",
    store: "Shop A",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 100,
    approved_amount: 90,
    comments: "Wrong Invoice For Rice",
    status: "pending",
    proofs: "proof1.png",
    date: new Date("2026-04-10"),
  },
  {
    id: "489e1d42",
    store: "Shop B",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "processing",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "Shop B",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "received",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "Shop B",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "processing",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "Shop B",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "processing",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "KFC 37 LIBERATION",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "processing",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "KFC BEKWAI",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "under review",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "KFC OSU",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "sent",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "Shop B",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "paid",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "Shop B",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "paid",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "Shop B",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "paid",
    proofs: "proof2.png",
    date: new Date(),
  },
  {
    id: "489e1d42",
    store: "Shop B",
    range_start: new Date("2026-04-10"),
    range_end: new Date("2026-04-28"),
    initial_amount: 125,
    approved_amount: 125,
    comments: "Approved",
    status: "paid",
    proofs: "proof2.png",
    date: new Date(),
  },
];
