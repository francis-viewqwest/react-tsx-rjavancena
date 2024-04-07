import React from "react";
import { Input } from "@/components/ui/input";
import {
  MagnifyingGlassIcon,
  MinusIcon,
  PlusIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TabsCategory {
  category: string;
}

interface MenuItem {
  productName: string;
  category: string;
  price: number;
}

interface AddCartItem {
  productName: string;
  category: string;
  price: number;
}

const Menu: React.FC = () => {
  const TabsCategory: TabsCategory[] = [
    {
      category: "All",
    },
    {
      category: "Tools",
    },
    {
      category: "Building Materials",
    },
    {
      category: "Paint Supplies",
    },
    {
      category: "Electrical Supplies",
    },
    {
      category: "Plumbing Supplies",
    },
    {
      category: "Hardware Accessories",
    },
    {
      category: "Safety and Security",
    },
    {
      category: "Outdoor",
    },
  ];

  const menuItem: MenuItem[] = [
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
  ];

  const addCartItem: AddCartItem[] = [
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
    {
      productName: "Power Drill Set",
      category: "Hardware",
      price: 99.99,
    },
  ];

  return (
    <>
      <div className="ypy-7 lg:ygrid lg:ygrid-cols-4 lg:ygrid-rows-4 lg:ygap-3">
        <div className="lg:ycol-span-3 lg:yrow-span-4">
          <div className="yw-full yrelative yflex yitems-center lg:yw-96">
            <MagnifyingGlassIcon className="yabsolute yml-4 ytext-neutral-500 yh-5 yw-5" />
            <Input className="ypl-12" placeholder="Search Product" />
          </div>
          <div className="ypy-4">
            <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
              <Tabs defaultValue="All">
                <TabsList className="ybg-white">
                  {TabsCategory.map((item) => (
                    <TabsTrigger
                      className="data-[state=active]:ybg-primary data-[state=active]:ytext-white ytext-xs"
                      value={item.category}
                    >
                      {item.category}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <TabsContent value="account">
                  Make changes to your account here.
                </TabsContent>
                <TabsContent value="password">
                  Change your password here.
                </TabsContent>
              </Tabs>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
          <div className="yflex yflex-col ygap-y-5 sm:yflex-wrap sm:yflex-row lg:ygrid lg:ygrid-cols-4 lg:ygap-4 ">
            {menuItem.map((item) => (
              <Card className="ybg-primary ">
                <CardHeader className="yp-3">
                  <Skeleton className="ymax-w-full ymax-h-full yp-12 ybg-neutral-300" />
                </CardHeader>
                <CardContent className="yflex yflex-col ygap-3 yp-3">
                  <div>
                    <h1 className="ytext-white yfont-bold ytext-md">
                      {item.productName}
                    </h1>
                    <p className=" ytext-xs ytext-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <div className="yflex yitems-center yjustify-between">
                    <p className="ytext-white yfont-bold">₱{item.price}</p>
                    <div className="yflex yitems-center ygap-3 yjustify-end">
                      <Button
                        size="sm"
                        variant="outline"
                        className="ybg-none yborder-white"
                      >
                        <MinusIcon color="white" />
                      </Button>
                      <span className=" ytext-white">0</span>
                      <Button
                        className="ybg-white hover:ybg-white/90"
                        size="sm"
                      >
                        <PlusIcon color="black" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="lg:yrow-span-4 lg:yw-full lg:yh-full lg:ycol-start-4">
          <h1 className="yfont-bold yflex yitems-center ygap-4">
            Orders
            <div className="ybg-primary yrounded-full yw-7 yh-7 ytext-white yflex yitems-center">
              <span className="ym-auto ytext-xs">5</span>
            </div>
          </h1>
          <div className="ytext-sm ytext-muted-foreground ypy-3 yitems-center yflex ygap-4">
            <h1>Customer 01</h1>
            <Pencil2Icon color="black" />
          </div>
          <div className="yflex yflex-col ygap-4">
            {addCartItem.map((item) => (
              <Card className="yp-2">
                <div className="yflex ygap-2">
                  <Skeleton className="ymax-w-full ymax-h-full yp-10" />
                  <CardContent className="yw-full yrelative ypx-1">
                    <div>
                      <div className="yflex yw-full yitems-center yjustify-between">
                        <h1 className="ytext-xs yfont-bold ytext-primary">
                          {item.productName}
                        </h1>
                        <h1 className="ytext-xs yfont-bold ytext-primary">
                          {item.price}
                        </h1>
                      </div>
                      <p className="ytext-xs ytext-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <div className="yflex yw-full yh-full yitems-center yjustify-between">
                      <div className="yflex yitems-center  ">
                        <Button className="yrounded-r-none" size="sm">
                          <MinusIcon />
                        </Button>
                        <div className="ybg-white yp-0.5 ypx-3">0</div>
                        <Button className="yrounded-l-none" size="sm">
                          <PlusIcon />
                        </Button>
                      </div>
                      <div className="">
                        <TrashIcon color="red" />
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
