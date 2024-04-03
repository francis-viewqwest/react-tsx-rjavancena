import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

import { Button } from "@/components/ui/button";

import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Icon } from "@iconify/react";
import { IconDots, IconTrash } from "@tabler/icons-react";
import { Separator } from "@/components/ui/separator";

import { IconPencil } from "@tabler/icons-react";

const Inventory: React.FC = () => {
  return (
    <>
      <div className="yflex yflex-col ygap-4 ypy-4">
        <Card className="md:yflex md:yitems-center md:yjustify-between ypx-4">
          <div className="md:yflex md:yitems-center">
            <Skeleton className="hidden ybg-neutral-200 lg:yh-24 lg:yw-32 lg:yrounded-xl" />
            <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col ygap-2">
              <div className="yflex yitems-center yjustify-between">
                <CardTitle className="ytext-lg">2B ACRYLON 4</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost">
                      <IconDots className="md:yhidden" size="24" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Edit
                      <DropdownMenuShortcut>
                        <IconPencil size="16" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Remove
                      <DropdownMenuShortcut>
                        <IconTrash size="16" color="red" />
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
                <IconDots className="yhidden md:yblock" size="24" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Edit
                <DropdownMenuShortcut>
                  <IconPencil size="16" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Remove
                <DropdownMenuShortcut>
                  <IconTrash size="16" color="red" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
        <Card className="md:yflex md:yitems-center md:yjustify-between ypx-4">
          <div className="md:yflex md:yitems-center">
            <Skeleton className="hidden ybg-neutral-200 lg:yh-24 lg:yw-32 lg:yrounded-xl" />
            <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col ygap-2">
              <div className="yflex yitems-center yjustify-between">
                <CardTitle className="ytext-lg">2B ACRYLON 4</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost">
                      <IconDots className="md:yhidden" size="24" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Edit
                      <DropdownMenuShortcut>
                        <IconPencil size="16" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Remove
                      <DropdownMenuShortcut>
                        <IconTrash size="16" color="red" />
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
                <IconDots className="yhidden md:yblock" size="24" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Edit
                <DropdownMenuShortcut>
                  <IconPencil size="16" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Remove
                <DropdownMenuShortcut>
                  <IconTrash size="16" color="red" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
        <Card className="md:yflex md:yitems-center md:yjustify-between ypx-4">
          <div className="md:yflex md:yitems-center">
            <Skeleton className="hidden ybg-neutral-200 lg:yh-24 lg:yw-32 lg:yrounded-xl" />
            <CardHeader className="yw-full yjustify-start yleft-0 lg:yflex lg:yflex-col ygap-2">
              <div className="yflex yitems-center yjustify-between">
                <CardTitle className="ytext-lg">2B ACRYLON 4</CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button variant="ghost">
                      <IconDots className="md:yhidden" size="24" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>Action</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      Edit
                      <DropdownMenuShortcut>
                        <IconPencil size="16" />
                      </DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Remove
                      <DropdownMenuShortcut>
                        <IconTrash size="16" color="red" />
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
                <IconDots className="yhidden md:yblock" size="24" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Action</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Edit
                <DropdownMenuShortcut>
                  <IconPencil size="16" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Remove
                <DropdownMenuShortcut>
                  <IconTrash size="16" color="red" />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </Card>
      </div>
    </>
  );
};

export default Inventory;
