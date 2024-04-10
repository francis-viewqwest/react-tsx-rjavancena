import React from "react";
import { useSelector } from "react-redux";
import { selectTitle } from "../common/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBell, IconMessage } from "@tabler/icons-react";

const Header: React.FC = () => {
  const pageTitle = useSelector(selectTitle);

  return (
    <>
      <div className="ysticky ytop-0 yz-40 yborder-b-[1px] ypy-1 yw-full ybg-white">
        <div className="yp-1 ypx-7 yflex yitems-center yjustify-between lg:ypx-3">
          <h1 className="yfont-bold ytext-lg yml-14 lg:yml-0">{pageTitle}</h1>
          <div className="yflex yitems-center ygap-6">
            <IconMessage className="ytext-muted-foreground" size="20" />
            <IconBell className="ytext-muted-foreground" size="20" />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="ybg-stone-900 ytext-white yfont-medium">
                RJ
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
