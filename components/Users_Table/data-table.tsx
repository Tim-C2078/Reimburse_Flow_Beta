import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
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
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";

export default function TableDesign() {
  const router = useRouter();

  const [data, setData] = useState(paymentsData);
  const [rowSelection, setRowSelection] = useState({});
  const [hidden, setHidden] = useState(true);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [checkedValues, setCheckedValues] = useState("showAll");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
      columnFilters,
    },
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    enableRowSelection: true,
    getPaginationRowModel: getPaginationRowModel(),
    filterFns: {
      statusFilter: (row, columnId, filterValue) => {
        const status = row.getValue(columnId);

        return filterValue.includes(status);
      },
    },
  });

  const selectedRows = table.getSelectedRowModel().rows;
  console.log(selectedRows.map((row) => row.original.id));

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
                variant="outline"
                className="bg-slate-400 shadow-md text-white hover:bg-white hover:text-black cursor-pointer dark:bg-gray-200 dark:text-black dark:hover:bg-white dark:hover:text-black"
              >
                <Funnel />
                Filter
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="bg-white dark:bg-gray-900">
              <DropdownMenuLabel>Filter Table</DropdownMenuLabel>

              <DropdownMenuRadioGroup
                value={checkedValues}
                onValueChange={(value) => {
                  setCheckedValues(value);

                  /// Adding logic to filter the table based on the selected value
                  if (value === "showAll") {
                    setColumnFilters([]);
                  } else if (value === "today") {
                    setColumnFilters([
                      {
                        id: "date",
                        value: [new Date()],
                      },
                    ]);
                  } else if (value === "unpaid") {
                    setColumnFilters([
                      {
                        id: "status",
                        value: [
                          "pending",
                          "processing",
                          "under review",
                          "approved",
                          "pending approval",
                        ],
                      },
                    ]);
                  }
                }}
              >
                <DropdownMenuRadioItem value="showAll">
                  Show All
                </DropdownMenuRadioItem>

                <DropdownMenuRadioItem value="today">
                  Today
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="unpaid">
                  Unpaid
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            title="create new petty cash"
            variant="outline"
            onClick={() => router.push(`/store/create-new`)}
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
                  className="text-center text-black dark:text-white "
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
              className={`text-center text-black dark:text-white shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
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
  );
}
