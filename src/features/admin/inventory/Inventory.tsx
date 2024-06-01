import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InventoryList from "./components/InventoryList";

import {
  getInventoryData,
  loadingStatus,
  inventoryData,
  createInventoryData,
  inventoryStatus,
  inventoryError,
} from "@/app/slice/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@radix-ui/react-toast";

const Inventory: React.FC = ({ props }) => {
  const inventoryResData: any[] = useSelector(inventoryData);
  const inventoryResStatus: string = useSelector(inventoryStatus);
  const inventoryErrorMess: string = useSelector(inventoryError);
  const [dataInventory, setDataInventory] = useState<any[]>([]);
  const inventoryLoading = useSelector(loadingStatus);

  const { toast } = useToast();

  const dispatch = useDispatch();

  interface CreateProduct {
    productName: string;
    productCategory: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<CreateProduct>();

  const onSubmit: SubmitHandler<CreateProduct> = (data, invBtn) => {
    const euDevice = Cookies.get("eu");

    const payload = {
      items: [
        {
          name: data.productName,
          category: data.productCategory,
          eu_device: euDevice,
        },
      ],
    };

    dispatch(
      createInventoryData({
        url: invBtn?.url,
        method: invBtn.method,
        data: payload,
      })
    );
  };

  const handleFormSubmit = (invBtn) => (data) => {
    onSubmit(data, invBtn);
  };

  useEffect(() => {
    //* GET INVENTORY DATA
    if (inventoryLoading === "getInventoryData/success") {
      setDataInventory(inventoryResData?.data?.inventory);
    }

    if (inventoryLoading === "getInventoryData/failed") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    //* CREATE INVENTORY DATA
    if (inventoryLoading === "createInventoryParent/success") {
      dispatch(getInventoryData({ url: props.routeData.path_key }));
      toast({
        title: inventoryResData.message,
      });
    }

    if (inventoryLoading === "createInventoryParent/failed") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }

    //* UPDATE INVENTORY DATA
    if (inventoryLoading === "updateInventoryParent/success") {
      toast({ title: inventoryResData.message });
      dispatch(getInventoryData({ url: props.routeData.path_key }));
    }

    //* DELETE INVENTORY DATA
    if (inventoryLoading === "deleteInventoryData/success") {
      toast({ title: inventoryResData.message });
      dispatch(getInventoryData({ url: props.routeData.path_key }));
    }

    if (inventoryLoading === "deleteInventoryData/failed") {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    }
  }, [inventoryLoading, toast]);

  return (
    <>
      <div className="flex flex-col gap-6 md:flex-row lg:items-center justify-between">
        <div className="flex flex-col md:flex-row lg:items-center gap-4">
          <Input className="w-96" type="text" placeholder="Search Product" />
          <Select>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Hardware</SelectItem>
              <SelectItem value="dark">Power Tools</SelectItem>
              <SelectItem value="system">Paints</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {Array.isArray(inventoryResData.data?.buttons) &&
          inventoryResData.data.buttons.map((invBtn, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Button size="sm" className="w-32">
                  {invBtn.button_name}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(handleFormSubmit(invBtn))}>
                  <DialogHeader>
                    <DialogTitle>Create New Product</DialogTitle>
                    <DialogDescription>
                      Fill out the following details to bring your new product.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex flex-col gap-5 py-4">
                    <div className="flex flex-col gap-2">
                      <Label className="text-left font-medium">
                        Product Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        {...register("productName", {
                          // required: {
                          //   value: true,
                          //   message: "Product name is required",
                          // },
                        })}
                      />
                      <Label className="text-red-500">
                        {inventoryErrorMess?.name}
                      </Label>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="name" className="text-left font-medium">
                        Product Category
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter product category"
                        {...register("productCategory", {
                          // required: {
                          //   value: true,
                          //   message: "Product category is required",
                          // },
                        })}
                      />
                      <Label className="text-red-500">
                        {inventoryErrorMess?.category}
                      </Label>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Save changes</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          ))}
      </div>

      <div className="flex flex-col gap-4 py-4">
        {inventoryResData && <InventoryList dataInventory={dataInventory} />}
      </div>
    </>
  );
};

export default Inventory;
