"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ActionsCell } from "@/components/actionStore";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "store",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Store
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "dateFrom",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Range Start
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("dateFrom") as string;
      return date;
    },
  },
  {
    accessorKey: "dateTo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Range End
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue("dateTo") as string;
      return date;
    },
  },
  {
    accessorKey: "initial_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Initial Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("initial_amount") as number;
      return `₵${amount}`;
    },
  },
  {
    accessorKey: "approved_amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Approved Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.getValue("approved_amount") as number;
      return `₵${amount}`;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    filterFn: (row, columnId, filterValue) => {
      const status = row.getValue(columnId) as string;

      // 🔥 THIS IS THE KEY FIX
      if (filterValue === "hidePaid") {
        return status !== "paid";
      }

      if (!filterValue || filterValue === "all") {
        return true;
      }

      return status === filterValue;
    },

    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const label = status.toUpperCase();

      const color =
        status === "paid"
          ? "bg-green-400 text-white"
          : status === "pending approval"
            ? "bg-pink-400 text-white"
            : status === "approved"
              ? "bg-purple-400 text-white"
              : status === "pending"
                ? "bg-yellow-400 text-white"
                : status === "under review"
                  ? "bg-red-400 text-white"
                  : status === "received"
                    ? "bg-orange-400 text-white"
                    : status === "processing"
                      ? "bg-blue-400 text-white"
                      : "bg-gray-400 text-white";

      return <Badge className={color}>{label}</Badge>;
    },
  },
  {
    accessorKey: "comments",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Comments
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Types
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "proofs",
    header: "Proof",
    cell: ({ row }) => {
      const proof = row.getValue("proofs") as string;
      return (
        <a href={proof} target="_blank" className="text-blue-500 underline">
          View
        </a>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    filterFn: (row, columnId, filterValue) => {
      if (!filterValue) return true;

      const rowDate = new Date(row.getValue(columnId));
      const selectedDate = new Date(filterValue);

      return (
        rowDate.getFullYear() === selectedDate.getFullYear() &&
        rowDate.getMonth() === selectedDate.getMonth() &&
        rowDate.getDate() === selectedDate.getDate()
      );
    },

    cell: ({ row }) => {
      const date = row.getValue("date") as Date;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <ActionsCell payment={row.original} />,
  },
];
