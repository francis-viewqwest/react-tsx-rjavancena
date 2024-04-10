import Dashboard from "@/features/admin/dashboard/Dashboard";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";

const Internal: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setTitle("Dashboard"));
  }, []);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Internal;
