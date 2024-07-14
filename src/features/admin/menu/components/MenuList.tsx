import React from "react";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IconZoomExclamation } from "@tabler/icons-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { menuAddCart } from "@/app/slice/menuSlice";
import Cookies from "js-cookie";
import { MenuListProps } from "@/interface/InterfaceType";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useToast } from "@/components/ui/use-toast";
import _ from "lodash";

const MenuList: React.FC<MenuListProps> = ({
  filteredData,
  tabCategory,
  handleTabCategory,
  tabsMenu,
  quantities,
  setQuantities,
  customerId,
  dataCustomer,
}) => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const loadingMenu = useAppSelector((state) => state.menu.loadingAddCart);

  const customer = dataCustomer?.find(
    (customer) => customer?.customer_id === customerId
  );

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

  const handleAddToCart = (itemId: string, quantity: number) => {
    // if (quantity <= 0) {
    //   toast({
    //     variant: "destructive",
    //     title: "Please select quantity to add to the cart.",
    //   });
    //   return;
    // }
    const payload = {
      ...(customer?.user_id_customer && {
        user_id_customer: customer?.user_id_customer,
      }),
      ...(customer?.purchase_group_id && {
        purchase_group_id: customer?.purchase_group_id,
      }),
      inventory_product_id: itemId,
      quantity: quantity || 1,
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
      <Tabs defaultValue={tabCategory} onValueChange={handleTabCategory}>
        <ScrollArea className="whitespace-nowrap rounded-md border">
          <TabsList className="bg-white">
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
              value="all"
            >
              All
            </TabsTrigger>
            {tabsMenu?.map((item, index) => (
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
        <TabsContent value={tabCategory}>
          <h1 className="font-bold text-lg my-8">Select menu</h1>
          <div className="gap-y-5 grid grid-cols-2 sm:grid-cols-3 sm:flex-row lg:grid lg:grid-cols-4 lg:gap-3 relative">
            {filteredData?.length > 0 ? (
              filteredData?.map((item, index) => (
                <Card key={index} className=" max-w-72 p-1">
                  <CardHeader className="p-2">
                    <Skeleton className="max-w-full max-h-full p-12 bg-neutral-300" />
                  </CardHeader>
                  <CardContent className="flex flex-col gap-3 p-2">
                    <div>
                      <p
                        title={item.category}
                        className=" text-xs text-neutral-500 font-semibold"
                      >
                        {_.truncate(item.category, {
                          length: 25,
                          separator: " ...",
                        })}
                      </p>
                      <h1
                        title={item.name}
                        className="text-primary font-bold text-md"
                      >
                        {_.truncate(item.name, {
                          length: 20,
                          separator: " ...",
                        })}
                      </h1>
                      <p className="text-xs text-neutral-400 font-medium flex items-center gap-2">
                        <span>
                          {item.stocks > 0 ? (
                            `${item.stocks} Available`
                          ) : (
                            <>
                              <span className="text-red-500">
                                {item.stocks}
                              </span>{" "}
                              Not Available
                            </>
                          )}
                        </span>
                        •<span>{item.sold} Sold</span>
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs">
                        {item?.discounted_price > 0 && (
                          <p className="text-primary font-bold mr-1">
                            ₱{item.discounted_price}
                          </p>
                        )}
                        <p
                          className={`font-bold text-xs  ${
                            item.discounted_price
                              ? "text-red-500 line-through font-medium"
                              : "text-primary "
                          }`}
                        >
                          ₱{item.retail_price}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 justify-end">
                        <Button
                          className="bg-bgrjavancena hover:bg-primary/90 text-xs font-medium"
                          size="xs"
                          onClick={() =>
                            handleAddToCart(
                              item?.inventory_product_id,
                              quantities[item?.inventory_id]
                            )
                          }
                          // disabled={quantities[item.id] >= item.stocks}
                          disabled={item.stocks <= 0}
                        >
                          <PlusIcon />
                          Add
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="w-full flex pt-40 items-center justify-center absolute">
                <h1 className="text-sm flex items-center gap-2 text-neutral-600">
                  No products found. <IconZoomExclamation size={18} />
                </h1>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default MenuList;
