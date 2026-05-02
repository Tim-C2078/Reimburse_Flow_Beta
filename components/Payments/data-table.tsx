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
  selectedDate?: Date | null;
  setSelectedDate?: React.Dispatch<React.SetStateAction<Date | null>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  selectedDate,
  setSelectedDate,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  // ✅ FIX: default is TODAY active
  const [filterMode, setFilterMode] = React.useState<
    "today" | "all" | "clear" | "hidePaid"
  >("today");

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      hidePaid: (row, columnId) => {
        const status = row.getValue(columnId) as string;
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

  // ✅ FIX: apply external selected date (from dashboard)
  React.useEffect(() => {
    if (filterMode === "today") {
      table.getColumn("date")?.setFilterValue(new Date());
      table.getColumn("status")?.setFilterValue(undefined);
    }

    if (filterMode === "all") {
      table.getColumn("date")?.setFilterValue(undefined);
      table.getColumn("status")?.setFilterValue(undefined);
    }

    if (filterMode === "hidePaid") {
      table.getColumn("status")?.setFilterValue("hidePaid");
    }

    if (filterMode === "clear") {
      table.getColumn("date")?.setFilterValue(undefined);
      table.getColumn("status")?.setFilterValue(undefined);
      setSelectedDate?.(null);
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
              className="buttonEffects bg-black text-white hover:text-black hover:bg-white cursor-pointer"
              variant="outline"
            >
              Filter
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            {/* TODAY */}
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

            {/* SHOW ALL */}
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
            <DropdownMenuCheckboxItem
              checked={filterMode === "clear"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("clear");
                  table.getColumn("date")?.setFilterValue(undefined);
                  setSelectedDate?.(null);
                }
              }}
            >
              Clear Date
            </DropdownMenuCheckboxItem>
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
          onClick={() => router.push(`/dashboard/create-new`)}
          className="cursor-pointer"
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
                <TableRow key={row.id} className="bg-white shadow-sm">
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
