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
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  IconCashBanknoteFilled,
  IconCreditCardFilled,
  IconQrcode,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

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

  const paymentMethod = [
    {
      icon: <IconCashBanknoteFilled />,
      label: "Card",
    },
    {
      icon: <IconCreditCardFilled />,
      label: "Debit",
    },
    {
      icon: <IconQrcode />,
      label: "E-Wallet",
    },
  ];

  return (
    <>
      <div className="ypy-7 lg:ygrid lg:ygrid-cols-4 lg:ygrid-rows-4 lg:ygap-4">
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
              </Tabs>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
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
        </div>
        <div className="ypy-4 lg:ypy-0 lg:yrow-span-4 lg:yw-full lg:yh-full lg:ycol-start-4">
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
          <div className="ypy-5">
            <h1 className="yfont-bold">Payment Summary</h1>
            <div className="yflex yflex-col ygap-3 ypt-8 ypb-6">
              <div className="yflex yitems-center yjustify-between">
                <h1>Discount</h1>
                <Button className="yflex ygap-2">
                  <PlusIcon />
                  Discount
                </Button>
              </div>
              <div className="yflex yitems-center yjustify-between">
                <h1>Total Discount</h1>
                <p>₱0</p>
              </div>
              <div className="yflex yitems-center yjustify-between">
                <h1>Sub Total</h1>
                <p>₱499.95</p>
              </div>
              <div className="yflex yitems-center yjustify-between">
                <h1>Tax</h1>
                <p>₱10.95</p>
              </div>
            </div>
            <div>
              <div className="yflex yitems-center yjustify-between yborder-dashed yborder-t-2 yborder-stone-400 ypy-4">
                <h1 className="yfont-bold ytext-lg">Total Amount</h1>
                <p className="yfont-bold ytext-lg">₱499.95</p>
              </div>
            </div>
            <div className="yw-full">
              <h1 className="yfont-semibold">Payment Method</h1>
              <div className="ypt-4">
                <RadioGroup className="ygrid ygrid-cols-3 ygap-2 yw-full">
                  {paymentMethod.map((item) => (
                    <div>
                      <RadioGroupItem
                        value={item.label}
                        id={item.label}
                        className="ypeer ysr-only"
                      />
                      <Label
                        htmlFor={item.label}
                        className="yflex yflex-col ytext-xs yitems-center yfont-semibold yjustify-between yrounded-md yborder-2 yborder-primary ybg-popover yp-3 hover:ybg-primary hover:ytext-white peer-data-[state=checked]:yborder-primary [&:has([data-state=checked])]:yborder-primary"
                      >
                        {item.icon}
                        {item.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="yflex yflex-col ygap-6 ypy-4 yw-full">
                <div className="ygrid ygap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    className="yw-full"
                    id="name"
                    placeholder="First Last"
                  />
                </div>
                <div className="ygrid ygap-2">
                  <Label htmlFor="number">Card number</Label>
                  <Input id="number" placeholder="" />
                </div>
                <Button size="lg" className="yw-full">
                  Place Order
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Menu;
