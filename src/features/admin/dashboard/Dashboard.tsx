import React, { useEffect, useState } from "react";
import { ColumnsTransac } from "@/components/admin/DataTable/Columns";
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
      <div className="lg:ygrid lg:ygrid-cols-5 lg:ygrid-rows-5 lg:ygap-3">
        <div className="lg:ycol-span-4 lg:yrow-span-5">
          <CardSales />
          <div className="ypy-6">
            <SalesOverview />
          </div>

          <div>
            <DataTable
              title="Recent Transaction"
              columns={ColumnsTransac}
              data={dataTransaction}
            />
          </div>
        </div>
        <div className="lg:yrow-span-5 lg:yw-full lg:yh-full lg:ycol-start-5">
          <TodaysSale />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
