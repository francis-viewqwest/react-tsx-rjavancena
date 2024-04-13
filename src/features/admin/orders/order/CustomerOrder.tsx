import { DataTable } from "@/components/ui/data-table";
import orderCustomer from "@/data/orderCustomer.json";
import { ColumnsCustomerOrder } from "@/components/ui/columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import React from "react";

const CustomerOrder: React.FC = () => {
  const tabsContent = [
    {
      title: "Overview",
      value: "overview",
      icon: "",
    },
    {
      title: "To Ship",
      value: "toShip",
      icon: "",
    },
    {
      title: "Shipping",
      value: "shipping",
      icon: "",
    },
    {
      title: "Delivered",
      value: "delivered",
      icon: "",
    },
    {
      title: "Failed Delivered",
      value: "failedDelivered",
      icon: "",
    },
    {
      title: "Canceled Delivered",
      value: "canceledDelivered",
      icon: "",
    },
  ];

  return (
    <>
      <Tabs defaultValue="overview">
        <TabsList>
          {tabsContent.map((tab, index) => (
            <TabsTrigger key={index} value={tab.value}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value="overview">
          <DataTable
            title="Customer Order"
            columns={ColumnsCustomerOrder}
            data={orderCustomer}
          />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CustomerOrder;
