import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectTitle } from "../common/appSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IconBell, IconMessage, IconLogout } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import phFlag from "@/assets/images/phflag.svg";
import { Button } from "@/components/ui/button";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { IconReload } from "@tabler/icons-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DialogClose, DialogPortal } from "@radix-ui/react-dialog";
import _ from "lodash";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import Cookies from "js-cookie";
import useAxiosClient from "@/axios-client";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/components/ui/skeleton";
import axios from "axios";

const Header: React.FC = () => {
  const pageTitle = useSelector(selectTitle);
  const headerUser = useAppSelector((state) => state.user.data.user);
  const userLoading = useAppSelector((state) => state.user.loading);
  const navigate = useNavigate();
  const axiosClient = useAxiosClient();
  const dispatch = useAppDispatch();

  const { control, handleSubmit, getValues, setValue, register, watch } =
    useForm({});
  const [modalData, setModalData] = useState({});
  const [funcData, setFuncData] = useState({});
  const [showEditInfoDialog, setShowEditInfoDialog] = useState(false);

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

  const [getLocationCode, setGetLocationCode] = useState({});
  const [locationsData, setLocationsData] = useState({
    regions: [],
    provinces: [],
    cities: [],
    barangays: [],
  });

  const handleEditInfo = () => {
    // console.log(values);
    // setFuncData(values);

    // values.details.forEach((val: any) => {
    //   const fieldName = val.label.replace(/\s+/g, "_").toLowerCase();
    //   setValue(fieldName, val.value);
    // });

    // setModalData(values);

    setShowEditInfoDialog(true);

    // axios
    //   .get("https://psgc.gitlab.io/api/regions/")
    //   .then((res) =>
    //     setLocationsData((prevState) => ({ ...prevState, regions: res.data }))
    //   );
  };

  const handleSaveUserInfo = (values) => {
    const formValues = getValues();

    console.log(formValues);

    const regionName =
      values.details.find((detail: any) => detail.label === "Region Name")
        ?.value_name || getLocationCode.region_name;
    const barangayName =
      values.details.find((detail: any) => detail.label === "Barangay Name")
        ?.value_name || getLocationCode.barangay_name;
    const citiesName =
      values.details.find(
        (detail: any) => detail.label === "City Or Municipality Name"
      )?.value_name || getLocationCode.city_or_municipality_name;
    const provinceName =
      values.details.find((detail: any) => detail.label === "Province Name")
        ?.value_name || getLocationCode.province_name;

    console.log(regionName);

    const payload = {
      user_id: funcData.user_id,
      image: formValues?.image?.[0] ?? null,
      first_name: formValues.first_name,
      middle_name: formValues.middle_name,
      last_name: formValues.last_name,
      contact_number: formValues.contact_number,
      contact_email: formValues.contact_email,
      address_1: formValues.address_1,
      address_2: formValues.address_2,
      phone_number: formValues.phone_number,
      region_code: formValues.region_name,
      province_code: formValues.province_name,
      city_or_municipality_code: formValues.city_or_municipality_name,
      barangay_code: formValues.barangay_name,
      barangay_name: barangayName,
      city_or_municipality_name: citiesName,
      province_name: provinceName,
      region_name: regionName,
      eu_device: Cookies.get("eu"),
    };

    console.log(payload);

    // dispatch(
    //   editUserInfo({
    //     url: funcData.url,
    //     method: "POST",
    //     data: payload,
    //   })
    // );
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
            <Dialog>
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
                        <DropdownMenuItem className="cursor-pointer">
                          <DialogTrigger
                            className="flex items-center w-full justify-between"
                            onClick={() => handleEditInfo()}
                          >
                            Profile
                          </DialogTrigger>
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
                  </>
                )}
              </DropdownMenu>
              <DialogPortal>
                {showEditInfoDialog && (
                  <DialogContent className="sm:max-w-[34rem]">
                    <DialogHeader>
                      <DialogTitle>Edit user information</DialogTitle>
                      <DialogDescription>
                        Edit user account details below. Update information and
                        click save to apply changes.
                      </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="h-72 w-full">
                      <div></div>
                    </ScrollArea>
                    <DialogFooter>
                      <Button
                        className="bg-bgrjavancena"
                        type="submit"
                        onClick={() => handleSaveUserInfo(modalData)}
                      >
                        Save changes
                      </Button>
                      <DialogClose asChild>
                        <Button type="button" variant="secondary">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                )}
              </DialogPortal>
            </Dialog>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
