import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconPackage,
  IconCircleFilled,
  IconTrendingUp,
  IconCash,
  IconMoneybag,
} from "@tabler/icons-react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

const formatted = new Intl.NumberFormat("en-PH", {
  style: "currency",
  currency: "PHP",
});

const Dashboard: React.FC = () => {
  const data = [
    {
      name: "Jan",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Feb",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Mar",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Apr",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "May",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jun",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Jul",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Aug",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Sep",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Oct",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Nov",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
    {
      name: "Dec",
      total: Math.floor(Math.random() * 5000) + 1000,
    },
  ];

  return (
    <>
      <div className="yflex yflex-col ygap-4 sm:ygrid-flow-row sm:ygrid sm:ygrid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="ypb-0 yflex ytext-sm yflex-row yitems-center yjustify-between yspace-y-0 ytext-neutral-500">
              Total Products
              <IconPackage color="black" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ytext-2xl yfont-bold">1299</div>
            <div className="yflex yitems-center ygap-2 ytext-xs ytext-muted-foreground">
              <IconCircleFilled size="9" color="green" /> In Stock
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="yflex ytext-sm yflex-row yitems-center yjustify-between yspace-y-0 ytext-neutral-500">
              Monthly Sales
              <IconCash color="black" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ytext-2xl yfont-bold">{formatted.format(1299)}</div>
            <div className="yflex yitems-center ygap-2 ytext-xs ytext-muted-foreground">
              <IconTrendingUp size="14" color="green" /> + 3.21 Than last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="yflex ytext-sm yflex-row yitems-center yjustify-between yspace-y-0 ytext-neutral-500">
              Yearly Sales
              <IconMoneybag color="black" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="ytext-2xl yfont-bold">
              {formatted.format(534000)}
            </div>
            <div className="yflex yitems-center ygap-2 ytext-xs ytext-muted-foreground">
              <IconTrendingUp size="14" color="green" /> + 2.21 Than last year
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="ypy-6">
        <Card>
          <CardHeader className="ypb-10">
            <CardTitle className="ytracking-tight">Sales Overview</CardTitle>
          </CardHeader>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
              <XAxis
                dataKey="name"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${value}`}
              />
              <Bar
                dataKey="total"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="ypy-6">
        
      </div>
    </>
  );
};

export default Dashboard;
