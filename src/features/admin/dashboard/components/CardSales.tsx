import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Icon } from "@iconify/react";

import { dashboardData } from "@/app/slice/dashboardSlice";
import { useSelector } from "react-redux";

const CardSales: React.FC = () => {
  const data = useSelector(dashboardData);
  console.log(data.sale);

  // const cardsContent: CardsContent[] = [
  //   {
  //     title: "Total Products",
  //     icon: <IconPackage color="black" />,
  //     data: data.stocks,
  //     icon2: <IconTrendingUp size="14" color="green" />,
  //     analytic: "In Stock",
  //   },
  //   {
  //     title: "Monthly Sales",
  //     icon: <IconCash color="black" />,
  //     data: formatted.format(1299),
  //     icon2: <IconCircleFilled size="9" color="green" />,
  //     analytic: "+ 3.21 Than last month",
  //   },
  //   {
  //     title: "Yearly Sales",
  //     icon: <IconMoneybag color="black" />,
  //     data: formatted.format(534000),
  //     icon2: <IconTrendingUp size="14" color="green" />,
  //     analytic: "+ 2.21 Than last year",
  //   },
  // ];
  return (
    <>
      <div className="flex flex-col gap-4 sm:grid-flow-row sm:grid sm:grid-cols-3">
        {data?.sale?.map((item: any, index: number) => (
          <Card key={index}>
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-sm font-medium flex justify-between items-center">
                {item.title}
                <Icon icon={item.card_icon} fontSize={24} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.current}</div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon icon={item.icon} fontSize={14} />
                {item.analytic}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CardSales;
