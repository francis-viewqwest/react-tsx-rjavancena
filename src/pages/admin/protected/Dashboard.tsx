import Dashboard from "@/features/admin/dashboard/Dashboard";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import { useTableContext } from "@/hooks/TableContext";

const Internal: React.FC = () => {
  const dispatch = useDispatch();
  const { setPage } = useTableContext();

  useEffect(() => {
    dispatch(setTitle("Dashboard"));
    setPage("Dashboard");
  }, []);

  return (
    <>
      <Dashboard />
    </>
  );
};

export default Internal;
