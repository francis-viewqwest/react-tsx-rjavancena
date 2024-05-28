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
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { ProductInventory } from "@/interface/InterfaceType";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DialogClose, DialogPortal } from "@radix-ui/react-dialog";
import _ from "lodash";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { updateInventoryParent } from "@/app/slice/inventorySlice";
import Cookies from "js-cookie";

interface InventoryListProps {
  dataInventory: {
    result: {
      data: ProductInventory[];
    };
  };
}

const InventoryList: React.FC<InventoryListProps> = ({ dataInventory }) => {
  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const dispatch = useDispatch();

  const { control, handleSubmit, getValues, setValue, register } = useForm({});

  const handleEdit = (values) => {
    console.log(values);
    setFuncData(values)

    values.details.forEach((val) => {
      const fieldName = _.replace(_.lowerCase(val.label), " ", "_");
      setValue(fieldName, val.value);
    });

    setModalData(values);
  };

  const handleSaveClick = () => {
    const formValues = getValues();
    const euDevice = Cookies.get("eu");

    const payload = {
      items: [
        {
          inventory_id: funcData.inventory_id,
          name: formValues.product_name,
          category: formValues.product_category,
          eu_device: euDevice,
        },
      ],
    };

    dispatch(
      updateInventoryParent({
        url: funcData.url,
        method: "POST",
        data: payload,
      })
    );
  };

  return (
    <>
      {dataInventory.map((item, index) => (
        <Card
          key={index}
          className="md:flex md:items-center md:justify-between px-4"
        >
          <Link
            className="w-full md:flex md:items-center md:justify-between px-4"
            // to="/app/product-list"
            to={item.view[0].url}
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
                  <Label className="font-medium text-xs">{item.category}</Label>
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
                    <DropdownMenuItem>
                      <DialogTrigger
                        className="flex items-center w-full justify-between"
                        onClick={() => handleEdit(act)}
                      >
                        {act.button_name}
                        <DropdownMenuShortcut>
                          <Pencil1Icon className="w-4 h-4" />
                        </DropdownMenuShortcut>
                      </DialogTrigger>
                    </DropdownMenuItem>
                  </>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DialogPortal>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit product details</DialogTitle>
                  <DialogDescription>
                    Make changes to your product details here. Click save when
                    you're done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid grid-rows-auto gap-5 py-4">
                  {modalData?.details?.map((detail) => (
                    <div className="grid grid-cols-2 items-center gap-4">
                      <Label htmlFor="name">{detail.label}</Label>
                      <Input
                        id="name"
                        type="text"
                        {...register(
                          _.replace(_.lowerCase(detail.label), " ", "_")
                        )}
                        className="col-span-3"
                      />
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
            </DialogPortal>
          </Dialog>
        </Card>
      ))}
    </>
  );
};

export default InventoryList;
