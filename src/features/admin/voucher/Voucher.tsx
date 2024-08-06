import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { addVoucherData, getVoucherData } from "@/app/slice/voucherSlice";
import React, { useEffect, useState } from "react";
import VoucherList from "./components/VoucherList";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useForm } from "react-hook-form";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import { Calendar as CalendarIcon } from "lucide-react"


const Voucher: React.FC = (props: any) => {
  const dispatch = useAppDispatch();
  const voucherData = useAppSelector((state) => state.voucher.voucherData.data);
  const addVoucherError = useAppSelector((state) => state.voucher.error);
  console.log(addVoucherError);
  const [date, setDate] = React.useState<Date>();

  const { control, handleSubmit, getValues, setValue, register, watch } =
    useForm({});

  const formValues = getValues();

  console.log(formValues);

  const handleAddVoucher = () => {
    const payload = {
      voucher_code: formValues.voucher_code,
      name: formValues.name,
      description: formValues.description,
      discount_amount: formValues.discount_amount,
      max_usage: formValues.max_usage,
      start_at: formValues.start_at,
      end_at: formValues.end_at,
      status: formValues.status,
      eu_device: Cookies.get("eu"),
    };
    dispatch(
      addVoucherData({
        url: "voucher/parent/store",
        method: "GET",
        data: payload,
      })
    );
  };

  useEffect(() => {
    dispatch(getVoucherData({ url: props.path_key, method: "GET" }));
  }, []);

  return (
    <div className="w-full">
      <VoucherList voucherData={voucherData} />
      {voucherData?.buttons.map((btn: any) => (
        <div className="bottom-5 fixed pb-4 right-10">
          <Dialog>
            <DialogTrigger>
              <Button className="rounded-full bg-bgrjavancena flex items-center gap-1">
                <Icon icon={btn.icon} />
                {btn.button_name}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add new voucher</DialogTitle>
              </DialogHeader>
              <div className="w-full">
                <ScrollArea className="h-72 w-full">
                  {btn?.details?.map((detail) => (
                    <>
                      <div className="grid py-2 mx-6">
                        <div className="grid gap-1">
                          <Label className="font-semibold text-xs">
                            {detail?.label}
                          </Label>
                          <Input
                            type={detail.type}
                            {...register(
                              detail.label.replace(/\s+/g, "_").toLowerCase()
                            )}
                            className="w-full"
                          />
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-[280px] justify-start text-left font-normal",
                                  !date && "text-muted-foreground"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {date ? (
                                  format(date, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>

                          {/* <small className="text-red-500 w-full">
                            {errorMessage?.message &&
                              errorMessage?.message[
                                _.replace(_.lowerCase(detail.label), " ", "_")
                              ]}
                          </small> */}
                        </div>
                      </div>
                    </>
                  ))}
                </ScrollArea>
              </div>
              <DialogFooter>
                <Button
                  className="bg-bgrjavancena disabled:opacity-100"
                  type="submit"
                  // disabled={loadingEditUser}
                  onClick={() => handleAddVoucher()}
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
                  {"Add new"}
                </Button>
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Close
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      ))}
    </div>
  );
};

export default Voucher;
