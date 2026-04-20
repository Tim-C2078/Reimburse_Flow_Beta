"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FilePenLine,
  Trash,
  BanknoteArrowUp,
  LoaderPinwheel,
  TruckElectric,
  CheckCheck,
} from "lucide-react";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

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
  type:
    | "operations"
    | "maintenance"
    | "welfare"
    | "marketing"
    | "regulatory expense";
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
    accessorKey: "range_start",
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
      const date = row.getValue("range_start") as Date;
      return new Date(date).toLocaleDateString();
    },
  },
  {
    accessorKey: "range_end",
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
      const date = row.getValue("range_end") as Date;
      return new Date(date).toLocaleDateString();
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
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      const label = status.toUpperCase();

      const color =
        status === "paid"
          ? "bg-green-500 text-white"
          : status === "pending"
            ? "bg-yellow-500 text-white"
            : status === "under review"
              ? "bg-red-500 text-white"
              : status === "received"
                ? "bg-orange-500 text-white"
                : status === "processing"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-500 text-white";

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
    cell: ({ row }) => {
      const user = row.original;

      return (
        <div className="flex gap-2">
          <Button
            onClick={() => console.log("Edit", user.id)}
            className="cursor-pointer"
          >
            <FilePenLine />
          </Button>
          <Button
            onClick={() => console.log("Delete", user.id)}
            className="cursor-pointer"
          >
            <Trash />
          </Button>
          <Button
            onClick={() => console.log("Paid", user.id)}
            className="cursor-pointer bg-green-500"
          >
            <BanknoteArrowUp />
          </Button>
          <Button
            onClick={() => console.log("Processing", user.id)}
            className="cursor-pointer bg-blue-500"
          >
            <LoaderPinwheel />
          </Button>
          <Button
            onClick={() => console.log("Sent", user.id)}
            className="cursor-pointer bg-gray-500"
          >
            <TruckElectric />
          </Button>
          <Button
            onClick={() => console.log("Received", user.id)}
            className="cursor-pointer bg-red-500"
          >
            <CheckCheck />
          </Button>
        </div>
      );
    },
  },
];
