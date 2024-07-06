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
import { useDispatch, useSelector } from "react-redux";
import {
  createInventoryChildData,
  loadingStatus,
  inventoryError,
  inventoryData,
} from "@/app/slice/inventorySlice";

import {
  addUser,
  usersData,
  usersError,
} from "@/app/slice/usersManagementSlice";

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
  interface FormSubmit {
    item_code: number;
    image: string;
    refundable: string;
    name: string;
    retail_price: number;
    discounted_price: number;
    stocks: number;
    supplier_name: string;
    email: string;
    password: any;
    password_confirmation: any;
    role: string;
    status: string;
  }

  const [page, setPage] = useState<string | any>(initialPage);
  const [selectedOption, setSelectedOption] = useState<any>("packOrders");

  const dispatch = useDispatch();

  let placeHolder;
  let columnName;
  let jsx;
  let rowsSelection;

  const { register, handleSubmit, setValue } = useForm<FormSubmit>();
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const { id } = useParams();

  //* INVENTORY PRODUCT LIST
  const inventoryChildData = useSelector(inventoryData);
  const inventoryChildError = useSelector(inventoryError);

  //* ADD USER MANAGEMENT
  const usersParentData = useSelector(usersData);
  const usersParentError = useSelector(usersError);

  console.log(usersParentError?.message?.password);

  const handleFormSubmit =
    (url: string, formType: string): SubmitHandler<FormSubmit> =>
    async (data) => {
      const euDevice = Cookies.get("eu");
      const imageFile = imageInputRef.current?.files?.[0] || null;

      const payload = {
        inventory_id: id,
        eu_device: euDevice,
        item_code: data.item_code,
        image: imageFile,
        refundable: data.refundable,
        name: data.name,
        retail_price: data.retail_price,
        discounted_price: data.discounted_price,
        stocks: data.stocks,
        supplier_name: data.supplier_name,
      };

      const usersPayload = {
        email: data.email,
        password: data.password,
        password_confirmation: data.password_confirmation,
        role: data.role,
        status: data.status,
        eu_device: euDevice,
      };

      console.log(data);

      switch (formType) {
        case "inventory":
          dispatch(
            createInventoryChildData({
              url: url,
              method: "POST",
              data: payload,
            })
          );

          break;

        case "users":
          dispatch(
            addUser({
              url: "accounts/admin/store",
              method: "POST",
              data: usersPayload,
            })
          );

          break;

        default:
          break;
      }
    };

  switch (page) {
    case "Inventory":
      placeHolder = "Search Product";
      columnName = "name";
      jsx = (
        <>
          {Array.isArray(inventoryChildData.data?.buttons) &&
            inventoryChildData.data?.buttons.map((btn: any, index: any) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Button size="sm" className="font-semibold">
                    {btn.button_name}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="sm:px-5">
                    <DialogTitle>Insert New Product</DialogTitle>
                    <DialogDescription>
                      This form allows you to seamlessly add a new product to
                      your inventory. Please fill out the required fields to
                      proceed.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-72 w-full">
                    <form
                      onSubmit={handleSubmit(
                        handleFormSubmit(btn.url, "inventory")
                      )}
                      className="grid py-4 gap-6 px-2 sm:px-5"
                    >
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                          Product Barcode
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter product name"
                          className="col-span-3"
                          {...register("item_code")}
                        />
                        {inventoryChildError?.item_code && (
                          <small className="text-xs text-red-500">
                            {inventoryChildError?.item_code}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                          Product Name
                        </Label>
                        <Input
                          type="text"
                          placeholder="Enter product name"
                          className="col-span-3"
                          {...register("name")}
                        />
                        {inventoryChildError?.name && (
                          <small className="text-xs text-red-500">
                            {inventoryChildError?.name}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                          Unit Price
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter unit price"
                          className="col-span-3"
                          {...register("retail_price")}
                        />
                        {inventoryChildError?.retail_price && (
                          <small className="text-xs text-red-500">
                            {inventoryChildError?.retail_price}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">Stocks</Label>
                        <Input
                          type="number"
                          placeholder="Enter product quantity"
                          className="col-span-3"
                          {...register("stocks")}
                        />
                        {inventoryChildError?.stocks && (
                          <small className="text-xs text-red-500">
                            {inventoryChildError?.stocks}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                          Product Image
                        </Label>
                        <Input
                          id="productImg"
                          type="file"
                          className="col-span-3"
                          ref={imageInputRef}
                          {...register("image")}
                        />
                        {inventoryChildError?.image && (
                          <small className="text-xs text-red-500">
                            {inventoryChildError?.image}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                          Supplier Name
                        </Label>
                        <Input
                          type="text"
                          placeholder="Enter product name"
                          className="col-span-3"
                          {...register("supplier_name")}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                          Can be refund?
                        </Label>
                        <Select
                          onValueChange={(value) =>
                            setValue("refundable", value)
                          }
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
                        {inventoryChildError?.refundable && (
                          <small className="text-xs text-red-500">
                            {inventoryChildError?.refundable}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                          Discounted Price
                        </Label>
                        <Input
                          type="number"
                          placeholder="Enter discounted price"
                          className="col-span-3"
                          {...register("discounted_price")}
                        />
                      </div>

                      <DialogFooter>
                        <Button type="submit">Insert to table</Button>
                      </DialogFooter>
                    </form>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            ))}
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
      columnName = "email";
      jsx = (
        <>
          {Array.isArray(usersParentData.data?.buttons) &&
            usersParentData.data?.buttons.map((btn: any, index: any) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Button size="sm" className="font-semibold">
                    {btn.button_name}
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="sm:px-5">
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Enter the details below to add a new user to the system.
                      Ensure all required fields are completed accurately.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-72 w-full">
                    <form
                      onSubmit={handleSubmit(
                        handleFormSubmit(btn.url, "users")
                      )}
                      className="grid py-4 gap-6 px-2 sm:px-5"
                    >
                      {/* <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">Name</Label>
                        <Input
                          type="number"
                          placeholder="Enter product name"
                          className="col-span-3"
                          {...register("name")}
                        />
                        {inventoryChildError?.item_code && (
                          <small className="text-xs text-red-500">
                            {inventoryChildError?.item_code}
                          </small>
                        )}
                      </div> */}
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">Email</Label>
                        <Input
                          type="email"
                          placeholder="Enter email"
                          className="col-span-3"
                          {...register("email")}
                        />
                        {usersParentError?.message?.email && (
                          <small className="text-xs text-red-500">
                            {usersParentError?.message?.email}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                          Password
                        </Label>
                        <Input
                          type="password"
                          placeholder="Enter password"
                          className="col-span-3"
                          {...register("password")}
                        />
                        {usersParentError?.message?.password && (
                          <small className="text-xs text-red-500">
                            {usersParentError?.message?.password}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">
                          Confirm Password
                        </Label>
                        <Input
                          type="password"
                          placeholder="Enter confirm password"
                          className="col-span-3"
                          {...register("password_confirmation")}
                        />
                        {usersParentError?.message?.password_confirmation && (
                          <small className="text-xs text-red-500">
                            {usersParentError?.message?.password_confirmation}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">Role</Label>
                        <Select
                          onValueChange={(value) => setValue("role", value)}
                          // value=""
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="superadmin">
                                Super Admin
                              </SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                              <SelectItem value="cashier">Cashier</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {usersParentError?.message?.role && (
                          <small className="text-xs text-red-500">
                            {usersParentError?.message?.role}
                          </small>
                        )}
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label className="text-sm font-semibold">Status</Label>
                        <Select
                          onValueChange={(value) => setValue("status", value)}
                          // value=""
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectItem value="active">Active</SelectItem>
                              <SelectItem value="incative">
                                In Active
                              </SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        {usersParentError?.message?.status && (
                          <small className="text-xs text-red-500">
                            {usersParentError?.message?.status}
                          </small>
                        )}
                      </div>
                      <DialogFooter>
                        <Button type="submit">Create User</Button>
                      </DialogFooter>
                    </form>
                  </ScrollArea>
                </DialogContent>
              </Dialog>
            ))}
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
