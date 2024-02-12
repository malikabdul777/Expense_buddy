// React
import { useEffect, useState } from "react";

// Thirdparty
import { addDays } from "date-fns";
import { ChevronDownIcon } from "@radix-ui/react-icons";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Utils
import data from "../../data/data_updated";
import columnsData from "./columnsData";

// APISlices

// Slice

// CustomHooks

// Components
import EBDateRangePicker from "@/components/EBDateRangePicker/EBDateRangePicker";

// Constants

// Enums

// Interfaces

// Styles
import styles from "./Transactions.module.css";
import TransactionsFilterSideBar from "@/components/TransactionsFilterSideBar/TransactionsFilterSideBar";

// Local enums

// Local constants

const Transactions = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});
  const [date, setDate] = useState({
    from: addDays(new Date(), -30),
    to: new Date(),
  });
  const [dateFilteredData, setDateFilteredData] = useState([]);

  useEffect(() => {
    const filteredData = data.transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      if (
        date &&
        date.to !== undefined &&
        date.from !== undefined &&
        date !== undefined
      ) {
        return transactionDate >= date.from && transactionDate <= date.to;
      } else {
        return null;
      }
    });

    setDateFilteredData(filteredData);
  }, [date]);

  const table = useReactTable({
    data: dateFilteredData,
    columns: columnsData,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className={`${styles.container}`}>
      <div className={styles.tableContainerMain}>
        <div className={`flex items-center py-4 ${styles.tableFilterTopBar}`}>
          <EBDateRangePicker date={date} setDate={setDate} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={"sm"} className="ml-auto">
                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column, index) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={`${column.id}${index}`}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className={`rounded-md border ${styles.tableContainer}`}>
          <Table className={styles.table}>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup, index) => (
                <TableRow
                  key={`${headerGroup.id}${index}`}
                  className={styles.tableRow}
                >
                  {headerGroup.headers.map((header, index) => {
                    return (
                      <TableHead key={`${header.id}${index}`}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row, index) => (
                  <TableRow
                    key={`${row.id}${index}`}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, index) => (
                      <TableCell key={`${cell.id}${index}`}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columnsData.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div
          className={`flex items-center justify-end space-x-2 py-4 ${styles.bottomTableNavigationBar}`}
        >
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
      <div className={styles.tableFilterContainer}>
        <TransactionsFilterSideBar />
      </div>
    </div>
  );
};

export default Transactions;
