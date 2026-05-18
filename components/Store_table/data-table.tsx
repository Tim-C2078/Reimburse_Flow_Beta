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

export function DataTable({ columns, data, stores }) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [filterMode, setFilterMode] = React.useState("today");

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
              checked={filterMode === "today"}
              onCheckedChange={(checked) => checked && setFilterMode("today")}
            >
              Today
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={filterMode === "all"}
              onCheckedChange={(checked) => checked && setFilterMode("all")}
            >
              Show All
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={filterMode === "hidePaid"}
              onCheckedChange={(checked) =>
                checked && setFilterMode("hidePaid")
              }
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
                  className="bg-white text-black dark:bg-gray-900 dark:text-white shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => row.toggleSelected()}
                  onDoubleClick={() => {
                    const payment = row.original;

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
