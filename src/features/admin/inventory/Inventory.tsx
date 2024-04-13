import React from "react";
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

const Inventory: React.FC = () => {
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

        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="w-32">Create Product</Button>
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
      </div>

      <div className="flex flex-col gap-4 py-4">
        <InventoryList />
      </div>
    </>
  );
};

export default Inventory;
