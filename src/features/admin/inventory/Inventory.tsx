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
  inventoryData,
  createInventoryData,
  inventoryStatus,
  createInventoryStatus,
  getInventoryData,
} from "@/app/slice/inventorySlice";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import Cookies from "js-cookie";

const Inventory: React.FC = () => {
  const inventoryResData: any[] = useSelector(inventoryData);
  const inventoryResStatus: string = useSelector(inventoryStatus);
  const [dataInventory, setDataInventory] = useState<any[]>([]);

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
    console.log(inventoryResData);
    switch (inventoryResStatus) {
      case "pending":
        break;
      case "fulfilled":
        // dispatch(getInventoryData());
        setDataInventory(inventoryResData?.data?.inventory);
        break;
      case "rejected":
        alert("Rejected");
        break;
      default:
        break;
    }

  }, [inventoryResStatus]);

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
                  <div className="flex flex-col gap-8 py-4">
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="name" className="text-left">
                        Product Name
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter product name"
                        {...register("productName", {
                          required: {
                            value: true,
                            message: "Product name is required",
                          },
                        })}
                      />
                    </div>
                    <div className="flex flex-col gap-3">
                      <Label htmlFor="name" className="text-left">
                        Product Category
                      </Label>
                      <Input
                        id="name"
                        placeholder="Enter product category"
                        {...register("productCategory", {
                          required: {
                            value: true,
                            message: "Product category is required",
                          },
                        })}
                      />
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
