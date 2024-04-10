import React from "react";
import {
  MinusIcon,
  PlusIcon,
  Pencil2Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface AddCartItem {
  productName: string;
  category: string;
  price: number;
}

const OrdersList: React.FC = () => {
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
      <h1 className="yfont-bold yflex yitems-center ygap-2">
        Orders
        <div className="ybg-primary yrounded-full yw-7 yh-7 ytext-white yflex yitems-center">
          <span className="ym-auto ytext-xs">5</span>
        </div>
      </h1>
      <div className="ytext-sm ytext-muted-foreground ypy-3 yitems-center yflex ygap-3">
        <h1 className="ytext-xs">Customer 01</h1>
        <Pencil2Icon color="black" />
      </div>
      <div>
        <ScrollArea className="yh-[400px] yrounded-md yborder yp-2">
          <div className=" yflex yflex-col ygap-4">
            {addCartItem.map((item) => (
              <Card className="yp-2">
                <div className="yflex ygap-2">
                  <Skeleton className="ymax-w-full ymax-h-full yp-8" />
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
        </ScrollArea>
      </div>
    </>
  );
};

export default OrdersList;
