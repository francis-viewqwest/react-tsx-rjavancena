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
      <div className="ypy-7 lg:ygrid lg:ygrid-cols-4 lg:ygrid-rows-4 lg:ypy-4 lg:ygap-4">
        <div className="lg:ycol-span-3 lg:yrow-span-4">
          <div className="yw-full yrelative yflex yitems-center lg:yw-96">
            <MagnifyingGlassIcon className="yabsolute yml-4 ytext-neutral-500 yh-5 yw-5" />
            <Input className="ypl-12" placeholder="Search Product" />
          </div>
          <div className="ypy-4">
            <MenuList />
          </div>
        </div>
        <div className="ypy-4 lg:ypy-0 lg:yrow-span-4 lg:yw-full lg:yh-full lg:ycol-start-4">
          <Tabs defaultValue="customer01">
            <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
              <TabsList className="ybg-none">
                <TabsTrigger className="ytext-xs" value="customer01">
                  Customer 01
                </TabsTrigger>
                <TabsTrigger className="ytext-xs" value="Customer02">
                  Customer 02
                </TabsTrigger>
                <TabsTrigger className="ytext-xs" value="Customer03">
                  Customer 03
                </TabsTrigger>
                <TabsTrigger className="ytext-xs" value="Customer04">
                  Customer 04
                </TabsTrigger>
                <TabsTrigger className="ytext-xs" value="Customer05">
                  Customer 05
                </TabsTrigger>
                <TabsTrigger className="ytext-xs" value="Customer06">
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
