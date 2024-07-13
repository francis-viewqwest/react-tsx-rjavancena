import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DialogClose, DialogPortal } from "@radix-ui/react-dialog";

import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Cookies from "js-cookie";
import _ from "lodash";
import {
  updateInventoryChild,
  inventoryError,
  deleteInventoryChildData,
} from "@/app/slice/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  usersError,
  deleteUser,
} from "@/app/slice/usersManagementSlice";
import { voidPaid } from "@/app/slice/dashboardSlice";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function RowInventoryActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { control, handleSubmit, getValues, setValue, register, watch } =
    useForm({});

  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const dispatch = useDispatch();
  const [showEditDialog, setShowEditDialog] = useState(false);
  console.log(showEditDialog);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const inventoryChildError = useSelector(inventoryError);

  const handleEdit = (values: any) => {
    console.log(values);
    setFuncData(values);

    values.details.forEach((val) => {
      const fieldName = val.label.replace(/\s+/g, "_").toLowerCase();
      setValue(fieldName, val.value);
    });

    setModalData(values);
    setShowEditDialog(true);
    setShowRemoveDialog(false);
  };

  const handleRemove = (values: any) => {
    setFuncData(values);
    setModalData(values);
    setShowRemoveDialog(true);
    setShowEditDialog(false);
  };

  const handleSaveClick = () => {
    const formValues = getValues();

    const euDevice = Cookies.get("eu");

    console.log(formValues);

    const payload = {
      inventory_product_id: funcData.inventory_product_id,
      inventory_id: funcData.inventory_id,
      item_code: formValues.item_code,
      name: formValues.product_name,
      retail_price: formValues.retail_price,
      discounted_price: formValues.discounted_price,
      unit_supplier_price: formValues.unit_supplier_price,
      refundable: formValues.refundable,
      supplier_name: formValues.supplier_name,
      stocks: formValues.stocks,
      eu_device: euDevice,
    };

    dispatch(
      updateInventoryChild({
        url: funcData.url,
        method: "POST",
        data: payload,
      })
    );
  };

  const handleDeleteClick = () => {
    const euDevice = Cookies.get("eu");

    const payload = {
      inventory_product_id: funcData.inventory_product_id,
      inventory_id: funcData.inventory_id,
      eu_device: euDevice,
    };

    console.log(payload);

    dispatch(
      deleteInventoryChildData({
        url: funcData.url,
        method: funcData.method,
        data: payload,
      })
    );
  };

  const errorMessages = {
    product_name: inventoryChildError?.name,
    item_code: inventoryChildError?.item_code,
    refundable: inventoryChildError?.refundable,
    retail_price: inventoryChildError?.retail_price,
    stocks: inventoryChildError?.stocks,
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost">
            <DotsHorizontalIcon className="hidden md:block h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {row?.original?.action.map((act) => (
            <>
              {act.button_name == "Edit" ? (
                <>
                  <DropdownMenuItem>
                    <DialogTrigger
                      className="flex items-center w-full justify-between"
                      onClick={() => handleEdit(act)}
                    >
                      {act.button_name}
                      <DropdownMenuShortcut>
                        <Icon fontSize={16} icon={act.icon} />
                      </DropdownMenuShortcut>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <DialogTrigger
                      className="flex items-center w-full justify-between"
                      onClick={() => handleRemove(act)}
                    >
                      {act.button_name}
                      <DropdownMenuShortcut>
                        <Icon fontSize={16} icon={act.icon} />
                      </DropdownMenuShortcut>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </>
              )}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogPortal>
        {showEditDialog && (
          <DialogContent className="sm:max-w-[34rem]">
            <DialogHeader>
              <DialogTitle>Edit product details</DialogTitle>
              <DialogDescription>
                Make changes to your product details here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 ">
              {modalData?.details?.map((detail: any) => {
                const fieldName = detail.label
                  .replace(/\s+/g, "_")
                  .toLowerCase();
                console.log(fieldName);

                return (
                  <>
                    <div className="grid grid-cols-auto items-center gap-2 w-full">
                      {detail.type === "input" && (
                        <>
                          <Label className="font-semibold text-xs">
                            {detail?.label}
                          </Label>
                          <>
                            <Input
                              type="text"
                              {...register(
                                detail.label.replace(/\s+/g, "_").toLowerCase()
                              )}
                              className="col-span-4"
                            />
                            <small className="text-red-500 w-full col-span-3">
                              {errorMessages &&
                                errorMessages[
                                  _.replace(_.lowerCase(detail.label), " ", "_")
                                ]}
                            </small>
                          </>
                        </>
                      )}
                      {detail.type === "file" && (
                        <>
                          <Label className="text-xs font-semibold">
                            {detail.label}
                          </Label>
                          <Input
                            id="productImg"
                            type="file"
                            className="col-span-4"
                            ref={imageInputRef}
                            {...register(
                              detail.label.replace(/\s+/g, "_").toLowerCase()
                            )}
                          />
                        </>
                      )}
                      {detail.type === "select" && (
                        <>
                          <Label className="font-semibold text-xs">
                            {detail?.label}
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setValue(
                                detail.label.replace(/\s+/g, "_").toLowerCase(),
                                value
                              )
                            }
                            value={watch(
                              detail.label.replace(/\s+/g, "_").toLowerCase()
                            )}
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
                        </>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
            <DialogFooter>
              <Button
                className="bg-bgrjavancena"
                type="submit"
                onClick={() => handleSaveClick()}
              >
                Save changes
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}

        {showRemoveDialog && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Delete Product{" "}
                {modalData?.details?.map((detail, index) => (
                  <>
                    {detail.label === "Product Name" && (
                      <span>{detail.value}</span>
                    )}
                  </>
                ))}
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone. This will permanently delete your
                product and remove it from your inventory.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                type="submit"
                onClick={() => handleDeleteClick()}
              >
                Delete
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </DialogPortal>
    </Dialog>
  );
}

export function RowUsersActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { control, handleSubmit, getValues, setValue, register, watch } =
    useForm({});

  const errorMessage = useSelector(usersError);

  console.log(errorMessage?.message);

  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const dispatch = useDispatch();
  const [showEditDialog, setShowEditDialog] = useState(false);
  console.log(showEditDialog);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const inventoryChildError = useSelector(inventoryError);

  const handleEdit = (values: any) => {
    console.log(values);
    setFuncData(values);

    values.details.forEach((val) => {
      const fieldName = val.label.replace(/\s+/g, "_").toLowerCase();
      setValue(fieldName, val.value);
    });

    setModalData(values);
    setShowEditDialog(true);
    setShowRemoveDialog(false);
  };

  const handleRemove = (values: any) => {
    console.log(values);
    setFuncData(values);
    setModalData(values);
    setShowRemoveDialog(true);
    setShowEditDialog(false);
  };

  const handleSaveClick = () => {
    const formValues = getValues();

    const euDevice = Cookies.get("eu");

    const payload = {
      user_id: funcData.user_id,
      phone_number: formValues.phone_number,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      role: formValues.role,
      status: formValues.status,
      eu_device: euDevice,
    };

    dispatch(
      editUser({
        url: funcData.url,
        method: "POST",
        data: payload,
      })
    );
  };

  const handleDeleteClick = () => {
    const euDevice = Cookies.get("eu");

    const payload = {
      user_id: funcData.user_id,
      eu_device: euDevice,
    };

    dispatch(
      deleteUser({
        url: funcData.url,
        method: funcData.method,
        data: payload,
      })
    );
  };

  const errorMessages = {
    password: errorMessage?.message?.password,
  };

  return (
    <Dialog>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Button variant="ghost">
            <DotsHorizontalIcon className="hidden md:block h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {row?.original?.actions?.map((act) => (
            <>
              {act.button_name == "Edit" ? (
                <>
                  <DropdownMenuItem>
                    <DialogTrigger
                      className="flex items-center w-full justify-between"
                      onClick={() => handleEdit(act)}
                    >
                      {act.button_name}
                      <DropdownMenuShortcut>
                        <Icon fontSize={16} icon={act.icon} />
                      </DropdownMenuShortcut>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem>
                    <DialogTrigger
                      className="flex items-center w-full justify-between"
                      onClick={() => handleRemove(act)}
                    >
                      {act.button_name}
                      <DropdownMenuShortcut>
                        <Icon fontSize={16} icon={act.icon} />
                      </DropdownMenuShortcut>
                    </DialogTrigger>
                  </DropdownMenuItem>
                </>
              )}
            </>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogPortal>
        {showEditDialog && (
          <DialogContent className="sm:max-w-[34rem]">
            <DialogHeader>
              <DialogTitle>Edit account details</DialogTitle>
              <DialogDescription>
                Edit user account details below. Update information and click
                save to apply changes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-3 ">
              {modalData?.details?.map((detail: any) => {
                return (
                  <>
                    <div className="grid grid-cols-auto items-center gap-2 w-full">
                      {detail.type !== "select" && (
                        <>
                          <Label className="font-semibold text-xs">
                            {detail?.label}
                          </Label>
                          <>
                            <Input
                              type={detail.type}
                              {...register(
                                detail.label.replace(/\s+/g, "_").toLowerCase()
                              )}
                              className="col-span-4"
                            />
                            <small className="text-red-500 w-full col-span-3">
                              {errorMessages &&
                                errorMessages[
                                  _.replace(_.lowerCase(detail.label), " ", "_")
                                ]}
                            </small>
                          </>
                        </>
                      )}
                      {detail.type === "select" && (
                        <>
                          <Label className="font-semibold text-xs">
                            {detail?.label}
                          </Label>
                          <Select
                            onValueChange={(value) =>
                              setValue(
                                detail.label.replace(/\s+/g, "_").toLowerCase(),
                                value
                              )
                            }
                            value={watch(detail.value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder={detail.value} />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                {detail?.option?.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {opt.label}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </>
                      )}
                    </div>
                  </>
                );
              })}
            </div>
            <DialogFooter>
              <Button
                className="bg-bgrjavancena"
                type="submit"
                onClick={() => handleSaveClick()}
              >
                Save changes
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}

        {showRemoveDialog && (
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                Delete this user?{" "}
                {modalData?.details?.map((detail, index) => (
                  <>
                    {detail.label === "Product Name" && (
                      <span>{detail.value}</span>
                    )}
                  </>
                ))}
              </DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button
                variant="destructive"
                type="submit"
                onClick={() => handleDeleteClick()}
              >
                Delete
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}
      </DialogPortal>
    </Dialog>
  );
}

export function RowTransactionActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const { control, handleSubmit, getValues, setValue, register, watch } =
    useForm({});

  const errorMessage = useSelector(usersError);

  console.log(errorMessage?.message);

  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const dispatch = useDispatch();
  const [showEditDialog, setShowEditDialog] = useState(false);
  console.log(showEditDialog);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const inventoryChildError = useSelector(inventoryError);

  const handleEdit = (values: any) => {
    console.log(values);
    setFuncData(values);

    values.details.forEach((val) => {
      const fieldName = val.label.replace(/\s+/g, "_").toLowerCase();
      setValue(fieldName, val.value);
    });

    setModalData(values);
    setShowEditDialog(true);
    setShowRemoveDialog(false);
  };

  const handleRemove = (values: any) => {
    console.log(values);
    setFuncData(values);
    setModalData(values);
    setShowRemoveDialog(true);
    setShowEditDialog(false);
  };

  const handleSaveClick = () => {
    const formValues = getValues();

    const euDevice = Cookies.get("eu");

    const payload = {
      user_id: funcData.user_id,
      phone_number: formValues.phone_number,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      role: formValues.role,
      status: formValues.status,
      eu_device: euDevice,
    };

    dispatch(
      editUser({
        url: funcData.url,
        method: "POST",
        data: payload,
      })
    );
  };

  const handleDeleteClick = () => {
    const euDevice = Cookies.get("eu");

    const payload = {
      user_id: funcData.user_id,
      eu_device: euDevice,
    };

    dispatch(
      deleteUser({
        url: funcData.url,
        method: funcData.method,
        data: payload,
      })
    );
  };

  const handleVoidClick = (values) => {
    console.log(values.payload_value);

    const payload = {
      payment_id: values.payment_id,
      user_id: values.user_id,
      purchase_group_id: values.purchase_group_id,
      status: values.status,
      eu_device: Cookies.get("eu"),
    };

    dispatch(
      voidPaid({
        url: values.url,
        method: values.method,
        data: payload,
      })
    );
  };

  const errorMessages = {
    password: errorMessage?.message?.password,
  };

  return (
    <>
      {row?.original?.actions?.map((btn, index) => (
        <Button size="sm" key={index} onClick={() => handleVoidClick(btn)}>
          {btn?.button_name}
        </Button>
      ))}
    </>
  );
}

export function RowReturnOrderAction<
  TData
>({}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem className="flex items-center justify-between">
          Delete
          <TrashIcon className="w-4 h-4" color="red" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RowHandoverAction<TData>({}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Assign Delivery</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RowShippingAction<TData>({}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RowFailedDeliverAction<
  TData
>({}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
        <DropdownMenuItem>Retry Order</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RowCancelledDeliverAction<
  TData
>({}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function RowPackOrdersAction<
  TData
>({}: DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex p-0 data-[state=open]:bg-muted">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Packed</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
