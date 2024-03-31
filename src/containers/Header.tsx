import React from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header: React.FC = () => {
  return (
    <>
      <div className="ysticky ytop-0 yborder-b-[1px] ypy-1 yw-full ybg-white">
        <div className="yp-2 ypx-7 yflex yitems-center yjustify-between">
          {/* <DrawerTrigger asChild>
            <Button variant="outline">Open Drawer</Button>
          </DrawerTrigger> */}
          <h1 className="yfont-bold ytext-lg">Header</h1>
          <Avatar>
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="ybg-stone-900 ytext-white yfont-medium">
              RJ
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </>
  );
};

export default Header;
