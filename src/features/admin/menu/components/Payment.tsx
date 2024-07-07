import React, { useState } from "react";
import { PlusIcon } from "@radix-ui/react-icons";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  IconCashBanknoteFilled,
  IconCreditCardFilled,
  IconQrcode,
} from "@tabler/icons-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { placeOrder, loading, menuError } from "@/app/slice/menuSlice";
import Cookies from "js-cookie";
import { PaymentProps, PaymentMethod } from "@/interface/InterfaceType";
import { useAppDispatch, useAppSelector } from "@/app/hooks";

const Payment: React.FC<PaymentProps> = ({ customerId, dataCustomer }) => {
  const paymentMethod: PaymentMethod[] = [
    {
      icon: <IconCashBanknoteFilled />,
      label: "Cash",
    },
    {
      icon: <IconCreditCardFilled />,
      label: "Debit",
    },
    {
      icon: <IconQrcode />,
      label: "E-Wallet",
    },
  ];
  const [cashInput, setCashInput] = useState<any>("");
  const errorPayment = useAppSelector(menuError);
  const loadingPayment = useAppSelector(loading);

  const dispatch = useAppDispatch();

  console.log(errorPayment?.message);

  const customer = dataCustomer?.find(
    (customer: any) => customer?.customer_id === customerId
  );

  const handlePlaceOrder = (values: any) => {
    console.log(values);

    const payload = {
      payment_id: values.payment_id,
      purchase_group_id: values.purchase_group_id,
      money: cashInput,
      user_id: values.user_id_customer,
      eu_device: Cookies.get("eu"),
    };

    dispatch(
      placeOrder({
        url: "payment/payment",
        method: "POST",
        data: payload,
      })
    );
  };

  return (
    <>
      <div className="py-5">
        {customer?.payment.map((payment: any) => (
          <>
            <h1 className="font-bold">Payment Summary</h1>
            <div className="flex flex-col gap-3 pt-8 pb-6">
              <div className="flex items-center justify-between">
                <h1>Voucher</h1>
                <Button className="flex gap-2 font-medium">
                  <PlusIcon />
                  Voucher
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <h1>Total Discount</h1>
                <p>
                  {loadingPayment
                    ? "Calculating..."
                    : `₱${payment?.total_discounted_amount}`}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h1>Sub Total</h1>
                <p>
                  {loadingPayment
                    ? "Calculating..."
                    : new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(payment?.total_amount)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h1>Tax</h1>
                <p>{loadingPayment ? "Calculating..." : "₱0"}</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between border-dashed border-t-2 border-stone-400 py-4">
                <h1 className="font-bold text-lg">Total Amount</h1>
                <p className="font-bold text-lg">
                  {loadingPayment
                    ? "Calculating..."
                    : new Intl.NumberFormat("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      }).format(payment?.total_amount)}
                </p>
              </div>
            </div>
            <div className="w-full">
              <h1 className="font-semibold">Payment Method</h1>
              <div className="pt-4">
                <RadioGroup
                  defaultValue="Cash"
                  className="grid grid-cols-3 gap-2 w-full"
                >
                  {paymentMethod?.map((item, index) => (
                    <div key={index}>
                      <RadioGroupItem
                        value={item?.label}
                        id={item?.label}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={item?.label}
                        className="flex cursor-pointer flex-col text-xs items-center font-semibold justify-between rounded-md border-2 border-neutral-300 bg-popover p-3 hover:bg-primary hover:text-white peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:text-white"
                      >
                        {item?.icon}
                        {item?.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-6 py-6 w-full">
                <div className="grid gap-2">
                  <Label htmlFor="name">Cash</Label>
                  <Input
                    type="number"
                    value={cashInput}
                    onChange={(e) => setCashInput(e.target.value)}
                    className="w-full"
                    id="name"
                    placeholder="Enter cash"
                  />
                  <span className="text-red-500">{errorPayment?.message}</span>
                  {cashInput >= payment?.total_amount && (
                    <Label className="font-medium">
                      Total change:{" "}
                      <span className="font-semibold">
                        {cashInput - payment?.total_amount}
                      </span>
                    </Label>
                  )}
                </div>
                <Button
                  disabled={cashInput < payment?.total_amount}
                  onClick={() => handlePlaceOrder(customer)}
                  size="lg"
                  className="w-full font-semibold"
                >
                  Place Order
                </Button>
              </div>
            </div>
          </>
        ))}
      </div>
    </>
  );
};

export default Payment;
