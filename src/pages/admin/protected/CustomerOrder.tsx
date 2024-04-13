import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import CustomerOrder from "@/features/admin/orders/order/CustomerOrder";

const Internal: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Order"));
  }, []);

  return (
    <>
      <CustomerOrder />
    </>
  );
};

export default Internal;
