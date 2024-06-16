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

const OrdersList: React.FC = ({ customerId, dataCustomer }) => {
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

  console.log(customerId);

  console.log(dataCustomer);

  const customer = dataCustomer.find(
    (customer) => customer.customer_id === customerId
  );

  if (!customer) {
    return <div>No customer found for {customerId}</div>;
  }

  return (
    <>
      <h1 className="font-bold flex items-center gap-2">
        Orders
        <div className="bg-primary rounded-full w-7 h-7 text-white flex items-center">
          <span className="m-auto text-xs">{customer.total_orders}</span>
        </div>
      </h1>
      <div className="text-sm text-muted-foreground py-3 items-center flex gap-3">
        <h1 className="text-xs">Customer 01</h1>
        <Pencil2Icon color="black" />
      </div>
      <div>
        <ScrollArea className="h-[400px] rounded-md border p-2">
          <div className=" flex flex-col gap-4">
            {customer.items.map((item, index) => (
              <Card key={index} className="p-2">
                <div className="flex gap-2">
                  <Skeleton className="max-w-full max-h-full p-8" />
                  <CardContent className="w-full relative px-1">
                    <div>
                      <div className="flex w-full items-center justify-between">
                        <h1 className="text-xs font-bold text-primary">
                          {item.name}
                        </h1>
                        <h1 className="text-xs font-bold text-primary">
                          ₱{item.retail_price}
                        </h1>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                    </div>
                    <div className="flex w-full h-full items-center justify-between">
                      <div className="flex items-center  ">
                        <Button className="rounded-r-none" size="sm">
                          <MinusIcon />
                        </Button>
                        <div className="bg-white p-0.5 px-3">{item.count}</div>
                        <Button className="rounded-l-none" size="sm">
                          <PlusIcon />
                        </Button>
                      </div>
                      <div>
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
