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

const Payment: React.FC = () => {
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

  return (
    <>
      <div className="ypy-5">
        <h1 className="yfont-bold">Payment Summary</h1>
        <div className="yflex yflex-col ygap-3 ypt-8 ypb-6">
          <div className="yflex yitems-center yjustify-between">
            <h1>Discount</h1>
            <Button className="yflex ygap-2">
              <PlusIcon />
              Discount
            </Button>
          </div>
          <div className="yflex yitems-center yjustify-between">
            <h1>Total Discount</h1>
            <p>₱0</p>
          </div>
          <div className="yflex yitems-center yjustify-between">
            <h1>Sub Total</h1>
            <p>₱499.95</p>
          </div>
          <div className="yflex yitems-center yjustify-between">
            <h1>Tax</h1>
            <p>₱10.95</p>
          </div>
        </div>
        <div>
          <div className="yflex yitems-center yjustify-between yborder-dashed yborder-t-2 yborder-stone-400 ypy-4">
            <h1 className="yfont-bold ytext-lg">Total Amount</h1>
            <p className="yfont-bold ytext-lg">₱499.95</p>
          </div>
        </div>
        <div className="yw-full">
          <h1 className="yfont-semibold">Payment Method</h1>
          <div className="ypt-4">
            <RadioGroup className="ygrid ygrid-cols-3 ygap-2 yw-full">
              {paymentMethod.map((item) => (
                <div>
                  <RadioGroupItem
                    value={item.label}
                    id={item.label}
                    className="ypeer ysr-only"
                  />
                  <Label
                    htmlFor={item.label}
                    className="yflex yflex-col ytext-xs yitems-center yfont-semibold yjustify-between yrounded-md yborder-2 yborder-primary ybg-popover yp-3 hover:ybg-primary hover:ytext-white peer-data-[state=checked]:yborder-primary [&:has([data-state=checked])]:yborder-primary"
                  >
                    {item.icon}
                    {item.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
          <div className="yflex yflex-col ygap-6 ypy-4 yw-full">
            <div className="ygrid ygap-2">
              <Label htmlFor="name">Name</Label>
              <Input className="yw-full" id="name" placeholder="First Last" />
            </div>
            <div className="ygrid ygap-2">
              <Label htmlFor="number">Card number</Label>
              <Input id="number" placeholder="" />
            </div>
            <Button size="lg" className="yw-full">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
