// React
import { useEffect, useState } from "react";

// Thirdparty
import { ChevronDownIcon } from "@radix-ui/react-icons";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import TransactionsFilterSideBar from "@/components/TransactionsFilterSideBar/TransactionsFilterSideBar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import columnsData from "./columnsData";

// APISlices
import { useGetAllTransactionsQuery } from "@/store/apiSlices/childApiSlices/transactionsApiSlice";

// Slice

// CustomHooks

// Components

// Constants

// Enums

// Interfaces

// Styles
import styles from "./Transactions.module.css";

// Local enums

// Local constants

const Transactions = () => {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [rowSelection, setRowSelection] = useState({});

  // Fetching All Transactions
  const { data, isSuccess, isError, isLoading } = useGetAllTransactionsQuery();

  // Data
  const [filteredData, setFilteredData] = useState([]);

  const setFilteredDataHandler = (data) => {
    setFilteredData(data);
  };

  useEffect(() => {
    if (isSuccess) {
      setFilteredData(data?.data.transaction);
    }
  }, [data, isSuccess]);

  const table = useReactTable({
    data: filteredData,
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
              {/* If error */}
              {isError && (
                <TableRow>
                  <TableCell
                    colSpan={columnsData.length}
                    className="h-24 text-center"
                  >
                    {/* {error.message} */}Something went wrong..!
                  </TableCell>
                </TableRow>
              )}

              {/* If loading */}
              {isLoading && (
                <TableRow>
                  <TableCell
                    colSpan={columnsData.length}
                    className="h-24 text-center"
                  >
                    Data loading....
                  </TableCell>
                </TableRow>
              )}

              {/* If success and have data */}
              {isSuccess && table.getRowModel().rows?.length ? (
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
                    {isLoading || isError ? null : "No results."}
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
        <TransactionsFilterSideBar
          data={data}
          setFilteredData={setFilteredDataHandler}
        />
      </div>
    </div>
  );
};

export default Transactions;
