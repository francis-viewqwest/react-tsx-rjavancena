import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import shipmentOrder from "@/data/shipmentOrder.json";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { createInventoryChildData } from "@/app/slice/inventorySlice";
import { useParams } from "react-router-dom";
interface TableContextType {
  children: ReactNode;
  page: string;
  setPage: (page: string) => void;
  placeHolder: string | any;
  columnName: string | any;
  rowsSelection: string | any;
  jsx: React.ReactNode;
  tablesOptionsJsx: React.ReactNode;
  selectedOption: any;
  tablesOptions: any;
  setSelectedOption: any;
  setTablesOptions: any;
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
  interface CreateProduct {
    item_code: number;
    image: string;
    is_refund: boolean;
    name: string;
    retail_price: number;
    discounted_price: number;
    stocks: number;
    supplier_name: string;
  }

  const [page, setPage] = useState<string | any>(initialPage);
  const [selectedOption, setSelectedOption] = useState<any>("packOrders");

  const dispatch = useDispatch();

  let placeHolder;
  let columnName;
  let jsx;
  let rowsSelection;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateProduct>();
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { id } = useParams();
  console.log(id);

  const onSubmit: SubmitHandler<CreateProduct> = (data) => {
    const euDevice = Cookies.get("eu");
    const imageFile = imageInputRef.current?.files?.[0] || null;

    console.log("PAYLOAD: ", data);

    const payload = {
      inventory_id: id,
      eu_device: euDevice,
      item_code: data.item_code,
      image: imageFile,
      is_refund: data.is_refund,
      name: data.name,
      retail_price: data.retail_price,
      discounted_price: data.discounted_price,
      stocks: data.stocks,
      supplier_name: data.supplier_name,
    };

    console.log("PAYLOAD: ", payload);
    dispatch(
      createInventoryChildData({
        url: "inventory/product/store",
        method: "POST",
        data: payload,
      })
    );
  };

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
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="grid py-4 gap-6 px-2 sm:px-5"
                >
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Product Barcode</Label>
                    <Input
                      type="number"
                      placeholder="Enter product name"
                      className="col-span-3"
                      {...register("item_code")}
                    />
                    {errors.item_code && (
                      <small className="text-xs text-red-500">
                        {errors.item_code.message}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Product Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter product name"
                      className="col-span-3"
                      {...register("name")}
                    />
                    {errors.name && (
                      <small className="text-xs text-red-500">
                        {errors.name.message}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Unit Price</Label>
                    <Input
                      type="number"
                      placeholder="Enter unit price"
                      className="col-span-3"
                      {...register("retail_price")}
                    />
                    {errors.retail_price && (
                      <small className="text-xs text-red-500">
                        {errors.retail_price.message}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Stocks</Label>
                    <Input
                      type="number"
                      placeholder="Enter product quantity"
                      className="col-span-3"
                      {...register("stocks")}
                    />
                    {errors.stocks && (
                      <small className="text-xs text-red-500">
                        {errors.stocks.message}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Product Image</Label>
                    <Input
                      id="productImg"
                      type="file"
                      className="col-span-3"
                      ref={imageInputRef}
                      {...register("image")}
                    />
                    {errors.image && (
                      <small className="text-xs text-red-500">
                        {errors.image.message}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Supplier Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter product name"
                      className="col-span-3"
                      {...register("supplier_name")}
                    />
                    {errors.supplier_name && (
                      <small className="text-xs text-red-500">
                        {errors.supplier_name.message}
                      </small>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Can be refund?</Label>
                    <Select
                      onValueChange={(value) => setValue("is_refund", value)}
                      // value=""
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="yes">Yes</SelectItem>
                          <SelectItem value="no">No</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    {errors.is_refund && (
                      <small className="text-xs text-red-500">
                        {errors.is_refund.message}
                      </small>
                    )}
                  </div>
                  {/* <div className="flex flex-col gap-2">
                    <Label className="text-sm">Product Description</Label>
                    <Input
                      id="productDescription"
                      type="text"
                      placeholder="Enter product description"
                      className="col-span-3"
                    />
                  </div> */}
                  <div className="flex flex-col gap-2">
                    <Label className="text-sm">Discounted Price</Label>
                    <Input
                      type="number"
                      placeholder="Enter discounted price"
                      className="col-span-3"
                      {...register("discounted_price")}
                    />
                    {errors.discounted_price && (
                      <small className="text-xs text-red-500">
                        {errors.discounted_price.message}
                      </small>
                    )}
                  </div>

                  <DialogFooter>
                    <Button type="submit">Insert to table</Button>
                  </DialogFooter>
                </form>
              </ScrollArea>
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
    case "CustomerOrder":
      placeHolder = "Search Users";
      columnName = "customerName";
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
      value={{
        page,
        setPage,
        jsx,
        placeHolder,
        columnName,
        rowsSelection,
        selectedOption,
        setSelectedOption,
      }}
    >
      {children}
    </TableContext.Provider>
  );
};

export const useTableContext = () => {
  return useContext(TableContext);
};
