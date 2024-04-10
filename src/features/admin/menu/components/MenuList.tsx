import React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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

const MenuList: React.FC = () => {
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
  return (
    <>
      <Tabs defaultValue="All">
        <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="All">
          <div className="ygap-y-5 ygrid ygrid-cols-2 sm:ygrid-cols-3 sm:yflex-row lg:ygrid lg:ygrid-cols-4 lg:ygap-2">
            {menuItem.map((item) => (
              <Card className="ybg-primary">
                <CardHeader className="yp-2">
                  <Skeleton className="ymax-w-full ymax-h-full yp-12 ybg-neutral-300" />
                </CardHeader>
                <CardContent className="yflex yflex-col ygap-3 yp-2">
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
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MenuList;
