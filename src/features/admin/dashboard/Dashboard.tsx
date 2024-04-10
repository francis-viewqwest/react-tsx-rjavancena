import React, { useEffect, useState } from "react";
import { ColumnsTransac } from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import transactionData from "@/data/transactionData.json";
import TodaysSale from "./components/TodaysSale";
import CardSales from "./components/CardSales";
import SalesOverview from "./components/SalesOverview";

interface DataTransaction {
  transactId: number;
  img: any;
  customerId: string;
  date: string;
  time: string;
  amount: number;
  status: string;
}

const Dashboard: React.FC = () => {
  const [dataTransaction, setDataTransaction] = useState<DataTransaction[]>([]);

  useEffect(() => {
    setDataTransaction(transactionData);
  }, []);

  return (
    <>
      <div className="lg:grid lg:grid-cols-5 lg:grid-rows-5 lg:gap-3">
        <div className="lg:col-span-4 lg:row-span-5">
          <CardSales />
          <div className="py-6">
            <SalesOverview />
          </div>

          <div>
            <DataTable
              search="transaction"
              title="Recent Transaction"
              columns={ColumnsTransac}
              data={dataTransaction}
            />
          </div>
        </div>
        <div className="lg:row-span-5 lg:w-full lg:h-full lg:col-start-5">
          <TodaysSale />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
