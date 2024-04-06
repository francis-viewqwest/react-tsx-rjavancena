import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
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

import {
  DotsHorizontalIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Inventory: React.FC = () => {
  return (
    <>
      <div className="yflex yflex-col ygap-6 md:yflex-row lg:yitems-center yjustify-between">
        <div className="yflex yflex-col md:yflex-row lg:yitems-center ygap-4 md:yw-96">
          <Input type="text" placeholder="Search Product" />
          <Select>
            <SelectTrigger className="yw-36">
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
            <Button>Create Product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Product</DialogTitle>
              <DialogDescription>
                Fill out the following details to bring your new product.
              </DialogDescription>
            </DialogHeader>
            <div className="ygrid ygap-4 ypy-4">
              <div className="ygrid grid-cols-4 yitems-center ygap-4">
                <Label htmlFor="name" className="text-right">
                  Product Name
                </Label>
                <Input
                  id="name"
                  placeholder="Enter product name"
                  className="col-span-3"
                />
              </div>
              <div className="ygrid ygap-4 ypy-4">
                <div className="ygrid grid-cols-4 yitems-center ygap-4">
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

      <div className="yflex yflex-col ygap-4 ypy-4">
        <Link to="/app/product-list">
          <Card className="md:yflex md:yitems-center md:yjustify-between ypx-4">
            <div className="md:yflex md:yitems-center">
              <Skeleton className="hidden ybg-neutral-200 lg:yh-20 lg:yw-28 lg:yrounded-xl" />
              <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col">
                <div className="yflex yitems-center yjustify-between">
                  <CardTitle className="ytext-md">2B ACRYLON 4</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost">
                        <DotsHorizontalIcon className="md:yhidden md:yh-5 md:yw-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Edit
                        <DropdownMenuShortcut>
                          <Pencil1Icon className="yw-4 yh-4" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Remove
                        <DropdownMenuShortcut>
                          <TrashIcon className="yw-4 yh-4" color="red" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="yflex ygap-3 yitems-center">
                  <Badge>4 Variants</Badge>
                  <Label className="yfont-medium ytext-xs">Pain Tools</Label>
                  <div className="yflex yitems-center ygap-1">
                    <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                    <Label className="ytext-xs yfont-medium">
                      Product Stocked: 50
                    </Label>
                  </div>
                </CardDescription>
              </CardHeader>
            </div>
            <Separator
              className="hidden md:block lg:yh-14 lg:yw-1"
              orientation="vertical"
            />
            <CardContent className="yflex yjustify-between ygap-5 lg:ygap-9">
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Sells
                </h1>
                <Label className="ytext-sm yfont-semibold yflex yitems-center">
                  <Icon fontSize={16} icon="tabler:currency-peso" />
                  <span>124</span>
                </Label>
              </div>
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Discounted
                </h1>
                <Label className="ytext-sm yfont-semibold">2</Label>
              </div>
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Return
                </h1>
                <Label className="ytext-sm yfont-semibold">2</Label>
              </div>
            </CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  <DotsHorizontalIcon className="yhidden md:yblock yh-5 yw-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Edit
                  <DropdownMenuShortcut>
                    <Pencil1Icon className="yw-4 yh-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Remove
                  <DropdownMenuShortcut>
                    <TrashIcon className="yw-4 yh-4" color="red" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        </Link>
        <Link to="/app/product-list">
          <Card className="md:yflex md:yitems-center md:yjustify-between ypx-4">
            <div className="md:yflex md:yitems-center">
              <Skeleton className="hidden ybg-neutral-200 lg:yh-20 lg:yw-28 lg:yrounded-xl" />
              <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col">
                <div className="yflex yitems-center yjustify-between">
                  <CardTitle className="ytext-md">2B ACRYLON 4</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost">
                        <DotsHorizontalIcon className="md:yhidden md:yh-5 md:yw-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Edit
                        <DropdownMenuShortcut>
                          <Pencil1Icon className="yw-4 yh-4" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Remove
                        <DropdownMenuShortcut>
                          <TrashIcon className="yw-4 yh-4" color="red" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="yflex ygap-3 yitems-center">
                  <Badge>4 Variants</Badge>
                  <Label className="yfont-medium ytext-xs">Pain Tools</Label>
                  <div className="yflex yitems-center ygap-1">
                    <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                    <Label className="ytext-xs yfont-medium">
                      Product Stocked: 50
                    </Label>
                  </div>
                </CardDescription>
              </CardHeader>
            </div>
            <Separator
              className="hidden md:block lg:yh-14 lg:yw-1"
              orientation="vertical"
            />
            <CardContent className="yflex yjustify-between ygap-5 lg:ygap-9">
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Sells
                </h1>
                <Label className="ytext-sm yfont-semibold yflex yitems-center">
                  <Icon fontSize={16} icon="tabler:currency-peso" />
                  <span>124</span>
                </Label>
              </div>
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Discounted
                </h1>
                <Label className="ytext-sm yfont-semibold">2</Label>
              </div>
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Return
                </h1>
                <Label className="ytext-sm yfont-semibold">2</Label>
              </div>
            </CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  <DotsHorizontalIcon className="yhidden md:yblock yh-5 yw-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Edit
                  <DropdownMenuShortcut>
                    <Pencil1Icon className="yw-4 yh-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Remove
                  <DropdownMenuShortcut>
                    <TrashIcon className="yw-4 yh-4" color="red" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        </Link>
        <Link to="/app/product-list">
          <Card className="md:yflex md:yitems-center md:yjustify-between ypx-4">
            <div className="md:yflex md:yitems-center">
              <Skeleton className="hidden ybg-neutral-200 lg:yh-20 lg:yw-28 lg:yrounded-xl" />
              <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col">
                <div className="yflex yitems-center yjustify-between">
                  <CardTitle className="ytext-md">2B ACRYLON 4</CardTitle>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost">
                        <DotsHorizontalIcon className="md:yhidden md:yh-5 md:yw-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Action</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        Edit
                        <DropdownMenuShortcut>
                          <Pencil1Icon className="yw-4 yh-4" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        Remove
                        <DropdownMenuShortcut>
                          <TrashIcon className="yw-4 yh-4" color="red" />
                        </DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <CardDescription className="yflex ygap-3 yitems-center">
                  <Badge>4 Variants</Badge>
                  <Label className="yfont-medium ytext-xs">Pain Tools</Label>
                  <div className="yflex yitems-center ygap-1">
                    <span className="yrounded-full ybg-green-600 yh-2 yw-2 translate-y-1" />
                    <Label className="ytext-xs yfont-medium">
                      Product Stocked: 50
                    </Label>
                  </div>
                </CardDescription>
              </CardHeader>
            </div>
            <Separator
              className="hidden md:block lg:yh-14 lg:yw-1"
              orientation="vertical"
            />
            <CardContent className="yflex yjustify-between ygap-5 lg:ygap-9">
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Sells
                </h1>
                <Label className="ytext-sm yfont-semibold yflex yitems-center">
                  <Icon fontSize={16} icon="tabler:currency-peso" />
                  <span>124</span>
                </Label>
              </div>
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Discounted
                </h1>
                <Label className="ytext-sm yfont-semibold">2</Label>
              </div>
              <div className="yflex yflex-col ygap-3">
                <h1 className="yuppercase ytext-xs yfont-medium ytext-neutral-500">
                  Total Return
                </h1>
                <Label className="ytext-sm yfont-semibold">2</Label>
              </div>
            </CardContent>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Button variant="ghost">
                  <DotsHorizontalIcon className="yhidden md:yblock yh-5 yw-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Action</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  Edit
                  <DropdownMenuShortcut>
                    <Pencil1Icon className="yw-4 yh-4" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Remove
                  <DropdownMenuShortcut>
                    <TrashIcon className="yw-4 yh-4" color="red" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Card>
        </Link>
      </div>
    </>
  );
};

export default Inventory;
