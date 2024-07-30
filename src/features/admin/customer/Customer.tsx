import { TableProvider } from "@/hooks/TableContext";
import useColumnsProduct from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getCustomerCashierData } from "@/app/slice/customerSlice";
import { useToast } from "@/components/ui/use-toast";

const Customer: React.FC<any> = (props: any) => {
  const columnsProduct = useColumnsProduct("customer");

  const dispatch = useAppDispatch();
  const voidMessage = useAppSelector((state) => state.customer.voidMessage);
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getCustomerCashierData({ url: props.path_key, method: "GET" }));
  }, []);

  const status = useAppSelector((state) => state?.customer?.status);
  const customerCashierData = useAppSelector(
    (state) => state?.customer?.customerCashierData?.data?.recent_transactions
  );

  useEffect(() => {
    if (status === "voidPaidCustomer/success") {
      dispatch(getCustomerCashierData({ url: props.path_key, method: "GET" }));
      toast({
        variant: "success",
        title: voidMessage?.message,
      });
    }
    if (status === "voidPaid/failed") {
      toast({
        variant: "destructive",
        title: voidMessage?.message,
      });
    }
  }, [status]);

  return (
    <div className="w-full">
      <TableProvider page={props.title}>
        <DataTable
          title="Customer Transactions"
          columns={columnsProduct}
          data={customerCashierData}
        />
      </TableProvider>
    </div>
  );
};

export default Customer;
