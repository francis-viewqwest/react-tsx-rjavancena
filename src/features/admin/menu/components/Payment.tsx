import React, { ReactNode, useRef, useState } from "react";
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
import { placeOrder } from "@/app/slice/menuSlice";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";

interface Payment {
  icon: ReactNode;
  label: string;
}

interface PaymentCash {
  money: number;
}

// const { register, handleSubmit } = useForm<PaymentCash>();

const Payment: React.FC = ({ menuStatus, customerId, dataCustomer }) => {
  const paymentMethod: Payment[] = [
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
  const [cashInput, setCashInput] = useState("");
  // const menuLoading = useSelector(loadingStatus);

  const dispatch = useDispatch();

  console.log(menuStatus);

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
        {customer?.payment.map((payment) => (
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
                <p>₱{payment?.total_discounted_amount}</p>
              </div>
              <div className="flex items-center justify-between">
                <h1>Sub Total</h1>
                <p>
                  {menuStatus === "customerData/success"
                    ? `₱${payment?.total_amount}`
                    : "calculating..."}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <h1>Tax</h1>
                <p>₱0</p>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between border-dashed border-t-2 border-stone-400 py-4">
                <h1 className="font-bold text-lg">Total Amount</h1>
                <p className="font-bold text-lg">
                  {menuStatus === "customerData/success"
                    ? `₱${payment?.total_amount}`
                    : "calculating..."}
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
                        className="flex flex-col text-xs items-center font-semibold justify-between rounded-md border-2 border-neutral-300 bg-popover p-3 hover:bg-primary hover:text-white peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-white [&:has([data-state=checked])]:text-white"
                      >
                        {item?.icon}
                        {item?.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div className="flex flex-col gap-6 py-4 w-full">
                <div className="grid gap-2">
                  <Label htmlFor="name">Cash</Label>
                  <Input
                    value={cashInput}
                    onChange={(e) => setCashInput(e.target.value)}
                    className="w-full"
                    id="name"
                    placeholder="Enter cash"
                  />
                </div>
                <Button
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
