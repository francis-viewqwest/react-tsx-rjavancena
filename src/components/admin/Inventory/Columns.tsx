import { ColumnDef } from "@tanstack/react-table";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  IconDots,
  IconPencil,
  IconTrash,
  IconArrowUp,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Checkbox } from "@/components/ui/checkbox";

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

export const Columns: ColumnDef<Product>[] = [
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
      return <Skeleton className="yh-11 yw-11 ybg-neutral-200 yrounded-xl" />;
    },
  },
  {
    accessorKey: "productName",
    header: ({ column }) => {
      return (
        <span
          className="ytext-xs yflex yitems-center ycursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product Name
          <IconArrowUp className="yml-2 yh-3 yw-3" />
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
          className="ytext-xs yflex yitems-center ycursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sells
          <IconArrowUp className="yml-2 yh-3 yw-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "returnProduct",
    header: ({ column }) => {
      return (
        <span
          className="ytext-xs yflex yitems-center ycursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Return
          <IconArrowUp className="yml-2 yh-3 yw-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "stocks",
    header: ({ column }) => {
      return (
        <span
          className="ytext-xs yflex yitems-center ycursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Stocks
          <IconArrowUp className="yml-2 yh-3 yw-3" />
        </span>
      );
    },
  },
  {
    accessorKey: "supplier",
    header: "Supplier",
  },
  {
    accessorKey: "action",
    header: "",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost">
              <DotsHorizontalIcon className="yh-6 yw-6" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Action</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Edit
              <DropdownMenuShortcut>
                <Pencil1Icon />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Remove
              <DropdownMenuShortcut>
                <TrashIcon color="red" />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
