import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getChildVoucherData } from "@/app/slice/voucherSlice";
import useColumnsProduct from "@/components/ui/columns";
import { DataTable } from "@/components/ui/data-table";
import { TableProvider } from "@/hooks/TableContext";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const VoucherChildList: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const childVoucherData = useAppSelector(
    (state) => state.voucher.voucherData?.data?.voucher_items
  );
  const [data, setData] = useState([]);
  const status = useAppSelector((state) => state.voucher.status);
  const { id } = useParams();
  const columnsProduct = useColumnsProduct("voucher");
  console.log(props);

  useEffect(() => {
    dispatch(getChildVoucherData({ url: id, method: "GET" }));
  }, [id]);

  useEffect(() => {
    if (status === "getChildVoucherData/success") {
      setData(childVoucherData);
    }
  }, [status]);

  console.log(childVoucherData);

  return (
    <>
      <TableProvider page="Inventory">
        <Link
          to="/app/voucher"
          className="flex gap-2 items-center mb-6 text-xs w-32"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          Back to voucher
        </Link>

        <div>
          <DataTable
            // title={`Voucher in ${state?.name}`}
            columns={columnsProduct}
            data={data}
          />
        </div>
      </TableProvider>
    </>
  );
};

export default VoucherChildList;
