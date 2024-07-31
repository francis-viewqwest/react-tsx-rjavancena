import { DotsHorizontalIcon, TrashIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import phFlag from "@/assets/images/phflag.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { IconReload } from "@tabler/icons-react";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { useEffect, useRef, useState } from "react";
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
  editUserInfo,
} from "@/app/slice/usersManagementSlice";
import { voidPaid } from "@/app/slice/dashboardSlice";
import { voidPaidCustomer } from "@/app/slice/customerSlice";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import useAxiosClient from "@/axios-client";
import axios from "axios";
import { Separator } from "@/components/ui/separator";

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
  const updateChildLoading = useAppSelector(
    (state) => state.inventory.updateChildLoading
  );

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

  useEffect(() => {
    modalData?.details?.forEach((detail) => {
      if (detail.type === "file") {
        console.log(detail.type);
        setValue(detail.label.replace(/\s+/g, "_").toLowerCase(), detail.value);
      }
    });
  }, [modalData, setValue]);

  const handleSaveClick = () => {
    const formValues = getValues();

    const euDevice = Cookies.get("eu");

    console.log(formValues);

    const payload = {
      inventory_product_id: funcData?.inventory_product_id,
      inventory_id: funcData?.inventory_id,
      item_code: formValues?.item_code,
      name: formValues?.product_name,
      image: formValues?.image?.[0] ?? null,
      retail_price: formValues?.retail_price,
      discounted_price: formValues?.discounted_price,
      unit_supplier_price: formValues?.unit_supplier_price,
      refundable: formValues?.refundable,
      supplier_name: formValues?.supplier_name,
      stocks: formValues?.stocks,
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
            <DialogHeader className="sm:px-5">
              <DialogTitle>Edit product details</DialogTitle>
              <DialogDescription>
                Make changes to your product details here. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="h-72 w-full">
              <div className="grid gap-3">
                {modalData?.details?.map((detail: any) => {
                  return (
                    <>
                      <div className="grid items-center gap-2 px-2 sm:px-5 w-full">
                        {detail.type === "input" && (
                          <>
                            <Label className="font-semibold text-xs">
                              {detail?.label}
                            </Label>
                            <>
                              <Input
                                type="text"
                                {...register(
                                  detail.label
                                    .replace(/\s+/g, "_")
                                    .toLowerCase()
                                )}
                                className="col-span-4"
                              />
                              <small className="text-red-500 w-full col-span-3">
                                {errorMessages &&
                                  errorMessages[
                                    _.replace(
                                      _.lowerCase(detail.label),
                                      " ",
                                      "_"
                                    )
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
                                  detail.label
                                    .replace(/\s+/g, "_")
                                    .toLowerCase(),
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
            </ScrollArea>
            <DialogFooter>
              <Button
                className="bg-bgrjavancena"
                type="submit"
                disabled={updateChildLoading}
                onClick={() => handleSaveClick()}
              >
                {updateChildLoading && (
                  <span className="flex items-center gap-1">
                    Saving...
                    <IconReload className="animate-spin" size={16} />
                  </span>
                )}
                {!updateChildLoading && "Save changes"}
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
  const editUserInfoError = useAppSelector(
    (state) => state.usersManagement.editUserInfoError
  );

  console.log(errorMessage?.message);

  const axiosClient = useAxiosClient();

  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const dispatch = useDispatch();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showEditInfoDialog, setShowEditInfoDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const imageInputRef = useRef<HTMLInputElement | null>(null);
  const [locationsData, setLocationsData] = useState({
    regions: [],
    provinces: [],
    cities: [],
    barangays: [],
  });
  const loadingEditUser = useAppSelector(
    (state) => state.usersManagement.loadingEditUser
  );
  const loadingEditUserInfo = useAppSelector(
    (state) => state.usersManagement.loadingEditUserInfo
  );
  const [getLocationCode, setGetLocationCode] = useState({});

  console.log(getLocationCode);

  const editUserError = useAppSelector(
    (state) => state.usersManagement.editUserError
  );

  console.log(editUserError);

  console.log(locationsData);

  const handleEdit = (values: any) => {
    console.log(values);
    setFuncData(values);

    values.details.forEach((val) => {
      const fieldName = val.label.replace(/\s+/g, "_").toLowerCase();
      setValue(fieldName, val.value);
    });

    setModalData(values);
    setShowEditDialog(true);
    setShowEditInfoDialog(false);
    setShowRemoveDialog(false);
  };

  const onChangeSelect = (type: any, values: any) => {
    console.log(values.code);
    setGetLocationCode((prevState) => ({
      ...prevState,
      [`${type.replace(/\s+/g, "_").toLowerCase()}`]: values.name,
    }));
  };

  const handleEditInfo = (values: any) => {
    console.log(values);
    setFuncData(values);

    values.details.forEach((val: any) => {
      const fieldName = val.label.replace(/\s+/g, "_").toLowerCase();
      setValue(fieldName, val.value);
    });

    setModalData(values);
    setShowEditDialog(false);
    setShowEditInfoDialog(true);
    setShowRemoveDialog(false);

    axios
      .get("https://psgc.gitlab.io/api/regions/", {
        headers: {
          Authorization: undefined,
        },
      })
      .then((res) =>
        setLocationsData((prevState) => ({ ...prevState, regions: res.data }))
      );
  };

  const formValues = watch();
  console.log(formValues);

  const { region_name, province_name, city_or_municipality_name } = formValues;

  useEffect(() => {
    if (region_name) {
      axios
        .get(`https://psgc.gitlab.io/api/regions/${region_name}/provinces/`, {
          headers: {
            Authorization: undefined,
          },
        })
        .then((res) =>
          setLocationsData((prevState) => ({
            ...prevState,
            provinces: res.data,
          }))
        );
    }
  }, [region_name]);

  useEffect(() => {
    if (province_name) {
      axios
        .get(
          `https://psgc.gitlab.io/api/provinces/${province_name}/cities-municipalities/`,
          {
            headers: {
              Authorization: undefined,
            },
          }
        )
        .then((res) =>
          setLocationsData((prevState) => ({
            ...prevState,
            cities: res.data,
          }))
        );
    }
  }, [province_name]);

  useEffect(() => {
    if (city_or_municipality_name) {
      axios
        .get(
          `https://psgc.gitlab.io/api/cities-municipalities/${city_or_municipality_name}/barangays/`,
          {
            headers: {
              Authorization: undefined,
            },
          }
        )
        .then((res) =>
          setLocationsData((prevState) => ({
            ...prevState,
            barangays: res.data,
          }))
        );
    }
  }, [city_or_municipality_name]);

  const handleRemove = (values: any) => {
    console.log(values);
    setFuncData(values);
    setModalData(values);
    setShowRemoveDialog(true);
    setShowEditDialog(false);
    setShowEditInfoDialog(false);
  };

  const handleSaveClick = () => {
    const formValues = getValues();

    console.log(formValues);

    const payload = {
      user_id: funcData.user_id,
      email: formValues.email,
      password: formValues.password,
      password_confirmation: formValues.password_confirmation,
      role: formValues.role,
      status: formValues.status,
      eu_device: Cookies.get("eu"),
    };

    console.log(payload);

    dispatch(
      editUser({
        url: funcData.url,
        method: "POST",
        data: payload,
      })
    );
  };

  const handleSaveUserInfo = (values) => {
    const formValues = getValues();

    console.log(formValues);

    const regionName =
      values.details.find((detail: any) => detail.label === "Region Name")
        ?.value_name || getLocationCode.region_name;
    const barangayName =
      values.details.find((detail: any) => detail.label === "Barangay Name")
        ?.value_name || getLocationCode.barangay_name;
    const citiesName =
      values.details.find(
        (detail: any) => detail.label === "City Or Municipality Name"
      )?.value_name || getLocationCode.city_or_municipality_name;
    const provinceName =
      values.details.find((detail: any) => detail.label === "Province Name")
        ?.value_name || getLocationCode.province_name;

    console.log(regionName);

    const payload = {
      user_id: funcData.user_id,
      image: formValues?.image?.[0] ?? null,
      first_name: formValues.first_name,
      middle_name: formValues.middle_name,
      last_name: formValues.last_name,
      contact_number: formValues.contact_number,
      contact_email: formValues.contact_email,
      address_1: formValues.address_1,
      address_2: formValues.address_2,
      phone_number: formValues.phone_number,
      region_code: formValues.region_name,
      province_code: formValues.province_name,
      city_or_municipality_code: formValues.city_or_municipality_name,
      barangay_code: formValues.barangay_name,
      barangay_name: barangayName,
      city_or_municipality_name: citiesName,
      province_name: provinceName,
      region_name: regionName,
      eu_device: Cookies.get("eu"),
    };

    console.log(payload);

    dispatch(
      editUserInfo({
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
              {act.button_name === "Edit account" && (
                <DropdownMenuItem>
                  <DialogTrigger
                    className="flex items-center w-full justify-between"
                    onClick={() => handleEdit(act)}
                  >
                    Account
                    <DropdownMenuShortcut>
                      <Icon fontSize={16} icon={act.icon} />
                    </DropdownMenuShortcut>
                  </DialogTrigger>
                </DropdownMenuItem>
              )}

              {act.button_name === "Edit user information" && (
                <DropdownMenuItem>
                  <DialogTrigger
                    className="flex items-center w-full justify-between"
                    onClick={() => handleEditInfo(act)}
                  >
                    Info
                    <DropdownMenuShortcut>
                      <Icon fontSize={16} icon={act.icon} />
                    </DropdownMenuShortcut>
                  </DialogTrigger>
                </DropdownMenuItem>
              )}

              {act.button_name === "Delete" && (
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
            <ScrollArea className="h-72 w-full">
              <div className="grid gap-3 ">
                {modalData?.details?.map((detail: any) => {
                  return (
                    <>
                      <div className="grid items-center gap-2 px-2 sm:px-5 w-full">
                        {detail.type !== "select" && (
                          <>
                            <Label className="font-semibold text-xs">
                              {detail?.label}
                            </Label>
                            <>
                              <Input
                                type={detail.type}
                                {...register(
                                  detail.label
                                    .replace(/\s+/g, "_")
                                    .toLowerCase()
                                )}
                                className="col-span-4"
                              />
                              <small className="text-red-500 w-full col-span-3">
                                {errorMessage?.message &&
                                  errorMessage?.message[
                                    _.replace(
                                      _.lowerCase(detail.label),
                                      " ",
                                      "_"
                                    )
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
                                  detail.label
                                    .replace(/\s+/g, "_")
                                    .toLowerCase(),
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
                                  {detail?.option?.map((opt: any) => (
                                    <SelectItem
                                      key={opt.value}
                                      value={opt.value}
                                    >
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
            </ScrollArea>
            <DialogFooter>
              <Button
                className="bg-bgrjavancena"
                type="submit"
                disabled={loadingEditUser}
                onClick={() => handleSaveClick()}
              >
                {loadingEditUser && (
                  <span className="flex items-center gap-1">
                    Saving...
                    <IconReload className="animate-spin" size={16} />
                  </span>
                )}
                {!loadingEditUser && "  Save changes"}
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Close
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        )}

        {showEditInfoDialog && (
          <DialogContent className="sm:max-w-[34rem]">
            <DialogHeader>
              <DialogTitle>Edit user information</DialogTitle>
              <DialogDescription>
                Edit user account details below. Update information and click
                save to apply changes.
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="h-72 w-full">
              <div>
                {modalData?.details?.map((detail: any) => {
                  return (
                    <>
                      <div className="grid grid-cols gap-10 px-2 sm:px-5  w-full">
                        {detail.type === "file" && (
                          <div className="grid gap-2 py-3">
                            <Label className="font-semibold text-xs">
                              {detail?.label}
                            </Label>
                            <>
                              <Input
                                type={detail.type}
                                {...register(
                                  detail.label
                                    .replace(/\s+/g, "_")
                                    .toLowerCase()
                                )}
                                className="w-full"
                              />
                              <small className="text-red-500 w-full">
                                {errorMessage?.message &&
                                  errorMessage?.message[
                                    _.replace(
                                      _.lowerCase(detail.label),
                                      " ",
                                      "_"
                                    )
                                  ]}
                              </small>
                            </>
                          </div>
                        )}
                        {detail.type === "input" && (
                          <div className="grid gap-2 py-3">
                            <Label className="w-full font-semibold text-xs">
                              {detail?.label}
                            </Label>

                            <Input
                              type={detail.type}
                              {...register(
                                detail.label.replace(/\s+/g, "_").toLowerCase()
                              )}
                              className="w-full"
                            />
                            <small className="text-red-500 w-full">
                              {errorMessage?.message &&
                                errorMessage?.message[
                                  _.replace(_.lowerCase(detail.label), " ", "_")
                                ]}
                            </small>
                          </div>
                        )}

                        {detail.type === "number" && (
                          <div className="grid gap-2 py-3 relative">
                            <Label className="w-full font-semibold text-xs">
                              {detail?.label}
                            </Label>
                            <div className="flex items-center relative z-10">
                              <img
                                className="w-5 absolute right-4"
                                src={phFlag}
                                alt=""
                              />
                              <span className="absolute right-10 text-xs">
                                +63
                              </span>
                              <Input
                                maxLength={10}
                                {...register(
                                  detail.label
                                    .replace(/\s+/g, "_")
                                    .toLowerCase()
                                )}
                                className="w-full"
                              />
                            </div>
                            <small className="text-red-500 w-full">
                              {errorMessage?.message &&
                                errorMessage?.message[
                                  _.replace(_.lowerCase(detail.label), " ", "_")
                                ]}
                            </small>
                          </div>
                        )}

                        {detail.type === "email" && (
                          <div className="grid gap-2 py-3">
                            <Label className="w-full font-semibold text-xs">
                              {detail?.label}
                            </Label>

                            <Input
                              type={detail.type}
                              {...register(
                                detail.label.replace(/\s+/g, "_").toLowerCase()
                              )}
                              className="w-full"
                            />
                            <small className="text-red-500 w-full">
                              {errorMessage?.message &&
                                errorMessage?.message[
                                  _.replace(_.lowerCase(detail.label), " ", "_")
                                ]}
                            </small>
                          </div>
                        )}

                        {detail.type === "select" &&
                          detail.label === "Region Name" && (
                            <div className="flex flex-col gap-2 py-3">
                              <Label
                                className="font-semibold text-xs"
                                htmlFor={detail.label}
                              >
                                {detail.label}
                              </Label>
                              <Select
                                onValueChange={(value) => {
                                  const selected = locationsData.regions.find(
                                    (region: any) => region.code === value
                                  );
                                  setValue(
                                    detail.label
                                      .replace(/\s+/g, "_")
                                      .toLowerCase(),
                                    value
                                  );
                                  onChangeSelect(detail.label, selected);
                                }}
                                // defaultValue={setValue(
                                //   detail.label
                                //     .replace(/\s+/g, "_")
                                //     .toLowerCase(),
                                //   detail.value_name
                                // )}
                              >
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      detail.value_name || "Select a region"
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Region</SelectLabel>
                                    {Array.isArray(locationsData.regions) &&
                                      locationsData.regions.map(
                                        (region: any) => (
                                          <SelectItem
                                            key={region.code}
                                            value={region.code}
                                          >
                                            {region.regionName}
                                          </SelectItem>
                                        )
                                      )}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <small className="text-red-500 ">
                                {editUserInfoError?.message &&
                                  editUserInfoError?.message["region_name"]}
                              </small>
                            </div>
                          )}

                        {detail.type === "select" &&
                          detail.label === "Province Name" && (
                            <div className="flex flex-col gap-2 py-3">
                              <Label
                                className="font-semibold text-xs"
                                htmlFor={detail.label}
                              >
                                {detail.label}
                              </Label>
                              <Select
                                onValueChange={(value) => {
                                  const selected =
                                    locationsData?.provinces.find(
                                      (province: any) => province.code === value
                                    );
                                  setValue(
                                    detail.label
                                      .replace(/\s+/g, "_")
                                      .toLowerCase(),
                                    value
                                  );
                                  onChangeSelect(detail.label, selected);
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      detail.value_name || "Select a province"
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Province</SelectLabel>
                                    {Array.isArray(locationsData.provinces) &&
                                      locationsData.provinces.map(
                                        (prov: any) => (
                                          <SelectItem
                                            key={prov.code}
                                            value={prov.code}
                                          >
                                            {prov.name}
                                          </SelectItem>
                                        )
                                      )}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <small className="text-red-500">
                                {editUserInfoError?.message &&
                                  editUserInfoError?.message["province_name"]}
                              </small>
                            </div>
                          )}

                        {detail.type === "select" &&
                          detail.label === "City Or Municipality Name" && (
                            <div className="flex flex-col gap-2 py-3">
                              <Label
                                className="font-semibold text-xs"
                                htmlFor={detail.label}
                              >
                                {detail.label}
                              </Label>
                              <Select
                                onValueChange={(value) => {
                                  const selected = locationsData.cities.find(
                                    (municipal: any) => municipal.code === value
                                  );
                                  setValue(
                                    detail.label
                                      .replace(/\s+/g, "_")
                                      .toLowerCase(),
                                    value
                                  );
                                  onChangeSelect(detail.label, selected);
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      detail.value_name ||
                                      "Select a City/Municipalities"
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      City/Municipalities
                                    </SelectLabel>
                                    {Array.isArray(locationsData.cities) &&
                                      locationsData.cities.map((mun: any) => (
                                        <SelectItem
                                          key={mun.code}
                                          value={mun.code}
                                        >
                                          {mun.name}
                                        </SelectItem>
                                      ))}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <small className="text-red-500">
                                {editUserInfoError?.message &&
                                  editUserInfoError?.message[
                                    "city_or_municipality_name"
                                  ]}
                              </small>
                            </div>
                          )}

                        {detail.type === "select" &&
                          detail.label === "Barangay Name" && (
                            <div className="flex flex-col gap-2 py-3">
                              <Label
                                className="font-semibold text-xs"
                                htmlFor={detail.label}
                              >
                                {detail.label}
                              </Label>
                              <Select
                                onValueChange={(value) => {
                                  const selected = locationsData.barangays.find(
                                    (brgy: any) => brgy.code === value
                                  );
                                  setValue(
                                    detail.label
                                      .replace(/\s+/g, "_")
                                      .toLowerCase(),
                                    value
                                  );
                                  onChangeSelect(detail.label, selected);
                                }}
                              >
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      detail.value_name || "Select a barangay"
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>
                                      City/Municipalities
                                    </SelectLabel>
                                    {Array.isArray(locationsData.barangays) &&
                                      locationsData.barangays.map(
                                        (mun: any) => (
                                          <SelectItem
                                            key={mun.code}
                                            value={mun.code}
                                          >
                                            {mun.name}
                                          </SelectItem>
                                        )
                                      )}
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                              <small className="text-red-500">
                                {editUserInfoError?.message &&
                                  editUserInfoError?.message["barangay_name"]}
                              </small>
                            </div>
                          )}
                      </div>
                    </>
                  );
                })}
              </div>
            </ScrollArea>
            <DialogFooter>
              <Button
                className="bg-bgrjavancena"
                type="submit"
                disabled={loadingEditUserInfo}
                onClick={() => handleSaveUserInfo(modalData)}
              >
                {loadingEditUserInfo && (
                  <span className="flex items-center gap-1">
                    Saving...
                    <IconReload className="animate-spin" size={16} />
                  </span>
                )}
                {!loadingEditUserInfo && "  Save changes"}
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
  const errorMessage = useSelector(usersError);

  console.log(errorMessage?.message);

  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const dispatch = useAppDispatch();
  const [showVoidDialog, setShowVoidDialog] = useState(false);
  const [showViewTransacDialog, setShowViewTransacDialog] = useState(false);

  const voidLoading = useAppSelector((state) => state.dashboard.voidLoading);

  const handleActionFunc = (values: any) => {
    console.log(values);

    const buttonName = values.button_name;
    console.log(buttonName);

    switch (buttonName) {
      case "Void":
        setShowVoidDialog(true);
        setShowViewTransacDialog(false);
        setFuncData(values);
        setModalData(values);
        break;

      case "View":
        console.log(values);

        setShowViewTransacDialog(true);
        setFuncData(values);
        setModalData(values);
        break;

      default:
        break;
    }
  };

  const formatted = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  const handleVoidClick = (values: any) => {
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

  return (
    <>
      {row?.original?.actions && (
        <Dialog>
          {/* <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost">
                <DotsHorizontalIcon className="hidden md:block h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-full">
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {row?.original?.actions?.map((act, index) => (
                <DropdownMenuItem>
                  <DialogTrigger
                    className="flex items-center w-full justify-between"
                    onClick={() => handleActionFunc(act)}
                  >
                    {act.button_name}
                    <DropdownMenuShortcut>
                      <Icon fontSize={16} icon={act.icon} />
                    </DropdownMenuShortcut>
                  </DialogTrigger>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu> */}

          {row?.original?.actions?.map((act, index) => (
            <DialogTrigger onClick={() => handleActionFunc(act)}>
              {act.button_name === "Void" ? (
                <Button
                  className="mx-1 bg-primary"
                  onClick={() => handleActionFunc(act)}
                  size="xs"
                >
                  {act.button_name}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => handleActionFunc(act)}
                    variant="outline"
                    className="mx-1"
                    size="xs"
                  >
                    {act.button_name}
                  </Button>
                </>
              )}
            </DialogTrigger>
          ))}
          <DialogPortal>
            {showVoidDialog && (
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Void Transaction(s) </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to void the transaction(s)?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    type="submit"
                    disabled={voidLoading}
                    onClick={() => handleVoidClick(funcData)}
                  >
                    {voidLoading && (
                      <span className="flex items-center gap-1">
                        Voiding...
                        <IconReload className="animate-spin" size={16} />
                      </span>
                    )}
                    {!voidLoading && "Void"}
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            )}
            {showViewTransacDialog && (
              <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="px-5">
                    Details transaction:{" "}
                    <span className="font-normal">
                      {_.startCase(row?.original?.user_id)}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-72 w-full px-5">
                  {modalData?.details.map((detail) => (
                    <div>
                      <p className="text-neutral-500">
                        Total items:{" "}
                        {detail.items.reduce(
                          (acc, item) => acc + item.count,
                          0
                        )}
                      </p>
                      {detail?.items.map((item) => (
                        <div className="w-full">
                          <Card className="flex items-center p-0 m-0 my-4">
                            <CardHeader className="p-2">
                              <CardTitle>
                                {_.isEmpty(item.img) ? (
                                  <Skeleton className="h-12 w-12 bg-neutral-200 rounded-md" />
                                ) : (
                                  <img
                                    className="h-11 w-11 bg-cover bg-no-repeat"
                                    src={item.img}
                                    alt=""
                                  />
                                )}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-5 gap-4 items-center w-full p-2">
                              <div className="w-full">
                                <Label className="text-xs">Serial number</Label>
                                <h1
                                  className="text-xs text-neutral-500"
                                  title={item.item_code}
                                >
                                  {item.item_code}
                                </h1>
                              </div>
                              <div className="w-full">
                                <Label className="text-xs">Category</Label>
                                <h1
                                  className="text-xs text-neutral-500"
                                  title={item.category}
                                >
                                  {item.category}
                                </h1>
                              </div>
                              <div className="w-full">
                                <Label className="text-xs">Product</Label>
                                <h1
                                  className="text-xs text-neutral-500"
                                  title={item.name}
                                >
                                  {_.truncate(item.name, {
                                    length: 27,
                                    separator: "...",
                                  })}
                                </h1>
                              </div>
                              <div className="w-full">
                                <Label className="text-xs">Total price</Label>
                                <h1 className="text-xs text-neutral-500">
                                  {formatted.format(item.total_price)}
                                </h1>
                              </div>
                              <div className="w-full">
                                <Label className="text-xs">Qty</Label>
                                <h1 className="text-xs text-neutral-500">
                                  {item.count}
                                </h1>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ))}
                </ScrollArea>
                <DialogFooter>
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
      )}
    </>
  );
}

export function RowCustomerTransactionActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const errorMessage = useSelector(usersError);

  console.log(errorMessage?.message);

  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const dispatch = useAppDispatch();
  const [showVoidDialog, setShowVoidDialog] = useState(false);
  const [showViewTransacDialog, setShowViewTransacDialog] = useState(false);

  const voidLoading = useAppSelector((state) => state.customer.voidLoading);

  console.log(voidLoading);

  const handleActionFunc = (values: any) => {
    console.log(values);

    const buttonName = values.button_name;
    console.log(buttonName);

    switch (buttonName) {
      case "Void":
        setShowVoidDialog(true);
        setShowViewTransacDialog(false);
        setFuncData(values);
        setModalData(values);
        break;

      case "View":
        console.log(values);

        setShowViewTransacDialog(true);
        setFuncData(values);
        setModalData(values);
        break;

      default:
        break;
    }
  };

  const formatted = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  const handleVoidClick = (values: any) => {
    const payload = {
      payment_id: values.payment_id,
      user_id: values.user_id,
      purchase_group_id: values.purchase_group_id,
      status: values.status,
      eu_device: Cookies.get("eu"),
    };

    dispatch(
      voidPaidCustomer({
        url: values.url,
        method: values.method,
        data: payload,
      })
    );
  };

  return (
    <>
      {row?.original?.actions && (
        <Dialog>
          {row?.original?.actions?.map((act, index) => (
            <DialogTrigger onClick={() => handleActionFunc(act)}>
              {act.button_name === "Void" ? (
                <Button
                  className="mx-1 bg-primary"
                  onClick={() => handleActionFunc(act)}
                  size="xs"
                >
                  {act.button_name}
                </Button>
              ) : (
                <>
                  <Button
                    onClick={() => handleActionFunc(act)}
                    variant="outline"
                    className="mx-1"
                    size="xs"
                  >
                    {act.button_name}
                  </Button>
                </>
              )}
            </DialogTrigger>
          ))}
          <DialogPortal>
            {showVoidDialog && (
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Void Transaction(s) </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to void the transaction(s)?
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button
                    variant="destructive"
                    type="submit"
                    disabled={voidLoading}
                    onClick={() => handleVoidClick(funcData)}
                  >
                    {voidLoading && (
                      <span className="flex items-center gap-1">
                        Voiding...
                        <IconReload className="animate-spin" size={16} />
                      </span>
                    )}
                    {!voidLoading && "Void"}
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Cancel
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            )}
            {showViewTransacDialog && (
              <DialogContent className="sm:max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="px-5">
                    Details transaction:{" "}
                    <span className="font-normal">
                      {_.startCase(row?.original?.user_id)}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-72 w-full px-5">
                  {modalData?.details.map((detail) => (
                    <div>
                      <p className="text-neutral-500">
                        Total items:{" "}
                        {detail.items.reduce(
                          (acc, item) => acc + item.count,
                          0
                        )}
                      </p>
                      {detail?.items.map((item) => (
                        <div className="w-full">
                          <Card className="flex items-center p-0 m-0 my-4">
                            <CardHeader className="p-2">
                              <CardTitle>
                                {_.isEmpty(item.img) ? (
                                  <Skeleton className="h-12 w-12 bg-neutral-200 rounded-md" />
                                ) : (
                                  <img
                                    className="h-11 w-11 bg-cover bg-no-repeat"
                                    src={item.img}
                                    alt=""
                                  />
                                )}
                              </CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-5 gap-4 items-center w-full p-2">
                              <div className="w-full">
                                <Label className="text-xs">Serial number</Label>
                                <h1
                                  className="text-xs text-neutral-500"
                                  title={item.item_code}
                                >
                                  {item.item_code}
                                </h1>
                              </div>
                              <div className="w-full">
                                <Label className="text-xs">Category</Label>
                                <h1
                                  className="text-xs text-neutral-500"
                                  title={item.category}
                                >
                                  {item.category}
                                </h1>
                              </div>
                              <div className="w-full">
                                <Label className="text-xs">Product</Label>
                                <h1
                                  className="text-xs text-neutral-500"
                                  title={item.name}
                                >
                                  {_.truncate(item.name, {
                                    length: 27,
                                    separator: "...",
                                  })}
                                </h1>
                              </div>
                              <div className="w-full">
                                <Label className="text-xs">Total price</Label>
                                <h1 className="text-xs text-neutral-500">
                                  {formatted.format(item.total_price)}
                                </h1>
                              </div>
                              <div className="w-full">
                                <Label className="text-xs">Qty</Label>
                                <h1 className="text-xs text-neutral-500">
                                  {item.count}
                                </h1>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      ))}
                    </div>
                  ))}
                </ScrollArea>
                <DialogFooter>
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
      )}
    </>
  );
}

export function RowLogsActions<TData>({
  row,
}: DataTableRowActionsProps<TData>) {
  const errorMessage = useSelector(usersError);

  console.log(row.original.action);

  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const dispatch = useAppDispatch();
  const [showDeviceLogs, setShowDeviceLogs] = useState(false);
  const [showLogsDialog, setShowLogsDialog] = useState(false);
  console.log(modalData?.user_device);

  let formattedData: string | JSX.Element[] | object = "No data availables";

  // if (
  //   Array.isArray(modalData?.user_action_details) &&
  //   modalData.user_action_details.length > 0
  // ) {
  //   const jsonString = modalData.user_action_details[0];

  //   const data = JSON.parse(jsonString);
  //   const { purchase, payment } = data?.fields || {};

  //   console.log("Is Payment an Array?:", Array.isArray(data?.fields?.payment));
  //   console.log(
  //     data?.fields?.payment && data?.fields?.payment?.map((item: any) => item)
  //   );

  //   if (!_.isUndefined(purchase) || !_.isUndefined(payment)) {
  //     formattedData = (
  //       <div>
  //         {purchase && (
  //           <>
  //             {purchase?.map((purchaseItem: any, index: number) => (
  //               <div key={`purchase-${index}`} className="mb-4 py-4">
  //                 <h3 className="font-medium text-lg mb-4">Purchase Details</h3>
  //                 {Object.entries(purchaseItem).map(([key, value]) => (
  //                   <div key={key} className="grid grid-cols-2 py-1">
  //                     <h1 className="text-sm">{_.startCase(key)}:</h1>
  //                     <p className="text-sm">{value ?? ""}</p>
  //                   </div>
  //                 ))}
  //               </div>
  //             ))}
  //           </>
  //         )}
  //         <Separator />
  //         {payment && (
  //           <>
  //             {payment.length > 0 &&
  //               payment?.map((paymentItem: any, index: number) => (
  //                 <div key={`payment-${index}`} className="mb-4 py-4">
  //                   <h3 className="font-medium text-lg mb-4">
  //                     Payment Details
  //                   </h3>
  //                   {Object.entries(paymentItem).map(([key, value]) => (
  //                     <div key={key} className="grid grid-cols-2 py-1">
  //                       <h1 className="text-sm">{_.startCase(key)}:</h1>
  //                       <p className="text-sm">{value ?? ""}</p>
  //                     </div>
  //                   ))}
  //                 </div>
  //               ))}
  //           </>
  //         )}
  //       </div>
  //     );
  //   } else {
  //     formattedData = "No purchase data available";
  //   }
  // }

  console.log(modalData?.user_action_details?.[0].fields);

  let getDataFields = modalData?.user_action_details?.[0]?.fields || {};

  console.log(getDataFields);

  const { purchase, payment } = getDataFields || {};

  if (!_.isUndefined(purchase) || !_.isUndefined(payment)) {
    formattedData = (
      <div>
        {purchase && (
          <>
            {purchase?.map((purchaseItem: any, index: number) => (
              <div key={`purchase-${index}`} className="mb-4 py-4">
                <h3 className="font-medium text-lg mb-4">Purchase Details:</h3>
                {Object.entries(purchaseItem).map(([key, value]) => (
                  <div key={key} className="grid grid-cols-2 py-1">
                    <h1 className="text-sm">{_.startCase(key)}:</h1>
                    <p className="text-sm">{value ?? ""}</p>
                  </div>
                ))}
              </div>
            ))}
          </>
        )}
        {payment && (
          <>
            {payment.length > 0 &&
              payment?.map((paymentItem: any, index: number) => (
                <div key={index} className="mb-4 py-4">
                  <h3 className="font-medium text-lg mb-4">Payment Details:</h3>
                  {Object.entries(paymentItem).map(([key, value]) => (
                    <div key={key} className="grid grid-cols-2 py-1">
                      <h1 className="text-sm">{_.startCase(key)}:</h1>
                      <p className="text-sm">{value ?? ""}</p>
                    </div>
                  ))}
                </div>
              ))}
          </>
        )}
      </div>
    );
  } else {
    formattedData = (
      <div className="mb-4 py-4">
        <h3 className="font-medium text-lg mb-4">Other Details</h3>
        {Object.entries(getDataFields).map(([key, value]) => (
          <div key={key} className="grid grid-cols-2 py-1">
            <h1 className="text-sm">{_.startCase(key)}:</h1>
            <p className="text-sm">{value ?? ""}</p>
          </div>
        ))}
      </div>
    );
  }

  // console.log(purchase);

  const handleActionFunc = (values: any) => {
    console.log(values);

    const buttonName = values.button_name;
    console.log(buttonName);

    switch (buttonName) {
      case "View details":
        setShowLogsDialog(true);
        setShowDeviceLogs(false);
        setFuncData(values);
        setModalData(values);
        break;

      case "View device":
        setShowLogsDialog(false);
        setShowDeviceLogs(true);
        setFuncData(values);
        setModalData(values);
        break;

      default:
        break;
    }
  };

  const formatted = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

  return (
    <>
      {row?.original?.action && (
        <Dialog>
          {row?.original?.action?.map((act, index) => (
            <DialogTrigger>
              {
                <Button
                  className="mx-1 bg-primary"
                  onClick={() => handleActionFunc(act)}
                  size="xs"
                >
                  {act.button_name}
                </Button>
              }
            </DialogTrigger>
          ))}
          <DialogPortal>
            {showLogsDialog && (
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="px-5">
                    Log Details:{" "}
                    <span className="font-normal">
                      {_.startCase(row?.original?.name)}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-72 w-full px-5">
                  {formattedData}
                </ScrollArea>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            )}
            {showDeviceLogs && (
              <DialogContent className="sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle className="px-5">
                    Log Details:{" "}
                    <span className="font-normal">
                      {_.startCase(row?.original?.name)}
                    </span>
                  </DialogTitle>
                </DialogHeader>
                <ScrollArea className="h-72 w-full px-5">
                  {modalData?.user_device?.map((detail: any) => (
                    <div className="w-full grid grid-cols-2">
                      <h1>{_.startCase(detail.label)}</h1>
                      <p className="text-sm">{detail.value}</p>
                    </div>
                  ))}
                </ScrollArea>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            )}
          </DialogPortal>
        </Dialog>
      )}
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
