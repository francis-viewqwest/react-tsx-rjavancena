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
import { inventoryData, inventoryStatus } from "@/app/slice/inventorySlice";
import { useSelector } from "react-redux";

const Inventory: React.FC = () => {
  const inventoryResData: any[] = useSelector(inventoryData);
  const inventoryResStatus: string = useSelector(inventoryStatus);
  const [dataInventory, setDataInventory] = useState<any[]>(
    inventoryResData?.data?.inventory || []
  );

  useEffect(() => {
    console.log(inventoryResData);
    switch (inventoryResStatus) {
      case "pending":
        break;
      case "fulfilled":
        setDataInventory(inventoryResData.data.inventory);
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

        {/* {dataInventory.map((invBtn, index) => (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="w-32">
                Create Product
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Product</DialogTitle>
                <DialogDescription>
                  Fill out the following details to bring your new product.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Product Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter product name"
                    className="col-span-3"
                  />
                </div>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Category
                    </Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select product category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Hardware</SelectItem>
                        <SelectItem value="dark">Power Tools</SelectItem>
                        <SelectItem value="system">Paints</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        ))} */}
      </div>

      <div className="flex flex-col gap-4 py-4">
        {inventoryResData && <InventoryList dataInventory={dataInventory} />}
      </div>
    </>
  );
};

export default Inventory;
