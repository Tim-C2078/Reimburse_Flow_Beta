"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FilePlus } from "lucide-react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  stores: string | null;
  selectedDate?: Date | null;
  setSelectedDate?: React.Dispatch<React.SetStateAction<Date | null>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  stores,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [filterMode, setFilterMode] = React.useState<
    "today" | "all" | "hidePaid"
  >("today");

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      hidePaid: (row, columnId) => {
        const status = row.getValue(columnId);
        return status !== "paid";
      },
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,

    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    globalFilterFn: "includesString",

    state: {
      sorting,
      columnFilters,
      rowSelection,
      globalFilter,
    },
  });

  React.useEffect(() => {
    if (filterMode === "today") {
      table.getColumn("date")?.setFilterValue(new Date());
    }

    if (filterMode === "all") {
      table.getColumn("date")?.setFilterValue(undefined);
      table.getColumn("status")?.setFilterValue(undefined);
    }

    if (filterMode === "hidePaid") {
      table.getColumn("status")?.setFilterValue("hidePaid");
    }
  }, [filterMode]);

  return (
    <>
      {/* FILTERS */}
      <div className="flex items-center gap-4 py-4">
        <Input
          placeholder="Filter entire table..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          className="max-w-sm shadow-md"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-black text-white hover:bg-white hover:text-black cursor-pointer"
              variant="outline"
            >
              Filter
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuCheckboxItem
              checked={filterMode === "today"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("today");
                  table.getColumn("date")?.setFilterValue(new Date());
                }
              }}
            >
              Today
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={filterMode === "all"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("all");
                  table.getColumn("date")?.setFilterValue(undefined);
                }
              }}
            >
              Show All
            </DropdownMenuCheckboxItem>
            {/* HIDE PAID */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "hidePaid"}
              onCheckedChange={(checked) => {
                if (checked) setFilterMode("hidePaid");
              }}
            >
              Unpaid
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          title="create new petty cash"
          onClick={() =>
            router.push(`/dashboard/shops/create-new?store=${stores}`)
          }
        >
          <FilePlus />
        </Button>
      </div>

      {/* TABLE */}
      <div className="rounded-md border">
        <Table className="border-separate border-spacing-y-2">
          <TableHeader className="bg-muted">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-center">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="bg-white shadow-sm cursor-pointer"
                  onClick={() => row.toggleSelected()}
                  onDoubleClick={() => {
                    const payment = row.original as any;

                    const url = new URLSearchParams({
                      id: payment.id,
                      store: payment.store,
                      dateFrom: payment.dateFrom,
                      dateTo: payment.dateTo,
                      initialAmount: String(payment.initial_amount),
                      approvedAmount: String(payment.approved_amount),
                      comments: payment.comments,
                      status: payment.status,
                      type: payment.type,
                      date: payment.date.toISOString(),
                    });

                    router.push(
                      `/dashboard/shops/edit-pettyCash?${url.toString()}`,
                    );
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="text-center py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-10"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* PAGINATION */}
        <div className="flex justify-center gap-2 py-4">
          <Button
            variant="outline"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
