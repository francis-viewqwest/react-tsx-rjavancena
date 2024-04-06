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
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Label } from "@radix-ui/react-dropdown-menu";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = React.useState<SortingState>([]);

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
    <div>
      <div className="yflex ygap-4 ypb-5 yjustify-between">
        <div className="yw-full yrelative yflex yitems-center lg:yw-96">
          <MagnifyingGlassIcon className="yabsolute yml-3 ytext-neutral-500 yh-5 yw-5" />
          <Input
            className="ypx-12"
            placeholder="Search Product"
            value={
              (table.getColumn("productName")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("productName")?.setFilterValue(event.target.value)
            }
          />
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Insert Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Insert New Product</DialogTitle>
              <DialogDescription>
                This form allows you to seamlessly add a new product to your
                inventory. Please fill out the required fields to proceed.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="yh-72 yw-full">
              <div className="ygrid ypy-4 ygap-6 ypx-2 sm:ypx-5">
                <div className="ygrid grid-cols-4 yitems-center ygap-1">
                  <Label className="ytext-sm">Product Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    className="col-span-3"
                  />
                </div>
                <div className="ygrid grid-cols-4 yitems-center ygap-1">
                  <Label className="ytext-sm">Unit Price</Label>
                  <Input
                    id="unitPrice"
                    placeholder="Enter unit price"
                    className="col-span-3"
                  />
                </div>
                <div className="ygrid grid-cols-4 yitems-center ygap-1">
                  <Label className="ytext-sm">Quantity</Label>
                  <Input
                    id="quantity"
                    placeholder="Enter product quantity"
                    className="col-span-3"
                  />
                </div>
                <div className="ygrid grid-cols-4 yitems-center ygap-1">
                  <Label className="ytext-sm">Product Image</Label>
                  <Input
                    id="productImg"
                    type="file"
                    placeholder="Enter product quantity"
                    className="col-span-3"
                  />
                </div>
                <div className="ygrid grid-cols-4 yitems-center ygap-1">
                  <Label className="ytext-sm">Product Description</Label>
                  <Input
                    id="productDescription"
                    type="text"
                    placeholder="Enter product description"
                    className="col-span-3"
                  />
                </div>
                <div className="ygrid grid-cols-4 yitems-center ygap-1">
                  <Label className="ytext-sm">Discounted Price</Label>
                  <Input
                    id="discPrice"
                    type="number"
                    placeholder="Enter discounted price"
                    className="col-span-3"
                  />
                </div>
                <div className="ygrid grid-cols-4 yitems-center ygap-1">
                  <Label className="ytext-sm">Shipping Fee</Label>
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
      <div className="yrounded-md yborder">
        <Table>
          <TableHeader className="ytext-xs">
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
          <TableBody className="ytext-xs">
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
                  className="yh-24 ytext-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="yjustify-between yflex yitems-center">
        <div className="yflex-1 ytext-sm ytext-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="yflex yf yitems-center yjustify-end yspace-x-2 ypy-4">
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
  );
}
