import React, { PureComponent } from "react";
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from "recharts";
import { IconShoppingCart, IconStar } from "@tabler/icons-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const TodaysSale: React.FC = () => {
  const data = [
    { name: "Group A", value: 400 },
    { name: "Group B", value: 300 },
    { name: "Group C", value: 300 },
    { name: "Group D", value: 200 },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const topSelling = [
    {
      img: null,
      product: "Power Drill Set",
      category: "Hardware",
      price: 999,
      stars: 593,
      cart: 1310,
    },
  ];

  return (
    <>
      <div className="lg:ypx-3 lg:yrounded-md lg:yborder lg:yrelative">
        <h1 className="ypy-3 yfont-bold ytext-muted-foreground ytext-sm">
          Todays Sale
        </h1>
        <div className="sm:ygrid sm:ygrid-cols-2 lg:ygrid-cols-none">
          <div>
            <ResponsiveContainer style={{ left: 0 }} width="100%" height={210}>
              <PieChart style={{ margin: "auto", position: "relative" }}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <h1 className="yfont-bold ytext-2xl ytext-center">₱534000</h1>
            <p className="ytext-xs ytext-muted-foreground ytext-center">
              Total Earnings
            </p>
          </div>
          <div className="ypy-5">
            <p className="ytext-sm ytext-muted-foreground lg:ytext-xs">
              Top Selling Products
            </p>
            <div className="yflex yflex-col">
              <Card className="yp-4 ymy-3 yborder-none yshadow-none yrelative ybg-none ">
                <div className="yflex yitems-center ygap-4 lg:ygap-3">
                  <Skeleton className="yh-12 yw-12 yrounded-3xl  ybg-neutral-500 lg:yw-10 lg:yh-10" />
                  <div>
                    <h1 className="ytext-sm lg:ytext-xs">Power Drill Set</h1>
                    <p className="ytext-xs ytext-muted-foreground">Hardware</p>
                    <p className="ytext-xs yfont-semibold">$99.99</p>
                  </div>
                </div>
                <div className="yflex yitems-center ygap-4 ybottom-0 yright-0 yjustify-end lg:ypt-4">
                  <span className="yflex yitems-center ytext-xs ytext-muted-foreground ygap-2">
                    <IconStar color="black" size="14" />
                    674
                  </span>
                  <span className="yflex yitems-center ytext-xs ytext-muted-foreground ygap-2">
                    <IconShoppingCart color="black" size="14" />
                    987
                  </span>
                </div>
              </Card>
              <Separator />
              <Card className="yp-4 ymy-3 yborder-none yshadow-none yrelative ybg-none ">
                <div className="yflex yitems-center ygap-4 lg:ygap-3">
                  <Skeleton className="yh-12 yw-12 yrounded-3xl  ybg-neutral-500 lg:yw-10 lg:yh-10" />
                  <div>
                    <h1 className="ytext-sm lg:ytext-xs">Power Drill Set</h1>
                    <p className="ytext-xs ytext-muted-foreground">Hardware</p>
                    <p className="ytext-xs yfont-semibold">$99.99</p>
                  </div>
                </div>
                <div className="yflex yitems-center ygap-4 ybottom-0 yright-0 yjustify-end lg:ypt-4">
                  <span className="yflex yitems-center ytext-xs ytext-muted-foreground ygap-2">
                    <IconStar color="black" size="14" />
                    674
                  </span>
                  <span className="yflex yitems-center ytext-xs ytext-muted-foreground ygap-2">
                    <IconShoppingCart color="black" size="14" />
                    987
                  </span>
                </div>
              </Card>
              <Separator />
              <Card className="yp-4 ymy-3 yborder-none yshadow-none yrelative ybg-none ">
                <div className="yflex yitems-center ygap-4 lg:ygap-3">
                  <Skeleton className="yh-12 yw-12 yrounded-3xl  ybg-neutral-500 lg:yw-10 lg:yh-10" />
                  <div>
                    <h1 className="ytext-sm lg:ytext-xs">Power Drill Set</h1>
                    <p className="ytext-xs ytext-muted-foreground">Hardware</p>
                    <p className="ytext-xs yfont-semibold">$99.99</p>
                  </div>
                </div>
                <div className="yflex yitems-center ygap-4 ybottom-0 yright-0 yjustify-end lg:ypt-4">
                  <span className="yflex yitems-center ytext-xs ytext-muted-foreground ygap-2">
                    <IconStar color="black" size="14" />
                    674
                  </span>
                  <span className="yflex yitems-center ytext-xs ytext-muted-foreground ygap-2">
                    <IconShoppingCart color="black" size="14" />
                    987
                  </span>
                </div>
              </Card>
              <Separator />
              <Card className="yp-4 ymy-3 yborder-none yshadow-none yrelative ybg-none ">
                <div className="yflex yitems-center ygap-4 lg:ygap-3">
                  <Skeleton className="yh-12 yw-12 yrounded-3xl  ybg-neutral-500 lg:yw-10 lg:yh-10" />
                  <div>
                    <h1 className="ytext-sm lg:ytext-xs">Power Drill Set</h1>
                    <p className="ytext-xs ytext-muted-foreground">Hardware</p>
                    <p className="ytext-xs yfont-semibold">$99.99</p>
                  </div>
                </div>
                <div className="yflex yitems-center ygap-4 ybottom-0 yright-0 yjustify-end lg:ypt-4">
                  <span className="yflex yitems-center ytext-xs ytext-muted-foreground ygap-2">
                    <IconStar color="black" size="14" />
                    674
                  </span>
                  <span className="yflex yitems-center ytext-xs ytext-muted-foreground ygap-2">
                    <IconShoppingCart color="black" size="14" />
                    987
                  </span>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysSale;
