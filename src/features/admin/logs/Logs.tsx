import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { TableProvider } from "@/hooks/TableContext";
import useColumnsProduct from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import { getLogsData } from "@/app/slice/LogsSlice";
import React, { useEffect } from "react";

const Logs: React.FC = (props: any) => {
  const columnsTable = useColumnsProduct("logs");
  const logsData = useAppSelector((state) => state?.logs?.logsData?.data?.logs);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getLogsData({ url: props.path_key, method: "GET" }));
  }, []);

  return (
    <div className="w-full">
      <TableProvider page={props.title}>
        <DataTable title="Logs table" columns={columnsTable} data={logsData} />
      </TableProvider>
    </div>
  );
};

export default Logs;
