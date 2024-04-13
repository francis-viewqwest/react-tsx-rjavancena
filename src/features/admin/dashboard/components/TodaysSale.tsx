import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { IconShoppingCart, IconStar } from "@tabler/icons-react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const TodaysSale: React.FC = () => {
  const formatted = new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  });

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
    {
      img: null,
      product: "Power Drill Set",
      category: "Hardware",
      price: 999,
      stars: 593,
      cart: 1310,
    },
    {
      img: null,
      product: "Power Drill Set",
      category: "Hardware",
      price: 999,
      stars: 593,
      cart: 1310,
    },
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
      <div className="lg:px-3 lg:rounded-md lg:border lg:relative">
        <h1 className="py-3 font-bold text-muted-foreground text-sm">
          Todays Sale
        </h1>
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-none">
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
            <h1 className="font-bold text-2xl text-center">₱534000</h1>
            <p className="text-xs text-muted-foreground text-center">
              Total Earnings
            </p>
          </div>
          <div className="py-5">
            <p className="text-sm text-muted-foreground lg:text-xs">
              Top Selling Products
            </p>
            <div className="flex flex-col">
              {topSelling.map((item, index) => (
                <Card
                  key={index}
                  className="p-4 my-3 border-none shadow-none relative bg-none "
                >
                  <div className="flex items-center gap-4 lg:gap-3">
                    <Skeleton className="h-12 w-12 rounded-3xl  bg-neutral-500 lg:w-10 lg:h-10" />
                    <div>
                      <h1 className="text-sm lg:text-xs">{item.product}</h1>
                      <p className="text-xs text-muted-foreground">
                        {item.category}
                      </p>
                      <p className="text-xs font-semibold">
                        {formatted.format(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bottom-0 right-0 justify-end lg:pt-4">
                    <span className="flex items-center text-xs text-muted-foreground gap-2">
                      <IconStar color="black" size="14" />
                      {item.stars}
                    </span>
                    <span className="flex items-center text-xs text-muted-foreground gap-2">
                      <IconShoppingCart color="black" size="14" />
                      {item.cart}
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TodaysSale;
