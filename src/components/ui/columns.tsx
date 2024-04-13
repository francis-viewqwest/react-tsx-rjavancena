import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { RowInventoryActions, RowUsersAction } from "./data-table-actions-row";
import {
  ProductType,
  TransactionType,
  UsersType,
  CustomerOrderType,
} from "@/interface/InterfaceType";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columnsProduct: ColumnDef<ProductType>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "productId",
    header: "Product ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "retail",
    header: "Retail",
    cell: ({ row }) => {
      const retail = parseFloat(row.getValue("retail"));
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(retail);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "discPrice",
    header: "Disc. Price",
    cell: ({ row }) => {
      const discPrice = parseFloat(row.getValue("discPrice"));
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(discPrice);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "sells",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sells
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "returnProduct",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Return
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "stocks",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stocks
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
  },
  {
    id: "actions",
    cell: ({ row }) => <RowInventoryActions row={row} />,
  },
];

export const ColumnsTransac: ColumnDef<TransactionType>[] = [
  {
    accessorKey: "transactId",
    header: "Transact ID",
  },
  {
    accessorKey: "img",
    header: "Image",
    cell: () => {
      return <Skeleton className="h-11 w-11 bg-neutral-200 rounded-xl" />;
    },
  },
  {
    accessorKey: "customerId",
    header: "Customer ID",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
    cell: ({ row }) => {
      return row.original.status === "Success" ? (
        <Badge variant="successOutline">{row.original.status}</Badge>
      ) : (
        <Badge variant="destructiveOutline">{row.original.status}</Badge>
      );
    },
  },
];

export const ColumnsUsers: ColumnDef<UsersType>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "customerName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Role
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <span
          className="text-xs flex items-center cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpIcon className="ml-2 h-3 w-3" />
        </span>
      );
    },
    cell: ({ row }) => {
      return row.original.status === "Active" ? (
        <Badge variant="successStatus">{row.original.status}</Badge>
      ) : row.original.status === "Inactive" ? (
        <Badge variant="dimmedStatus">{row.original.status}</Badge>
      ) : (
        <Badge variant="destructiveStatus">{row.original.status}</Badge>
      );
    },
  },
  {
    accessorKey: "totalReturn",
    header: "Return",
  },
  {
    id: "action",
    cell: ({ row }) => <RowUsersAction row={row} />,
  },
];

export const ColumnsCustomerOrder: ColumnDef<CustomerOrderType>[] = [
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "img",
    header: "Image",
  },
  {
    accessorKey: "orderId",
    header: "Order ID",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "customerName",
    header: "Customer Name",
  },
  {
    accessorKey: "datePlaced",
    header: "Date Placed",
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
  },
  {
    accessorKey: "orderStatus",
    header: "Order Status",
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
  },
];
