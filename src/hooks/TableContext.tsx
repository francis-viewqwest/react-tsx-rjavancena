import React, { createContext, ReactNode, useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
interface TableContextType {
  children: ReactNode;
  page: string;
  setPage: (page: string) => void;
  placeHolder: string | any;
  columnName: string | any;
  rowsSelection: string | any;
  jsx: React.ReactNode;
}

const defaultTableContextValue: TableContextType = {
  page: "",
  setPage: () => {}, // Dummy function to avoid runtime errors
};

const TableContext = createContext<TableContextType>(defaultTableContextValue);

export const TableProvider: React.FC<{ children: ReactNode; page: string }> = ({
  children,
  page: initialPage,
}) => {
  const [page, setPage] = useState<string | any>(initialPage);

  let placeHolder;
  let columnName;
  let jsx;
  let rowsSelection;

  switch (page) {
    case "Inventory":
      placeHolder = "Search Product";
      columnName = "productName";
      jsx = (
        <>
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
        </>
      );
      rowsSelection = true;
      break;
    case "Dashboard":
      placeHolder = "Search Transaction";
      columnName = "customerId";
      rowsSelection = false;
      break;
    case "Users":
      placeHolder = "Search Users";
      columnName = "customerName";
      jsx = (
        <>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Add User</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="sm:px-5">
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-72 w-full">
                <div className="grid py-4 gap-6 px-2 sm:px-5">
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Customer Name</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Enter product name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter unit price"
                      className="col-span-3"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">User Role</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select user role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="cashier">Cashier</SelectItem>
                        <SelectItem value="delivery">Delivery</SelectItem>
                        <SelectItem value="customer">Customer</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </ScrollArea>
              <DialogFooter>
                <Button type="submit">Insert to table</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </>
      );
      rowsSelection = false;
      break;
    default:
      placeHolder = null;
      columnName = null;
      jsx = null;
      break;
  }

  return (
    <TableContext.Provider
      value={{ page, setPage, jsx, placeHolder, columnName, rowsSelection }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  return useContext(TableContext);
};
