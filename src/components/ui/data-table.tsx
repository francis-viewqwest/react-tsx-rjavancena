import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  SortingState,
  getSortedRowModel,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  search: any;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  title,
  search,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  });

  return (
    <>
      {search && (
        <>
          <div className="flex gap-4 pb-5 justify-between">
            <div className="yw-full yrelative yflex yitems-center lg:yw-96">
              <DataTableToolbar search={search} table={table} />
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Insert Product</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader className="sm:px-5">
                  <DialogTitle>Insert New Product</DialogTitle>
                  <DialogDescription>
                    This form allows you to seamlessly add a new product to your
                    inventory. Please fill out the required fields to proceed.
                  </DialogDescription>
                </DialogHeader>
                <ScrollArea className="h-72 w-full">
                  <div className="grid py-4 gap-6 px-2 sm:px-5">
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Product Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Unit Price</Label>
                      <Input
                        id="unitPrice"
                        placeholder="Enter unit price"
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Quantity</Label>
                      <Input
                        id="quantity"
                        placeholder="Enter product quantity"
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Product Image</Label>
                      <Input
                        id="productImg"
                        type="file"
                        placeholder="Enter product quantity"
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Product Description</Label>
                      <Input
                        id="productDescription"
                        type="text"
                        placeholder="Enter product description"
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Discounted Price</Label>
                      <Input
                        id="discPrice"
                        type="number"
                        placeholder="Enter discounted price"
                        className="col-span-3"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label className="text-sm">Shipping Fee</Label>
                      <Input
                        id="shippingFee"
                        type="number"
                        placeholder="Enter shipping fee"
                        className="col-span-3"
                      />
                    </div>
                  </div>
                </ScrollArea>
                <DialogFooter>
                  <Button type="submit">Insert to table</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}

      <div className="rounded-md border my-4">
        <h1 className="font-bold pt-3 px-4 tracking-tight text-xs">{title}</h1>
        <Table>
          <TableHeader className="text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
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
          <TableBody className="text-xs">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
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
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </>
  );
}
