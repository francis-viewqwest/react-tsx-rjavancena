import React, { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  IconPackage,
  IconCircleFilled,
  IconTrendingUp,
  IconCash,
  IconMoneybag,
} from "@tabler/icons-react";

interface CardsContent {
  title: string;
  icon: ReactNode;
  data: number;
  icon2: ReactNode;
  analytic: string;
}

const formatted = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

const cardsContent: CardsContent[] = [
  {
    title: "Monthly Sales",
    icon: <IconPackage color="black" />,
    data: 1299,
    icon2: <IconCircleFilled size="9" color="green" />,
    analytic: "In Stock",
  },
  {
    title: "Total Products",
    icon: <IconCash color="black" />,
    data: 1299,
    icon2: <IconTrendingUp size="14" color="green" />,
    analytic: "+ 3.21 Than last month",
  },
  {
    title: "Yearly Sales",
    icon: <IconMoneybag color="black" />,
    data: 534000,
    icon2: <IconTrendingUp size="14" color="green" />,
    analytic: "+ 2.21 Than last year",
  },
];

const CardSales: React.FC = () => {
  return (
    <>
      <div className="flex flex-col gap-4 sm:grid-flow-row sm:grid sm:grid-cols-3">
        {cardsContent.map((item, index) => (
          <Card key={index}>
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex justify-between items-center">
                {item.title}
                {item.icon}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatted.format(item.data)}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                {item.icon2} {item.analytic}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CardSales;
