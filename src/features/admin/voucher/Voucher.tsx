import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { getVoucherData } from "@/app/slice/voucherSlice";
import React, { useEffect } from "react";
import VoucherList from "./components/VoucherList";

const Voucher: React.FC = (props: any) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getVoucherData({ url: props.path_key, method: "GET" }));
  }, []);

  return (
    <div className="w-full">
      <VoucherList />
    </div>
  );
};

export default Voucher;
