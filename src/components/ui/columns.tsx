import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";
import { RowInventoryActions } from "./data-table-actions-row";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  productId: number;
  img: any;
  productName: string;
  retail: number;
  discPrice: number;
  sells: number;
  returnProduct: number;
  stocks: number;
  supplier: string;
};

export type Transaction = {
  transactId: number;
  img: any;
  customerId: string;
  date: string;
  time: string;
  amount: number;
  status: string;
};

export type TopSelling = {
  img: null;
  product: string;
  category: string;
  price: number;
  stars: number;
  cart: number;
};

export const columnsProduct: ColumnDef<Product>[] = [
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

export const ColumnsTransac: ColumnDef<Transaction>[] = [
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
    header: "time",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return row.original.status === "Success" ? (
        <Badge variant="successOutline">{row.original.status}</Badge>
      ) : (
        <Badge variant="destructiveOutline">{row.original.status}</Badge>
      );
    },
  },
];
