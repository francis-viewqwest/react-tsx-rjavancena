import React, { useState } from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
import { menuAddCart } from "@/app/slice/menuSlice";
import Cookies from "js-cookie";

interface TabsCategory {
  category: string;
}

interface MenuItem {
  productName: string;
  category: string;
  price: number;
}

const MenuList: React.FC = ({
  dataMenu,
  tabsMenu,
  quantities,
  setQuantities,
  customerId,
  dataCustomer,
}) => {
  const [activeTab, setActiveTab] = useState("all");
  const dispatch = useDispatch();

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const customer = dataCustomer.find(
    (customer) => customer.customer_id === customerId
  );

  const filteredDataMenu =
    activeTab === "all"
      ? dataMenu
      : dataMenu.filter((item: any) => item.category === activeTab);

  const handleIncrement = (itemId: string, stock: number) => {
    setQuantities((prev: any) => ({
      ...prev,
      [itemId]: prev[itemId] < stock ? prev[itemId] + 1 : prev[itemId],
    }));
  };

  const handleDecrement = (itemId: string) => {
    setQuantities((prev: any) => ({
      ...prev,
      [itemId]: prev[itemId] > 0 ? prev[itemId] - 1 : prev[itemId],
    }));
  };

  const handleAddToCart = (itemId, quantity) => {
    console.log("Adding to cart", { itemId, quantity });

    const payload = {
      user_id_customer: customer.user_id_customer,
      purchase_group_id: customer.purchase_group_id,
      inventory_product_id: itemId,
      quantity: quantity,
      eu_device: Cookies.get("eu"),
    };

    dispatch(
      menuAddCart({
        url: "purchase/store",
        method: "POST",
        data: payload,
      })
    );
  };

  return (
    <>
      <h1 className="font-bold text-lg mb-3">Categories</h1>
      <Tabs defaultValue={activeTab} onValueChange={handleTabChange}>
        <ScrollArea className="whitespace-nowrap rounded-md border">
          <TabsList className="bg-white">
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
              value="all"
            >
              All
            </TabsTrigger>
            {tabsMenu.map((item, index) => (
              <>
                <TabsTrigger
                  key={index}
                  className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
                  value={item}
                >
                  {item}
                </TabsTrigger>
              </>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <TabsContent value={activeTab}>
          <h1 className="font-bold text-lg my-8">Select menu</h1>
          <div className="gap-y-5 grid grid-cols-2 sm:grid-cols-3 sm:flex-row lg:grid lg:grid-cols-4 lg:gap-3">
            {filteredDataMenu.map((item, index) => (
              <Card key={index} className="bg-primary max-w-72 p-1">
                <CardHeader className="p-2">
                  <Skeleton className="max-w-full max-h-full p-12 bg-neutral-300" />
                </CardHeader>
                <CardContent className="flex flex-col gap-3 p-2">
                  <div>
                    <h1 className="text-white font-bold text-md">
                      {item.name}
                    </h1>
                    <p className=" text-xs text-muted-foreground">
                      {item.category}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-white font-bold text-lg">
                      ₱{item.retail_price}
                    </p>
                    <div className="flex items-center gap-3 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        className="bg-inherit border-white hover:bg-white/10"
                        onClick={() => handleDecrement(item.inventory_id)}
                        disabled={quantities[item.id] <= 0}
                      >
                        <MinusIcon color="white" />
                      </Button>
                      <span className="text-white font-semibold">
                        {quantities[item.inventory_id]}
                      </span>
                      <Button
                        className="bg-white hover:bg-white/90"
                        size="sm"
                        onClick={() =>
                          handleIncrement(item.inventory_id, item.stocks)
                        }
                        disabled={quantities[item.id] >= item.stocks}
                      >
                        <PlusIcon color="black" />
                      </Button>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="default"
                    className=" hover:bg-white/90 font-semibold my-1"
                    onClick={() =>
                      handleAddToCart(
                        item.inventory_product_id,
                        quantities[item.inventory_id]
                      )
                    }
                  >
                    Add to cart
                  </Button>
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
