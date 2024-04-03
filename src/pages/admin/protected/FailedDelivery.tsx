import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import FailedDelivery from "@/features/admin/FailedDelivery";

const Internal: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Failed Delivery"));
  }, []);

  return (
    <>
      <FailedDelivery />
    </>
  );
};

export default Internal;
