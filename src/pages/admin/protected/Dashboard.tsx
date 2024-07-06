import Dashboard from "@/features/admin/dashboard/Dashboard";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setTitle } from "../../../common/appSlice";
import { useTableContext } from "@/hooks/TableContext";
import { getDashboardData } from "@/app/slice/dashboardSlice";

interface Props {
  routeData: { path_key: string | any };
}

const Internal: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { setPage } = useTableContext();

  const {
    routeData: { path_key },
  } = props;

  useEffect(() => {
    dispatch(setTitle("Dashboard"));
    setPage("Dashboard");
    dispatch(getDashboardData({ url: path_key, method: "GET" }));
  }, []);

  return (
    <>
      <Dashboard path_key={path_key} />
    </>
  );
};

export default Internal;
