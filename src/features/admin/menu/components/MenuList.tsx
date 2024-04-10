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
        <ScrollArea className="whitespace-nowrap rounded-md border">
          <TabsList className="bg-white">
            {TabsCategory.map((item, index) => (
              <TabsTrigger
                key={index}
                className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
                value={item.category}
              >
                {item.category}
              </TabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value="All">
          <div className="gap-y-5 grid grid-cols-2 sm:grid-cols-3 sm:flex-row lg:grid lg:grid-cols-4 lg:gap-2">
            {menuItem.map((item) => (
              <Card className="bg-primary">
                <CardHeader className="p-2">
                  <Skeleton className="max-w-full max-h-full p-12 bg-neutral-300" />
                </CardHeader>
                <CardContent className="flex flex-col gap-3 p-2">
                  <div>
                    <h1 className="text-white font-bold text-md">
                      {item.productName}
                    </h1>
                    <p className=" text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold">₱{item.price}</p>
                    <div className="flex items-center gap-3 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-inherit border-white hover:bg-white/10"
                      >
                        <MinusIcon color="white" />
                      </Button>
                      <span className=" text-white">0</span>
                      <Button className="bg-white hover:bg-white/90" size="sm">
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
