import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";

interface DataChart {
  name: string;
  total: number;
}

const SalesOverview: React.FC = () => {
  const dataChart: DataChart[] = [
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
      <Card>
        <CardHeader className="pb-10">
          <CardTitle className="tracking-tight">Sales Overview</CardTitle>
        </CardHeader>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={dataChart}>
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
              tickFormatter={(value) => `₱${value}`}
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
    </>
  );
};

export default SalesOverview;
