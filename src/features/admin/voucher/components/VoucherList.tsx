import { useAppSelector } from "@/app/hooks";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const VoucherList: React.FC = () => {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [modalData, setModalData] = useState(false);

  const handleEdit = (values: any) => {
    console.log(values);
    setModalData(values);
    setShowEditDialog(true);
  };
  const voucherData = useAppSelector(
    (state) => state.voucher.voucherData.data.voucher
  );
  console.log(voucherData);

  return (
    <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
      {voucherData.map((item, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="text-lg">{item.voucher_code}</CardTitle>
            <CardDescription className="text-sm">{item.name}</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <div className="grid grid-cols-2">
              <small className="font-bold">Price:</small>
              <small className="text-neutral-400">{item.discount_amount}</small>
            </div>
            <div className="grid grid-cols-2">
              <small className="font-bold">Vouchers:</small>
              <small className="text-neutral-400">{item.vouchers}</small>
            </div>
            <div className="grid grid-cols-2">
              <small className="font-bold">Used:</small>
              <small className="text-neutral-400">{item.used}</small>
            </div>
            <div className="grid grid-cols-2">
              <small className="font-bold">Expiration:</small>
              <small className="text-neutral-400">{item.end_at}</small>
            </div>
          </CardContent>
          <CardFooter className="w-full flex items-center gap-3">
            {item.action.map((btn: any) => (
              <>
                {btn.button_name === "View details" ? (
                  <Button size="sm" className="w-full">
                    {btn?.button_name}
                  </Button>
                ) : (
                  <>
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <Button size="sm" variant="outline">
                            <Icon icon="radix-icons:dots-horizontal" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DialogTrigger className="w-full">
                            <DropdownMenuItem
                              className="cursor-pointer w-full"
                              onClick={() => handleEdit(btn)}
                            >
                              <Icon className="mr-2" icon={btn.icon} />
                              <span>{btn?.button_name}</span>
                            </DropdownMenuItem>
                          </DialogTrigger>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <DialogPortal>
                        {showEditDialog && (
                          <DialogContent className="sm:max-w-[34rem]">
                            <DialogHeader>
                              <DialogTitle>
                                Edit voucher code details
                              </DialogTitle>
                              <DialogDescription>
                                Edit voucher code details below. Update
                                information and click save to apply changes.
                              </DialogDescription>
                            </DialogHeader>
                            <ScrollArea className="h-72 w-full">
                              <div className="w-full">
                                {modalData?.details.map((detail) => (
                                  <>
                                    <div className="grid gap-2 py-3 mx-6">
                                      <Label className="font-semibold text-xs">
                                        {detail?.label}
                                      </Label>
                                      <>
                                        <Input
                                          type={detail.type}
                                          // {...register(
                                          //   detail.label
                                          //     .replace(/\s+/g, "_")
                                          //     .toLowerCase()
                                          // )}
                                          className="w-full"
                                        />
                                        {/* <small className="text-red-500 w-full">
                                          {errorMessage?.message &&
                                            errorMessage?.message[
                                              _.replace(
                                                _.lowerCase(detail.label),
                                                " ",
                                                "_"
                                              )
                                            ]}
                                        </small> */}
                                      </>
                                    </div>
                                  </>
                                ))}
                              </div>
                            </ScrollArea>
                            <DialogFooter>
                              <Button
                                className="bg-bgrjavancena disabled:opacity-100"
                                type="submit"
                                // disabled={loadingEditUser}
                                // onClick={() => handleSaveClick()}
                              >
                                {/* {loadingEditUser && (
                                  <span className="flex items-center gap-1">
                                    Saving...
                                    <IconReload
                                      className="animate-spin"
                                      size={16}
                                    />
                                  </span>
                                )} */}
                                {"Save changes"}
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
                  </>
                )}
              </>
            ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default VoucherList;
