import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTitle } from "../common/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  IconBell,
  IconMessage,
  IconLogout,
  IconUserCircle,
} from "@tabler/icons-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/app/hooks";
import { logout } from "@/app/slice/userSlice";

const Header: React.FC = () => {
  const pageTitle = useSelector(selectTitle);

  const dispatch = useAppDispatch();

  const handleClickLogout = () => {
    const payload = {};

    console.log(logout);

    dispatch(
      logout({
        url: "",
        method: "POST",
        data: payload,
      })
    );
  };

  return (
    <>
      <div className="sticky top-0 z-40 border-b-[1px] py-1 w-full bg-white">
        <div className="p-1 px-7 flex items-center justify-between lg:px-3">
          <h1 className="font-bold text-lg ml-14 lg:ml-0">{pageTitle}</h1>
          <div className="flex items-center gap-6">
            <IconMessage className="text-muted-foreground" size="20" />
            <IconBell className="text-muted-foreground" size="20" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback className="bg-stone-900 text-white font-medium">
                    RJ
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-44 mr-5">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="cursor-pointer">
                    Profile
                    <DropdownMenuShortcut>
                      <IconUserCircle size={16} stroke={2} />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleClickLogout}
                  className="cursor-pointer"
                >
                  Log out
                  <DropdownMenuShortcut>
                    <IconLogout size={16} stroke={2} />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
