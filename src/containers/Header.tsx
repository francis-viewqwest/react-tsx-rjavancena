import React from "react";
import { useSelector } from "react-redux";
import { selectTitle } from "../common/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBell, IconMessage } from "@tabler/icons-react";

const Header: React.FC = () => {
  const pageTitle = useSelector(selectTitle);

  return (
    <>
      <div className="sticky top-0 z-40 border-b-[1px] py-1 w-full bg-white">
        <div className="p-1 px-7 flex items-center justify-between lg:px-3">
          <h1 className="font-bold text-lg ml-14 lg:ml-0">{pageTitle}</h1>
          <div className="flex items-center gap-6">
            <IconMessage className="text-muted-foreground" size="20" />
            <IconBell className="text-muted-foreground" size="20" />
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-stone-900 text-white font-medium">
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
