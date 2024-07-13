import React, {
  createContext,
  ReactNode,
  useContext,
  useRef,
  useState,
} from "react";
import _ from "lodash";
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
  SelectGroup,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import {
  createInventoryChildData,
  inventoryError,
  inventoryData,
} from "@/app/slice/inventorySlice";

import {
  addUser,
  usersData,
  usersError,
} from "@/app/slice/usersManagementSlice";

import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

import { TableContextType } from "@/interface/InterfaceType";

const defaultTableContextValue: TableContextType = {
  children: null,
  page: "",
  setPage: () => {},
  placeHolder: "",
  columnName: "",
  rowsSelection: "",
  jsx: <div></div>,
  tablesOptionsJsx: <div></div>,
  selectedOption: null,
  tablesOptions: null,
  setSelectedOption: () => {},
  setTablesOptions: () => {},
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

  const dispatch = useAppDispatch();

  let placeHolder;
  let columnName;
  let jsx;
  let rowsSelection;

  const { register, handleSubmit, setValue, watch } = useForm<FormSubmit>();
  const imageInputRef = useRef<null>(null);

  console.log(imageInputRef.current);

  const { id } = useParams();

  //* INVENTORY PRODUCT LIST
  const inventoryChildData = useAppSelector(inventoryData);
  const inventoryChildError = useAppSelector(inventoryError);

  //* ADD USER MANAGEMENT
  const usersParentData = useAppSelector(usersData);
  const usersParentError = useAppSelector(usersError);

  console.log(usersParentError?.message);

  const handleFormSubmit =
    (url: string, formType: string): SubmitHandler<FormSubmit> =>
    async (data) => {
      const euDevice = Cookies.get("eu");

      switch (formType) {
        case "inventory":
          const payload = {
            inventory_id: id,
            eu_device: euDevice,
            item_code: data.item_code,
            image: data.image[0] || null,
            refundable: data.refundable,
            name: data.name,
            retail_price: data.retail_price,
            discounted_price: data.discounted_price,
            stocks: data.stocks,
            supplier_name: data.supplier_name,
          };
          dispatch(
            createInventoryChildData({
              url: url,
              method: "POST",
              data: payload,
            })
          );

          break;

        case "users":
          const usersPayload = {
            email: data.email,
            password: data.password,
            password_confirmation: data.password_confirmation,
            role: data.role,
            status: data.status,
            eu_device: euDevice,
          };

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
                  <Button size="sm" className="font-semibold bg-bgrjavancena">
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
                          accept="image/png,image/jpeg"
                          type="file"
                          className="col-span-3"
                          ref={(e) => {
                            register(e);
                            imageInputRef.current = e;
                          }}
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
                        <Button className="bg-bgrjavancena" type="submit">
                          Insert to table
                        </Button>
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
            usersParentData.data?.buttons?.map((btn: any, index: any) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <Button size="sm" className="font-semibold bg-bgrjavancena">
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
                      {btn?.details?.map((detail: any) => {
                        return (
                          <>
                            {detail.type !== "select" && (
                              <div className="flex flex-col gap-2">
                                <Label className="text-sm font-semibold">
                                  {detail?.label}
                                </Label>
                                <Input
                                  type={detail?.type}
                                  placeholder={`Enter your ${detail?.label}`}
                                  className="col-span-3"
                                  {...register(
                                    detail.label
                                      .replace(/\s+/g, "_")
                                      .toLowerCase()
                                  )}
                                />
                                {usersParentError?.message[
                                  _.replace(_.lowerCase(detail.label), " ", "_")
                                ] && (
                                  <small className="text-xs text-red-500">
                                    {
                                      usersParentError?.message[
                                        _.replace(
                                          _.lowerCase(detail.label),
                                          " ",
                                          "_"
                                        )
                                      ]
                                    }
                                  </small>
                                )}
                              </div>
                            )}
                            {detail?.type === "select" && (
                              <div className="flex flex-col gap-2">
                                <Label className="font-semibold text-xs">
                                  {detail?.label}
                                </Label>
                                <Select
                                  onValueChange={(value) =>
                                    setValue(
                                      detail.label
                                        .replace(/\s+/g, "_")
                                        .toLowerCase(),
                                      value
                                    )
                                  }
                                >
                                  <SelectTrigger>
                                    <SelectValue
                                      placeholder={`Select ${_.lowerCase(
                                        detail?.label
                                      )}`}
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectGroup>
                                      {detail?.option?.map((opt) => (
                                        <SelectItem
                                          key={opt?.value}
                                          value={opt?.value}
                                        >
                                          {opt?.label}
                                        </SelectItem>
                                      ))}
                                    </SelectGroup>
                                  </SelectContent>
                                </Select>
                                {usersParentError?.message[
                                  _.replace(_.lowerCase(detail.label), " ", "_")
                                ] && (
                                  <small className="text-xs text-red-500">
                                    {
                                      usersParentError?.message[
                                        _.replace(
                                          _.lowerCase(detail.label),
                                          " ",
                                          "_"
                                        )
                                      ]
                                    }
                                  </small>
                                )}
                              </div>
                            )}
                          </>
                        );
                      })}
                      <DialogFooter>
                        <Button className="bg-bgrjavancena" type="submit">
                          Create User
                        </Button>
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
