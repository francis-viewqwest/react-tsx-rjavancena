import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import { IconCircleFilled } from "@tabler/icons-react";
import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { IconZoomExclamation } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { ProductInventory } from "@/interface/InterfaceType";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { DialogClose, DialogPortal } from "@radix-ui/react-dialog";
import _ from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInventoryParent,
  deleteInventoryData,
  inventoryError,
  loadingStatus,
} from "@/app/slice/inventorySlice";
import Cookies from "js-cookie";

interface InventoryListProps {
  dataInventory: {
    result: {
      data: ProductInventory[];
    };
  };
}

const InventoryList: React.FC<InventoryListProps> = ({ filteredData }) => {
  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const updateErrorMessage = useSelector(inventoryError);
  const dispatch = useDispatch();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const inventoryLoading = useSelector(loadingStatus);

  const { control, handleSubmit, getValues, setValue, register } = useForm({});

  useForm({
    defaultValues: {
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const handleEdit = (values: any) => {
    setFuncData(values);

    values.details.forEach((val) => {
      const fieldName = _.replace(_.lowerCase(val.label), " ", "_");
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

    const payload = {
      inventory_id: funcData.inventory_id,
      name: formValues.product_name,
      category: formValues.product_category,
      eu_device: euDevice,
    };

    dispatch(
      updateInventoryParent({
        url: funcData.url,
        method: "POST",
        data: payload,
      })
    );
  };

  const handleDeleteClick = () => {
    const euDevice = Cookies.get("eu");

    const payload = {
      inventory_id: funcData.inventory_id,
      eu_device: euDevice,
    };

    dispatch(
      deleteInventoryData({
        url: funcData.url,
        method: funcData.method,
        data: payload,
      })
    );
  };

  const errorMessages = {
    product_name: updateErrorMessage?.name,
    product_category: updateErrorMessage?.category,
  };

  const navigate = useNavigate();

  return (
    <>
      {inventoryLoading === "getInventoryData/loading" ? (
        <>
          <h1>loading</h1>
        </>
      ) : filteredData.length > 0 ? (
        filteredData.map((item, index) => (
          <Card
            key={index}
            className="md:flex md:items-center md:justify-between px-4"
          >
            <Link
              className="w-full md:flex md:items-center md:justify-between px-4"
              to={`/app/inventory/inventory-child/${item.view[0].url}`}
            >
              <div className="md:flex md:items-center">
                <Skeleton className="hidden bg-neutral-200 lg:block lg:h-20 lg:w-28 lg:rounded-xl" />
                <CardHeader className="w-full justify-start left-0 lg:flex lg:flex-col">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-md">{item.name}</CardTitle>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="lg:hidden">
                        <Button variant="ghost">
                          <DotsHorizontalIcon className="md:hidden md:h-5 md:w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Action</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          Edit
                          <DropdownMenuShortcut>
                            <Pencil1Icon className="w-4 h-4" />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          Remove
                          <DropdownMenuShortcut>
                            <TrashIcon className="w-4 h-4" color="red" />
                          </DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <CardDescription className="flex gap-3 items-center">
                    <Badge>{item.variant} Variants</Badge>
                    <Label className="font-medium text-xs">
                      {item.category}
                    </Label>
                    <div className="flex items-center gap-1">
                      <IconCircleFilled size="9" color="green" />
                      <Label className="text-xs font-medium">
                        Product Stocked: {item.stock}
                      </Label>
                    </div>
                  </CardDescription>
                </CardHeader>
              </div>
              <Separator
                className="hidden md:block lg:h-14 lg:w-1"
                orientation="vertical"
              />
              <CardContent className="flex justify-between gap-5 lg:gap-9">
                <div className="flex flex-col gap-3">
                  <h1 className="uppercase text-xs font-medium text-neutral-500">
                    Total Sells
                  </h1>
                  <Label className="text-sm font-semibold flex items-center">
                    <Icon fontSize={16} icon="tabler:currency-peso" />
                    <span>{item.total_sales}</span>
                  </Label>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="uppercase text-xs font-medium text-neutral-500">
                    Total Discounted
                  </h1>
                  <Label className="text-sm font-semibold">
                    {item.total_discounted}
                  </Label>
                </div>
                <div className="flex flex-col gap-3">
                  <h1 className="uppercase text-xs font-medium text-neutral-500">
                    Total Return
                  </h1>
                  <Label className="text-sm font-semibold">
                    {item.total_return}
                  </Label>
                </div>
              </CardContent>
            </Link>

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
                  {item.action.map((act) => (
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
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit product details</DialogTitle>
                      <DialogDescription>
                        Make changes to your product details here. Click save
                        when you're done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-rows-auto gap-7 py-2">
                      {modalData?.details?.map((detail: any) => (
                        <div className="grid grid-cols-2 items-center gap-2 w-full">
                          <Label className="font-medium">{detail.label}</Label>
                          <Input
                            type="text"
                            {...register(
                              _.replace(_.lowerCase(detail.label), " ", "_")
                            )}
                            className="col-span-3"
                          />
                          <Label className="text-red-500 w-full col-span-3">
                            {errorMessages &&
                              errorMessages[
                                _.replace(_.lowerCase(detail.label), " ", "_")
                              ]}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={() => handleSaveClick()}>
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
                            {index > 0 &&
                              modalData.details[index - 1].label ===
                                "Product Name" &&
                              " from "}
                            {detail.label === "Product Name" && (
                              <span>{detail.value}</span>
                            )}
                            {detail.label === "Product Category" && (
                              <span>{detail.value}</span>
                            )}
                          </>
                        ))}
                      </DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your product and remove it from your inventory.
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
          </Card>
        ))
      ) : (
        <div className="w-full flex pt-40 items-center justify-center">
          <h1 className="text-sm flex items-center gap-2 text-neutral-600">
            No products found. <IconZoomExclamation size={18} />
          </h1>
        </div>
      )}
      {/* <Outlet /> */}
    </>
  );
};

export default InventoryList;
