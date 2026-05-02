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
  const [filterMode, setFilterMode] = React.useState<"today" | "all">("today");

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
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
    if (selectedDate) {
      table.getColumn("date")?.setFilterValue(selectedDate);
      setFilterMode("all");
    }
  }, [selectedDate]);

  // 🔥 FIX: APPLY "TODAY" ON FIRST LOAD
  React.useEffect(() => {
    if (filterMode === "today") {
      table.getColumn("date")?.setFilterValue(new Date());
    }
  }, []);

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
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={() =>
            router.push(`/dashboard/shops/create-new?store=${stores}`)
          }
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
