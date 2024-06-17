import React, { ReactNode } from "react";
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

interface Payment {
  icon: ReactNode;
  label: string;
}

const Payment: React.FC = ({ customerId, dataCustomer }) => {
  const paymentMethod: Payment[] = [
    {
      icon: <IconCashBanknoteFilled />,
      label: "Card",
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

  const customer = dataCustomer.find(
    (customer: any) => customer.customer_id === customerId
  );

  console.log(customer.payment);

  return (
    <>
      <div className="py-5">
        <h1 className="font-bold">Payment Summary</h1>
        {customer.payment.map((payment) => (
          <>
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
                <p>₱{payment?.total_amount}</p>
              </div>
              <div className="flex items-center justify-between">
                <h1>Tax</h1>
                <p>₱0</p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between border-dashed border-t-2 border-stone-400 py-4">
                <h1 className="font-bold text-lg">Total Amount</h1>
                <p className="font-bold text-lg">₱{payment?.total_amount}</p>
              </div>
            </div>
          </>
        ))}
        <div className="w-full">
          <h1 className="font-semibold">Payment Method</h1>
          <div className="pt-4">
            <RadioGroup className="grid grid-cols-3 gap-2 w-full">
              {paymentMethod.map((item) => (
                <div>
                  <RadioGroupItem
                    value={item.label}
                    id={item.label}
                    className="peer sr-only"
                  />
                  <Label
                    htmlFor={item.label}
                    className="flex flex-col text-xs items-center font-semibold justify-between rounded-md border-2 border-primary bg-popover p-3 hover:bg-primary hover:text-white peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                  >
                    {item.icon}
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="flex flex-col gap-6 py-4 w-full">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input className="w-full" id="name" placeholder="First Last" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="number">Card number</Label>
              <Input id="number" placeholder="" />
            </div>
            <Button size="lg" className="w-full">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
