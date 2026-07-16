import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { useState } from "react";
import { paymentsData } from "./data";
import { columns } from "./columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Funnel } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { router } from "next/client";

export default function TableDesign() {
  const [data, setData] = useState(paymentsData);
  const [rowSelection, setRowSelection] = useState({});
  const [hidden, setHidden] = useState(true);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    getFilteredRowModel: getFilteredRowModel(),
    enableRowSelection: true,
  });

  const selectedRows = table.getSelectedRowModel().rows;

  console.log(selectedRows.map((row) => row.original));

  return (
    <div>
      <div className="flex items-center justify-between gap-4 py-4 px-3">
        <h3 className="text-2xl font-semibold tracking-tight text-black dark:text-white">
          Petty Cash Expenses
        </h3>

        <div className="flex items-center gap-4">
          <Search
            onClick={() => setHidden(!hidden)}
            className="text-black dark:text-white cursor-pointer"
            width={20}
            height={20}
          />

          <Input
            onChange={(e) => table.setGlobalFilter(String(e.target.value))}
            placeholder="Filter entire table..."
            className={`${hidden ? "hidden" : ""} w-[250px] shadow-md bg-white text-black dark:bg-gray-900 dark:text-white`}
          />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="bg-slate-400 shadow-md text-white hover:bg-white hover:text-black dark:bg-gray-200 dark:text-black dark:hover:bg-white dark:hover:text-black cursor-pointer"
                variant="outline"
              >
                <Funnel />
                Filter
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white text-black dark:bg-gray-900 dark:text-white">
              <DropdownMenuCheckboxItem>Today</DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem>Show All</DropdownMenuCheckboxItem>

              <DropdownMenuCheckboxItem>Unpaid</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            title="create new petty cash"
            variant="outline"
            onClick={() => router.push(`/rc/shops/create-new?store=${stores}`)}
            className="shadow-md cursor-pointer bg-slate-400 text-white hover:bg-white hover:text-black dark:bg-gray-200 dark:text-black dark:hover:bg-white dark:hover:text-black"
          >
            Create New +
          </Button>
          <Trash2
            className="text-black dark:text-white cursor-pointer"
            width={20}
            height={20}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((getHeaderGroup) => (
            <TableRow key={getHeaderGroup.id}>
              {getHeaderGroup.headers.map((header) => (
                <TableHead
                  className="text-center text-black dark:text-white"
                  key={header.id}
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
          {table.getRowModel().rows.map((row) => (
            <TableRow
              className={`text-black dark:text-white shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                row.getIsSelected()
                  ? "bg-gray-100 dark:bg-gray-700"
                  : "bg-white dark:bg-gray-900"
              }`}
              key={row.id}
              onClick={() => row.toggleSelected()}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
