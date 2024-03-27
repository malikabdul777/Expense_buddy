import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TextWithEllipsis from "@/components/ui/TextWithEllipsis/TextWithEllipsis";

import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { FaRegEye } from "react-icons/fa";

import data from "../../data/data_updated";

import styles from "./Transactions.module.css";
import { useState } from "react";
import ViewTransactionModal from "@/components/ViewTransactionModal/ViewTransactionModal";
import EditTransactionModal from "@/components/EditTransactionsModal/EditTransactionModal";
import moment from "moment";

const categories = data.categories;
const columnsData = [
  {
    id: "view",
    header: () => <div>View</div>,
    cell: ({ row }) => {
      const [viewTransactionModalOpen, setViewTransactionModalOpen] =
        useState(false);

      return (
        <div className={`flex items-center ml-4 ${styles.viewIcon}`}>
          <ViewTransactionModal
            open={viewTransactionModalOpen}
            setOpen={setViewTransactionModalOpen}
            data={row.original}
          />
          <FaRegEye onClick={() => setViewTransactionModalOpen(true)} />
        </div>
      );
    },
  },
  ,
  {
    accessorKey: "title",
    header: () => {
      return <div>Title</div>;
    },
    cell: ({ row }) => (
      <div className="capitalize flex items-center">
        <span className="mr-5">
          {
            categories.filter((ele) => ele.name === row.original.category)[0]
              .emoji
          }
        </span>
        <TextWithEllipsis maxLength={14}>
          {row.getValue("title")}
        </TextWithEllipsis>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "CAD",
      }).format(amount);

      return (
        <div
          className={`${
            row.original.type === "debit" ? "errorColor" : "successColor"
          }`}
        >
          <TextWithEllipsis maxLength={14}>{formatted}</TextWithEllipsis>
        </div>
      );
    },
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => (
      <div className="lowercase">
        <TextWithEllipsis maxLength={14}>
          {row.getValue("account")}
        </TextWithEllipsis>
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="lowercase">
        <TextWithEllipsis maxLength={10}>
          {row.getValue("category")}
        </TextWithEllipsis>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="lowercase">
          {moment(row.getValue("createdAt")).format("L")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const [viewTransactionModalOpen, setViewTransactionModalOpen] =
        useState(false);
      const [editTransactionModalOpen, setEditTransactionModalOpen] =
        useState(false);
      return (
        <DropdownMenu>
          <ViewTransactionModal
            open={viewTransactionModalOpen}
            setOpen={setViewTransactionModalOpen}
            data={row.original}
          />
          <EditTransactionModal
            open={editTransactionModalOpen}
            setOpen={setEditTransactionModalOpen}
            data={row.original}
          />
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => setViewTransactionModalOpen(true)}>
              View Item
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setEditTransactionModalOpen(true)}>
              Update Item
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem className={"errorColor"}>
              Delete Item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export default columnsData;
