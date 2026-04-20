"use client";

import { Button } from "@/components/ui/button";

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
import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  selectedDate?: Date | null;
  setSelectedDate?: React.Dispatch<React.SetStateAction<Date | null>>;
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [filterMode, setFilterMode] = React.useState<
    | "all"
    | "admin"
    | "finance"
    | "store"
    | "area coach"
    | "regional coach"
    | "supreme admin"
    | "online"
    | "offline"
  >("all");

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

  // ✅ RESET ALL FILTERS HELPER
  const resetFilters = () => {
    table.getColumn("role")?.setFilterValue(undefined);
    table.getColumn("status")?.setFilterValue(undefined);
  };
  const router = useRouter();

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
            {/* ALL */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "all"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("all");
                  resetFilters();
                }
              }}
            >
              All
            </DropdownMenuCheckboxItem>

            {/* ADMIN */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "admin"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("admin");
                  resetFilters();
                  table.getColumn("role")?.setFilterValue("admin");
                }
              }}
            >
              Admin
            </DropdownMenuCheckboxItem>

            {/* STORE */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "store"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("store");
                  resetFilters();
                  table.getColumn("role")?.setFilterValue("store");
                }
              }}
            >
              Stores
            </DropdownMenuCheckboxItem>

            {/* FINANCE */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "finance"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("finance");
                  resetFilters();
                  table.getColumn("role")?.setFilterValue("finance");
                }
              }}
            >
              Finance
            </DropdownMenuCheckboxItem>

            {/* AREA COACH */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "area coach"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("area coach");
                  resetFilters();
                  table.getColumn("role")?.setFilterValue("area coach");
                }
              }}
            >
              Area Coaches
            </DropdownMenuCheckboxItem>

            {/* REGIONAL COACH */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "regional coach"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("regional coach");
                  resetFilters();
                  table.getColumn("role")?.setFilterValue("regional coach");
                }
              }}
            >
              Regional Coaches
            </DropdownMenuCheckboxItem>

            {/* SUPREME ADMIN */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "supreme admin"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("supreme admin");
                  resetFilters();
                  table.getColumn("role")?.setFilterValue("supreme admin");
                }
              }}
            >
              Supreme Admin
            </DropdownMenuCheckboxItem>

            {/* ONLINE */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "online"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("online");
                  resetFilters();
                  table.getColumn("status")?.setFilterValue("online");
                }
              }}
            >
              Online
            </DropdownMenuCheckboxItem>

            {/* OFFLINE */}
            <DropdownMenuCheckboxItem
              checked={filterMode === "offline"}
              onCheckedChange={(checked) => {
                if (checked) {
                  setFilterMode("offline");
                  resetFilters();
                  table.getColumn("status")?.setFilterValue("offline");
                }
              }}
            >
              Offline
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          onClick={() => {
            router.push("/dashboard/users/create-new");
          }}
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
