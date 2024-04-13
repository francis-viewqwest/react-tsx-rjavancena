import React from "react";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import MenuList from "./components/MenuList";
import OrdersList from "./components/OrdersList";
import Payment from "./components/Payment";

const Menu: React.FC = () => {
  return (
    <>
      <div className="py-7 lg:grid lg:grid-cols-4 lg:grid-rows-4 lg:py-4 lg:gap-4">
        <div className="lg:col-span-3 lg:row-span-4">
          <div className="w-full relative flex items-center lg:w-96">
            <MagnifyingGlassIcon className="absolute ml-4 text-neutral-500 h-5 w-5" />
            <Input className="pl-12" placeholder="Search Product" />
          </div>
          <div className="py-4">
            <MenuList />
          </div>
        </div>
        <div className="py-4 lg:py-0 lg:row-span-4 lg:w-full lg:h-full lg:col-start-4">
          <Tabs className="bg-white" defaultValue="customer01">
            <ScrollArea className="whitespace-nowrap rounded-md border">
              <TabsList className="bg-white">
                <TabsTrigger
                  className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
                  value="customer01"
                >
                  Customer 01
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
                  value="Customer02"
                >
                  Customer 02
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
                  value="Customer03"
                >
                  Customer 03
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
                  value="Customer04"
                >
                  Customer 04
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
                  value="Customer05"
                >
                  Customer 05
                </TabsTrigger>
                <TabsTrigger
                  className="data-[state=active]:bg-primary data-[state=active]:text-white text-xs"
                  value="Customer06"
                >
                  Customer 06
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
            <TabsContent value="customer01">
              <OrdersList />
              <Payment />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
};

export default Menu;
