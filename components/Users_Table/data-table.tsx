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

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [filterMode, setFilterMode] = React.useState("all");

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
          className="max-w-sm shadow-md bg-white text-black dark:bg-gray-900 dark:text-white"
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              className="bg-black text-white hover:bg-white hover:text-black dark:bg-gray-200 dark:text-black dark:hover:bg-white dark:hover:text-black cursor-pointer"
              variant="outline"
            >
              Filter
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="bg-white text-black dark:bg-gray-900 dark:text-white">
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
              Area Coach
            </DropdownMenuCheckboxItem>

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
              Regional Coach
            </DropdownMenuCheckboxItem>

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
          title="create user"
          onClick={() => router.push("/dashboard/users/create-new")}
          className="cursor-pointer"
        >
          <FilePlus />
        </Button>
      </div>

      {/* TABLE */}
      <div className="rounded-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950">
        <Table className="border-separate border-spacing-y-2">
          <TableHeader className="bg-gray-100 dark:bg-gray-800">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-center text-black dark:text-white"
                  >
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
                  className="bg-white text-black dark:bg-gray-900 dark:text-white shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
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
                  className="text-center py-10 text-gray-500 dark:text-gray-400"
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
            className="dark:text-white dark:border-gray-600"
          >
            Previous
          </Button>

          <Button
            variant="outline"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="dark:text-white dark:border-gray-600"
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
