import React from "react";
import { useSelector } from "react-redux";
import { selectTitle } from "../common/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBell, IconMessage, IconLogout } from "@tabler/icons-react";
import { Link } from "react-router-dom";
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
import _ from "lodash";
import { useAppSelector } from "@/app/hooks";
import Cookies from "js-cookie";
import useAxiosClient from "@/axios-client";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";

const Header: React.FC = () => {
  const pageTitle = useSelector(selectTitle);
  const headerUser = useAppSelector((state) => state.user.data.user);
  const userLoading = useAppSelector((state) => state.user.loading);
  const navigate = useNavigate();
  const axiosClient = useAxiosClient();

  const token = Cookies.get("token");
  const euDevice = Cookies.get("eu");

  const handleClickLogout = async () => {
    try {
      const res = await axiosClient.post(
        "logout",
        {
          eu_device: euDevice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.status === 200) {
        Cookies.remove("token");
        navigate("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="sticky top-0 z-40 border-b-[1px] py-1 w-full bg-white">
        <div className="p-1 px-7 flex items-center justify-between lg:px-3">
          <h1 className="font-bold text-lg ml-14 lg:ml-0">
            {!pageTitle ? (
              <span className="flex flex-col gap-1">
                <Skeleton className="h-3 w-20 bg-neutral-200" />
                <Skeleton className="h-3 w-16 bg-neutral-200" />
              </span>
            ) : (
              <>{pageTitle}</>
            )}
          </h1>
          <div className="flex items-center gap-6">
            {userLoading && <Skeleton className="h-6 w-6 rounded-full" />}
            {userLoading && <Skeleton className="h-6 w-6 rounded-full" />}
            {!userLoading && (
              <IconMessage className="text-muted-foreground" size="20" />
            )}
            {!userLoading && (
              <IconBell className="text-muted-foreground" size="20" />
            )}
            <DropdownMenu>
              {userLoading && <Skeleton className="h-10 w-10 rounded-full" />}
              {!userLoading && (
                <>
                  <DropdownMenuTrigger asChild>
                    <Avatar>
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback className="bg-stone-900 text-white font-medium">
                        RJ
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 mr-5">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs py-0 font-medium">
                      {headerUser?.email}
                    </DropdownMenuLabel>
                    <DropdownMenuLabel className="text-xs py-0 font-medium lowercase text-neutral-400">
                      {_.startCase(headerUser?.role)}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <Link to="/app/profile">
                        <DropdownMenuItem className="cursor-pointer">
                          Profile
                        </DropdownMenuItem>
                      </Link>
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
                </>
              )}
            </DropdownMenu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
